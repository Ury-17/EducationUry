using System;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace EducationUry.Extensions
{
    public static class HttpContentExtensions
    {
        public static bool TryFindCurrentUserId(this HttpContext context, out Guid userId)
        {
            userId = Guid.Empty;

            var subClaim = context.User.Claims.FirstOrDefault(c => c.Type == "subs");
            if (subClaim == null)
            {
                return false;
            }

            userId = Guid.Parse(subClaim.Value);

            return true;
        }

        public static bool TryGetAccessToken(this HttpContext context, out string accessToken)
        {
            accessToken = string.Empty;

            if (!context.Request.Headers.TryGetValue("Authorization", out var accessTokenHeaderValue)) return false;

            var accessHeaderString = accessTokenHeaderValue.ToString();
            if (string.IsNullOrEmpty(accessHeaderString))
            {
                return false;
            }

            accessToken = accessHeaderString.Split(" ").LastOrDefault();

            return true;
        }

        public static bool TryGetAccessTokenAndRefreshToken(this HttpContext context, out string accessToken,
            out string refreshToken)
        {
            accessToken = string.Empty;
            refreshToken = string.Empty;

            if (!context.Request.Headers.TryGetValue("Authorization", out var accessTokenHeaderValue) ||
                !context.Request.Headers.TryGetValue("R-Token", out var refreshTokenHeaderValue)) return false;

            var accessHeaderString = accessTokenHeaderValue.ToString();
            if (string.IsNullOrEmpty(accessHeaderString))
            {
                return false;
            }

            accessToken = accessHeaderString.Split(" ").LastOrDefault();
            refreshToken = refreshTokenHeaderValue.ToString();

            if (string.IsNullOrEmpty(refreshToken))
            {
                return false;
            }

            return true;
        }
    }
}