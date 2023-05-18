using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EducationUry.Extensions;
using EducationUry.Infrastructure.Identity.Configurations;
using EducationUry.Infrastructure.Identity.Exceptions;
using EducationUry.Infrastructure.Identity.Models;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace EducationUry.Infrastructure.Identity.Services
{
	public interface IJwtService
	{
		Task<JwtPair> GenerateTokenPairAsync(Guid userId, IReadOnlyCollection<JwtClaim> claims);
		Task<IReadOnlyCollection<JwtClaim>> GetClaimsByTokenAsync(string token, bool withValidation = true);
		Task<TokenValidationStatus> ValidateTokenAsync(string token);
		Task<JwtPair> RefreshTokenAsync(Guid userId, string accessToken, string refreshToken, IReadOnlyCollection<JwtClaim> claims);
		Task RevokeTokenAsync(Guid userId, string accessToken, string refreshToken);
		Task<bool> IsExistUserAsync(Guid userId);
		Task<JwtPair> GetTokenPairByUserId(Guid userId);
	}

	public class JwtService : IJwtService
	{
		private AuthOptionsConfiguration _configuration;
		private IConnectionMultiplexer _connectionMultiplexer;

		public JwtService(
			AuthOptionsConfiguration configuration,
			IConnectionMultiplexer connectionMultiplexer)
		{
			_configuration = configuration;
			_connectionMultiplexer = connectionMultiplexer;
		}

		private string GenerateAccessToken(IReadOnlyCollection<JwtClaim> claims)
		{
			return JwtGenerator.GenerateAccessToken(claims, _configuration.GetSymmetricSecurityAccessKey(), _configuration.LifetimeAccessToken);
		}

		private string GenerateRefreshToken(IReadOnlyCollection<JwtClaim> claims)
		{
			return JwtGenerator.GenerateRefreshToken(claims, _configuration.GetSymmetricSecurityRefreshKey(), _configuration.LifetimeRefreshToken);
		}

		private string GetAccessKey(string key) => $"access:{key}";
		private string GetRefreshKey(string key, Guid userId) => $"{userId}:{key}";
		private string GetClaimsKey(string key) => $"claims:{key}";

		private IDatabase GetDb() => _connectionMultiplexer.GetDatabase(_configuration.Db);

		public async Task<JwtPair> GenerateTokenPairAsync(Guid userId, IReadOnlyCollection<JwtClaim> claims)
		{
			if (claims == null || claims.Count == 0)
				throw new GenerateTokenException("Arguments to create token are not valid.");

			var accessToken = GenerateAccessToken(claims);
			var refreshToken = GenerateRefreshToken(claims);

			if (await GetDb().KeyExistsAsync(accessToken) || await GetDb().KeyExistsAsync(refreshToken))
			{
				throw new GenerateTokenException($"Access token [{accessToken}] or refresh token {refreshToken} is duplicate");
			}

			var dateTimeFrom = DateTime.UtcNow;
			var accessTokenExpirationDateTime = dateTimeFrom.AddMinutes(_configuration.LifetimeAccessToken);

			var isSuccess = await GetDb()
				.TransactAsync(command => command
				.Enqueue(tran =>
					tran.StringSetAsync(GetAccessKey(accessToken), JsonConvert.SerializeObject(new JwtAccessValue
					{
						RefreshToken = refreshToken,
						From = dateTimeFrom,
						To = accessTokenExpirationDateTime,
					}))
				)
				.Enqueue(tran => tran.KeyExpireAsync(GetAccessKey(accessToken), dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken)))
				.Enqueue(tran =>
					tran.StringSetAsync(GetRefreshKey(refreshToken, userId), JsonConvert.SerializeObject(new JwtRefreshValue
					{
						From = dateTimeFrom,
						To = dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken),
						AccessToken = accessToken
					}))
				)
				.Enqueue(tran => tran.KeyExpireAsync(GetRefreshKey(refreshToken, userId), dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken)))
				.Enqueue(tran => tran.StringSetAsync(GetClaimsKey(accessToken), JsonConvert.SerializeObject(claims)))
				// .Enqueue(tran => tran.StringSetAsync(GetClaimsKey(accessToken), JsonConvert.SerializeObject(claims)))
				.Enqueue(tran => tran.KeyExpireAsync(GetClaimsKey(accessToken), dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken))));

			if (!isSuccess)
			{
				throw new GenerateTokenException("Operation is not execute");
			}

			return new JwtPair(accessToken, refreshToken, accessTokenExpirationDateTime);
		}

		public async Task<IReadOnlyCollection<JwtClaim>> GetClaimsByTokenAsync(string token, bool withValidation = true)
		{
			if (withValidation)
			{
				var validateResult = await ValidateTokenAsync(token);

				if (validateResult != TokenValidationStatus.Valid)
				{
					throw new GetClaimsByTokenException(validateResult, $"Not valid token {token}");
				}
			}

			var claimsResult = await GetDb().StringGetAsync(GetClaimsKey(token));

			if (!claimsResult.HasValue)
			{
				return Array.Empty<JwtClaim>();
			}

			return JsonConvert.DeserializeObject<IReadOnlyCollection<JwtClaim>>(claimsResult);
		}

		public async Task<TokenValidationStatus> ValidateTokenAsync(string token)
		{
			if (string.IsNullOrEmpty(token))
			{
				return TokenValidationStatus.NoValid;
			}

			var result = await GetDb().StringGetAsync(GetAccessKey(token));

			if (!result.HasValue)
			{
				return TokenValidationStatus.NoValid;
			}

			var jwtAccessValue = JsonConvert.DeserializeObject<JwtAccessValue>(result);

			if (DateTime.UtcNow >= jwtAccessValue.To)
			{
				return TokenValidationStatus.Expired;
			}

			return TokenValidationStatus.Valid;
		}

		public async Task<JwtPair> GetTokenPairByUserId(Guid userId)
		{
			var result = await GetDb()
				.ExecuteAsync("SCAN", 0, "MATCH", $"*{userId}**");

			var refreshToken = (string) ((RedisResult[])((RedisResult[]) result)[1]).FirstOrDefault();

			if (refreshToken == null)
			{
				return null;
			}

			var refreshTokenResult = await GetDb().StringGetAsync(refreshToken);

			var refreshTokenValue = JsonConvert.DeserializeObject<JwtRefreshValue>(refreshTokenResult);
			var accessTokenResult = await GetDb().StringGetAsync(GetAccessKey(refreshTokenValue.AccessToken));
			var accessTokenValue = JsonConvert.DeserializeObject<JwtAccessValue>(accessTokenResult);

			return new JwtPair(refreshTokenValue.AccessToken, accessTokenValue.RefreshToken, accessTokenValue.To);
		}

		public async Task<bool> IsExistUserAsync(Guid userId)
		{
			var result = (RedisResult[])((RedisResult[]) await GetDb()
				.ExecuteAsync("SCAN", 0, "MATCH", $"*{userId}**", "COUNT", 2))[1];

			return result.Length != 0;
		}

		public async Task<JwtPair> RefreshTokenAsync(Guid userId, string oldAccessToken, string oldRefreshToken, IReadOnlyCollection<JwtClaim> claims)
		{
			if (string.IsNullOrEmpty(oldRefreshToken) || string.IsNullOrEmpty(oldAccessToken))
			{
				throw new RefreshTokenException("Access token or refresh token is empty", oldAccessToken, oldRefreshToken);
			}

			var db = GetDb();
			var resultRefreshToken = db.StringGet(GetRefreshKey(oldRefreshToken, userId));

			if (!resultRefreshToken.HasValue)
			{
				throw new RefreshTokenException("Not exist refresh token", oldAccessToken, oldRefreshToken);
			}

			var resultAccessToken = db.StringGet(GetAccessKey(oldAccessToken));

			if (!resultAccessToken.HasValue)
			{
				throw new RefreshTokenException("Not exist access token", oldAccessToken, oldRefreshToken);
			}

			var jwtAccessValue = JsonConvert.DeserializeObject<JwtRefreshValue>(resultAccessToken);

			if (DateTime.UtcNow < jwtAccessValue.To)
			{
				// Попытка обновить не истекший токен
				throw new RefreshTokenException("Token is not expired", oldAccessToken, oldRefreshToken);
			}

			var jwtRefreshValue = JsonConvert.DeserializeObject<JwtRefreshValue>(resultRefreshToken);

			if (jwtRefreshValue.AccessToken != oldAccessToken)
			{
				// Нет, мы этого самозванца не знаем
				throw new RefreshTokenException("Access token not equal access token from refresh token", oldAccessToken, oldRefreshToken);
			}

			// Да, это наш пользователь, обновляем токен
			var newAccessToken = GenerateAccessToken(claims);
			var newRefreshToken = GenerateRefreshToken(claims);

			var dateTimeFrom = DateTime.UtcNow;
			var accessTokenExpirationDateTime = dateTimeFrom.AddMinutes(_configuration.LifetimeAccessToken);
			var isSuccess = await db.TransactAsync(command => command
				.Enqueue(tran => tran.KeyRenameAsync(GetAccessKey(oldAccessToken), GetAccessKey(newAccessToken)))
				.Enqueue(tran => tran.KeyRenameAsync(GetRefreshKey(oldRefreshToken, userId), GetRefreshKey(newRefreshToken, userId)))
				.Enqueue(tran => tran.KeyRenameAsync(GetClaimsKey(oldAccessToken), GetClaimsKey(newAccessToken)))
				.Enqueue(tran => tran.StringSetAsync(GetAccessKey(newAccessToken), JsonConvert.SerializeObject(
					new JwtAccessValue
					{
						RefreshToken = newRefreshToken,
						From = dateTimeFrom,
						To = accessTokenExpirationDateTime,
					})))
				.Enqueue(tran => tran.KeyExpireAsync(GetClaimsKey(newAccessToken), dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken)))
				.Enqueue(tran => tran.KeyExpireAsync(GetAccessKey(newAccessToken), dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken)))
				.Enqueue(tran => tran.StringSetAsync(GetRefreshKey(newRefreshToken, userId), JsonConvert.SerializeObject(
					new JwtRefreshValue
					{
						From = dateTimeFrom,
						To = dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken),
						AccessToken = newAccessToken
					})))
				.Enqueue(tran => tran.KeyExpireAsync(GetRefreshKey(newRefreshToken, userId),
					dateTimeFrom.AddMinutes(_configuration.LifetimeRefreshToken))));

			if (!isSuccess)
			{
				throw new RefreshTokenException("Operation is not execute", oldAccessToken, oldRefreshToken);
			}

			return new JwtPair(newAccessToken, newRefreshToken, accessTokenExpirationDateTime);
		}

		public async Task RevokeTokenAsync(Guid userId, string accessToken, string refreshToken)
		{
			if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
				throw new RevokeTokenException("Arguments to revoke token are not valid.", accessToken, refreshToken);

			var db = GetDb();
			var result = db.StringGet(GetRefreshKey(refreshToken, userId));

			if (!result.HasValue)
			{
				throw new RevokeTokenException(
					"Refresh token does not exist",
					accessToken,
					refreshToken);
			}

			var jwtRefreshValue = JsonConvert.DeserializeObject<JwtRefreshValue>(result);

			if (jwtRefreshValue.AccessToken != accessToken)
			{
				throw new RevokeTokenException(
					"Token mismatch",
					accessToken,
					refreshToken);
			}

			var isSuccess = await db.TransactAsync(command => command
				.Enqueue(tran => tran.KeyDeleteAsync(new RedisKey[]
				{
					GetAccessKey(accessToken),
					GetRefreshKey(refreshToken, userId),
					GetClaimsKey(accessToken)
				})));

			if (!isSuccess)
			{
				throw new RevokeTokenException(
					"Update operation failed",
					accessToken,
					refreshToken);
			}
		}
	}
}