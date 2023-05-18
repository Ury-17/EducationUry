namespace EducationUry.Infrastructure.Identity.Configurations
{
    public class AuthOptionsConfig
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string AccessKey { get; set; }
        public string RefreshKey { get; set; }
        public int Db { get; set; }
        public string InternalAccessKey { get; set; }

        /// <summary>
        /// Виртуальное время жизни access токена.
        /// </summary>
        public int LifetimeAccessTokenInMinutes { get; set; }

        /// <summary>
        /// Виртуальное время жизни refresh токена.
        /// Физическое время жизни для refresh и access токена.
        /// </summary>
        public int LifetimeRefreshTokenInMinutes { get; set; }
    }
}