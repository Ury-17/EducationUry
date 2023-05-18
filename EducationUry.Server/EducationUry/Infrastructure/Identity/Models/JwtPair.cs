using System;

namespace EducationUry.Infrastructure.Identity.Models
{
    public class JwtPair
    {
		public string AccessToken { get; }
		public string RefreshToken { get; }
		public DateTime Exp { get; }

		public JwtPair(string accessToken, string refreshToken, DateTime exp)
		{
			AccessToken = accessToken;
			RefreshToken = refreshToken;
			Exp = exp;
		}
    }
}