using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Dtos.Units;

public class ResultDto<T>
{
    /// <summary>
    /// 0 = OK, 1 = Warning, 2 = Error
    /// </summary>
    public int ErrorLevel { get; set; } = 0;
    public string? Message { get; set; }
    public T? Data { get; set; }

    public static ResultDto<T> Ok(T data) => new() { Data = data };
    public static ResultDto<T> Warning(string message) => new() { ErrorLevel = 1, Message = message };
    public static ResultDto<T> Error(string message) => new() { ErrorLevel = 2, Message = message };
}

