using System.Security.Claims;
using Newtonsoft.Json;

namespace EducationUry.Infrastructure.Identity.Models
{
    public class JwtClaim
    {
        [JsonProperty("issuer")] public string Issuer { get; set; }
        [JsonProperty("type")] public string Type { get; set; }
        [JsonProperty("value")] public string Value { get; set; }
        [JsonProperty("valueType")] public string ValueType { get; set; }

        public static JwtClaim Create(string type, string value)
        {
            var claim = new Claim(type, value);

            return new JwtClaim
            {
                Issuer = claim.Issuer,
                Type = claim.Type,
                Value = claim.Value,
                ValueType = claim.ValueType
            };
        }

        public Claim ToBaseClaim() => new Claim(Type, Value, ValueType, Issuer);
    }
}