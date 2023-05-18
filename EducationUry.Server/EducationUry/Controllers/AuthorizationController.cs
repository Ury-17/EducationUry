using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        [HttpPost]
        [Route("signin")]
        public IActionResult SignIn([FromBody] SignRequest request)
        {
            return Ok(new
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
            });
        }

        [HttpGet]
        [Route("signout")]
        public IActionResult SignOut()
        {
            return Ok();
        }
    }

    public record SignRequest(string Email, string Password);
}