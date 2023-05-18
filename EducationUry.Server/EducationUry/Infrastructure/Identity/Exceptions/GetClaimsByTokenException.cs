using System;
using EducationUry.Infrastructure.Identity.Models;

namespace EducationUry.Infrastructure.Identity.Exceptions
{
	public class GetClaimsByTokenException : Exception
	{
		public TokenValidationStatus Status { get; }

		public GetClaimsByTokenException(TokenValidationStatus status, string msg) : base(msg)
		{
			Status = status;
		}
	}
}