var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/v1/transactions", () => new { message = "Hello World!" });

app.Run();

// Request
public class Request
{
    public string Title { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int Type { get; set; }
    public decimal Amount { get; set; }
    public long CategoryId { get; set; }
    public string UserId { get; set; } = string.Empty;
}
// Response
// Handler
