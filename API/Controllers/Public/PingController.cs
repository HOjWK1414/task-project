using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Public;

[ApiController]
[Route("api/[controller]")]
public class PingController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Public API is working.");
    }
}
