var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/v1/transactions", () => new { message = "Hello World!" });
app.MapPost(
    "/v1/transactions",
    (Request request, Handler handler) => new Response
    {
        Id = 1,
        Title = "Nova transação"
    })
    .WithName("CreateTransaction")
    .WithSummary("Cria uma nova transação")
    .Produces<Response>();

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
public class Response
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
}

// Handler

public class Handler
{
    public Response Handle(Request request)
    {
        return new Response
        {
            Id = 4,
            Title = request.Title
        };
    }
}
