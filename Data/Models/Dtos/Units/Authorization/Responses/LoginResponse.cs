using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Dtos.Units.Authorization.Responses;

public class LoginResponse
{
    public string Token { get; set; } = default!;
    public UserDto User { get; set; } = default!;
}
