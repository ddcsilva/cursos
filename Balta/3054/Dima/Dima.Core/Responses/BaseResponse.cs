using System.Text.Json.Serialization;

namespace Dima.Core.Responses;

public class BaseResponse<TData>
{
    private const int DEFAULT_STATUS_CODE = 200;
    private readonly int _statusCode = DEFAULT_STATUS_CODE;

    [JsonConstructor]
    public BaseResponse() => _statusCode = DEFAULT_STATUS_CODE;

    public BaseResponse(TData? data, int statusCode = DEFAULT_STATUS_CODE, string? message = null)
    {
        Data = data;
        Message = message;
        _statusCode = statusCode;
    }

    public TData? Data { get; set; }
    public string? Message { get; set; }

    [JsonIgnore]
    public bool IsSuccess
        => _statusCode is >= 200 and <= 299;
}