using Data.Models.Dtos.Units;
using Data.Models.Dtos.Units.Authorization.Requests;
using Data.Models.Dtos.Units.Authorization.Responses;

namespace BusinessLayer.Interfaces;

public interface IUserService
{
    Task<UserDto> RegisterUserAsync(RegisterRequest request);
    Task<LoginResponse?> AuthenticateAsync(LoginRequest request);
}