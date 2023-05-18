using System;
using Microsoft.IdentityModel.Tokens;

namespace EducationUry.Infrastructure.Identity.Configurations
{
    public class AuthOptionsConfiguration
    {
        public string Issuer => _config.Issuer;
        public string Audience => _config.Audience;
        public int LifetimeAccessToken => _config.LifetimeAccessTokenInMinutes;
        public int LifetimeRefreshToken => _config.LifetimeRefreshTokenInMinutes;
        public int Db => _config.Db;
        public string InternalAccessKey => _config.InternalAccessKey;
        private string AccessKey => _config.AccessKey;
        private string RefreshKey => _config.RefreshKey;
        private readonly AuthOptionsConfig _config;

        public AuthOptionsConfiguration(AuthOptionsConfig config)
        {
            _config = config;
        }

        public SymmetricSecurityKey GetSymmetricSecurityAccessKey() => GenerateKeyBySecret(AccessKey);
        public SymmetricSecurityKey GetSymmetricSecurityRefreshKey() => GenerateKeyBySecret(RefreshKey);

        private SymmetricSecurityKey GenerateKeyBySecret(string secret)
        {
            var symmetricKey = Convert.FromBase64String(secret);
            return new SymmetricSecurityKey(symmetricKey);
        }
    }
}