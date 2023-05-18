using System;
using Newtonsoft.Json;

namespace EducationUry.Infrastructure.Identity.Models
{
    public class JwtAccessValue
    {
        [JsonProperty("refreshToken")] public string RefreshToken { get; set; }
        [JsonProperty("from")] public DateTime From { get; set; }
        [JsonProperty("to")] public DateTime To { get; set; }
    }
}