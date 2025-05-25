namespace Data.Models.Dtos.Units.Authorization.Requests;

public class RegisterRequest : UserDto
{
    public string Password { get; set; } = default!;
}
