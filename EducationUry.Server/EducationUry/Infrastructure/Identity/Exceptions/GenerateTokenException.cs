using System;

namespace EducationUry.Infrastructure.Identity.Exceptions
{
	public class GenerateTokenException : Exception
	{
		public GenerateTokenException(string msg)
			: base($"{msg}\nToken not generated for user")
		{
		}
	}
}