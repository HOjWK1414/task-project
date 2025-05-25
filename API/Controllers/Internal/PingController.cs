using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/internal/[controller]")]
public class PingController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Internal API is working.");
    }
}
