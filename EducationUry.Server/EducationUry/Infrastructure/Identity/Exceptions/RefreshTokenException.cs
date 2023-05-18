using System;

namespace EducationUry.Infrastructure.Identity.Exceptions
{
	public class RefreshTokenException : Exception
	{
		public RefreshTokenException(string msg, string accessToken, string refreshToken)
			: base($"{msg}\nToken not refreshed with args \n access token: {accessToken}\nrefresh token: {refreshToken}")
		{
		}
	}
}