using System;

namespace EducationUry.Infrastructure.Identity.Exceptions
{
	public class RevokeTokenException : Exception
	{
		public RevokeTokenException(string msg, string accessToken, string refreshToken)
			: base($"{msg}\nToken not revoked with args \n access token: {accessToken}\nrefresh token: {refreshToken}")
		{
		}
	}
}