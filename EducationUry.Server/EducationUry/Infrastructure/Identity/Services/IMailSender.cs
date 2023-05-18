using System;
using System.Threading.Tasks;

namespace EducationUry.Infrastructure.Identity.Services
{
	public interface IMailSender
	{
		Task<bool> SendAsync(string subject, string to, string message);
		TimeSpan RegistrationCodeExpirationTimeSpan { get; }
		int RegistrationCodeExpirationInSeconds { get; }
	}
}