using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EducationUry.Extensions;
using EducationUry.Infrastructure.Common;
using EducationUry.Infrastructure.Identity.Exceptions;
using EducationUry.Infrastructure.Identity.Models;
using EducationUry.Infrastructure.Identity.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EducationUry.Infrastructure.Identity.Attributions
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private string[] _roleFilter;

        public AuthorizeAttribute()
        {
            _roleFilter = Array.Empty<string>();
        }

        public AuthorizeAttribute(params string[] role)
        {
            _roleFilter = role;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();

            if (context.HttpContext.Request.Headers.TryGetValue("Authorization", out var headerValue))
            {
                var headerString = headerValue.ToString();
                if (string.IsNullOrEmpty(headerString) || headerString.Length < 30)
                {
                    if (!allowAnonymous)
                    {
                        context.Result = new JsonResult(ApiResponse<object>.Failure("Unauthorized"))
                            { StatusCode = StatusCodes.Status401Unauthorized };
                        return;
                    }
                }

                var token = headerValue.ToString().Split(" ").LastOrDefault();

                var jwtService = (IJwtService)context.HttpContext.RequestServices.GetService(typeof(IJwtService));

                try
                {
                    var tokenClaims = await jwtService.GetClaimsByTokenAsync(token, false);
                    if (context.HttpContext.Request.Headers.TryGetValue("R-Token", out var refreshTokenValue))
                    {
                        var refreshToken = refreshTokenValue.ToString();
                        var uId = tokenClaims.FirstOrDefault(c => c.Type == "subs")?.Value;
                        if (!string.IsNullOrEmpty(refreshToken) && !string.IsNullOrEmpty(uId))
                        {
                            var userId = Guid.Parse(uId);
                            var newJwtPair = default(JwtPair);
                            try
                            {
                                newJwtPair = await jwtService.RefreshTokenAsync(userId, token,
                                    refreshToken, tokenClaims);
                            }
                            catch
                            {
                                newJwtPair = null;
                            }

                            if (newJwtPair != null)
                            {
                                if (context.HttpContext.Request.Headers.ContainsKey("Authorization"))
                                {
                                    context.HttpContext.Request.Headers["Authorization"] =
                                        $"Baerer {newJwtPair.AccessToken}";
                                    context.HttpContext.Request.Headers.Remove("R-Token");
                                }
                                // if (context.HttpContext.Request.Headers.ContainsKey("r-token"))
                                // {
                                // 	context.HttpContext.Request.Headers["r-token"] = newJwtPair.RefreshToken;
                                // }
                                // context.HttpContext.Request.Headers.Add("r-token", newJwtPair.RefreshToken);
                                // context.HttpContext.Request.Headers.Add("AccessToken", newJwtPair.AccessToken);
                                // context.HttpContext.Request.Headers.Add("RefreshToken", newJwtPair.RefreshToken);
                                // context.HttpContext.Request.Headers.Add("Exp", newJwtPair.Exp.ToUnixTime().ToString());
                                // context.HttpContext.Request.Headers.Add("Access-Control-Expose-Headers", "*");

                                context.HttpContext.Response.Headers.Add("AccessToken", newJwtPair.AccessToken);
                                context.HttpContext.Response.Headers.Add("RefreshToken", newJwtPair.RefreshToken);
                                context.HttpContext.Response.Headers.Add("Exp", newJwtPair.Exp.ToUnixTime().ToString());
                                context.HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "*");
                                token = newJwtPair.AccessToken;
                            }

                            // context.HttpContext.Response.StatusCode = 426;
                        }
                    }

                    var claims = await jwtService.GetClaimsByTokenAsync(token);
                    if (claims.Count == 0 && !allowAnonymous)
                    {
                        context.Result = new JsonResult(ApiResponse<object>.Failure("Unauthorized"))
                            { StatusCode = StatusCodes.Status401Unauthorized };
                        return;
                    }

                    if (_roleFilter.Length != 0)
                    {
                        var claimRole = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);

                        if (claimRole == null || !_roleFilter.Contains(claimRole.Value))
                        {
                            if (!allowAnonymous)
                            {
                                context.Result = new JsonResult(ApiResponse<object>.Failure())
                                    { StatusCode = StatusCodes.Status404NotFound };
                                return;
                            }
                        }
                    }

                    context.HttpContext.User = new ClaimsPrincipal(new[]
                    {
                        new ClaimsIdentity(claims.Select(c => c.ToBaseClaim())),
                    });
                }
                catch (GetClaimsByTokenException ex)
                {
                    if (ex.Status == TokenValidationStatus.Expired)
                    {
                        if (!allowAnonymous)
                        {
                            context.Result = new JsonResult(ApiResponse<object>.Failure("Unauthorized"))
                                { StatusCode = StatusCodes.Status426UpgradeRequired };
                        }
                    }
                    else if (ex.Status == TokenValidationStatus.NoValid)
                    {
                        if (!allowAnonymous)
                        {
                            context.Result = new JsonResult(ApiResponse<object>.Failure("Unauthorized"))
                                { StatusCode = StatusCodes.Status401Unauthorized };
                        }
                    }
                }

                return;
            }

            if (!allowAnonymous)
            {
                context.Result = new JsonResult(ApiResponse<object>.Failure("Unauthorized"))
                    { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}