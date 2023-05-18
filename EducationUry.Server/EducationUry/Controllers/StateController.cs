using EducationUry.Infrastructure.Common;
using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StateController : ControllerBase
    {
        [HttpGet]
        [Route("get")]
        public IActionResult Get()
        {
            return Ok(ApiResponse<object>.Success(new
            {
                user = new
                {
                    id = "123",
                    email = "ury.ury-ry@gmail.com"
                },
                api = new
                {
                    version = "1.0.0",
                    host = "http://localhost:5000"
                }
            }));
        }
    }
}