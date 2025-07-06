namespace API.Entities;

public class Usuario
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string NomeExibicao { get; set; }
    public required string Email { get; set; }
    public required byte[] SenhaHash { get; set; }
    public required byte[] SenhaSalt { get; set; }
}