using System;

namespace EducationUry.Infrastructure.Identity.Attributions
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AllowAnonymousAttribute : Attribute
    {
    }
}