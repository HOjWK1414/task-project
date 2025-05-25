using BusinessLayer.Interfaces;
using Data.Models.Dtos.Units;
using Data.Models.Dtos.Units.Authorization.Requests;
using Data.Models.Dtos.Units.Authorization.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var user = await _userService.RegisterUserAsync(request);
            return Ok(ResultDto<UserDto>.Ok(user));
        }
        catch (Exception ex)
        {
            return Ok(ResultDto<object>.Error(ex.Message));
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var response = await _userService.AuthenticateAsync(request);
            if (response == null)
                return Ok(ResultDto<object>.Warning("Invalid credentials"));

            return Ok(ResultDto<LoginResponse>.Ok(response));
        }
        catch (Exception ex)
        {
            return Ok(ResultDto<object>.Error(ex.Message));
        }
    }
}
