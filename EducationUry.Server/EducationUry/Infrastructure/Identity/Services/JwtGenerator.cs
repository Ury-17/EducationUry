using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using EducationUry.Infrastructure.Identity.Models;
using Microsoft.IdentityModel.Tokens;

namespace EducationUry.Infrastructure.Identity.Services
{
	internal class JwtGenerator
	{
		public static string GenerateAccessToken(IReadOnlyCollection<JwtClaim> claims, SecurityKey secret, int expirationMinutes)
		{
			var securityTokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims.Select(claim => claim.ToBaseClaim())),
				Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
				SigningCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256Signature)
			};

			var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
			var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
			var token = jwtSecurityTokenHandler.WriteToken(securityToken);

			return token;
		}

		public static string GenerateRefreshToken(IReadOnlyCollection<JwtClaim> claims, SecurityKey secret, int expirationMinutes)
		{
			var securityTokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new []
				{
					new Claim("rndId1", Guid.NewGuid().ToString()),
					new Claim("rndId2", Guid.NewGuid().ToString()),
				}.Concat(claims.Select(claim => claim.ToBaseClaim()))),
				Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
				SigningCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256Signature)
			};

			var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
			var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
			var token = jwtSecurityTokenHandler.WriteToken(securityToken);

			return token;
		}
	}
}