namespace Dima.Core.Responses;

public class BaseResponse
{
    private readonly int _statusCode;

    public BaseResponse(string? data, string message, int statusCode)
    {
        Data = data;
        Message = message;
        _statusCode = statusCode;
    }

    public string? Data { get; set; }
    public string Message { get; set; } = string.Empty;

    public bool IsSuccess => _statusCode is >= 200 and <= 299;
}