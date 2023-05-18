using System;
using System.Linq;
using Functional.Maybe;
using Microsoft.AspNetCore.Http;

namespace EducationUry.Infrastructure.Identity.Exceptions
{
	public static class HttpContextExtensions
	{
		public static Maybe<Guid> FindUserId(this HttpContext context)
		{
			var userId = context
					.ToMaybe()
					.SelectMaybe(ctx => ctx.User.ToMaybe())
					.SelectMaybe(principal => principal.Claims.FirstMaybe(cl => cl.Type == "subs"))
					.Select(claim => new Guid(claim.Value));

			return userId;
		}


		// public static Maybe<Guid> FindUserId(this HttpContext context)
		// 	=>
		// 		context
		// 			.ToMaybe()
		// 			.SelectMaybe(ctx => ctx.User.ToMaybe())
		// 			.SelectMaybe(principal => principal.Claims.FirstMaybe(cl => cl.Type == "subs"))
		// 			.Select(claim => new Guid(claim.Value));

		public static Guid GetUserId(this HttpContext context)
			=> new Guid(context.User.Claims.First(cl => cl.Type == "subs").Value);
	}
}