namespace Data.Models.Dtos.Units.Authorization.Requests;

public class LoginRequest
{
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
}