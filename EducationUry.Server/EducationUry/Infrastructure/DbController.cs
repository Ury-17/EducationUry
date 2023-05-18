using EducationUry.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Infrastructure
{
    [ApiController]
    [Route("api/[controller]")]
    public class DbController : ControllerBase
    {
        protected IDbContext Db { get; }
        public DbController(IDbContext db)
        {
            Db = db;
        }
    }
}