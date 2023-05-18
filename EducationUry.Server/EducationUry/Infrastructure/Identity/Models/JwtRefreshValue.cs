using System;
using Newtonsoft.Json;

namespace EducationUry.Infrastructure.Identity.Models
{
    public class JwtRefreshValue
    {
		[JsonProperty("accessToken")]
		public string AccessToken { get; set; }
		[JsonProperty("from")]
		public DateTime From { get; set; }
		[JsonProperty("to")]
		public DateTime To { get; set; }
    }
}