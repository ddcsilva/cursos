namespace API.DTOs;

public class UsuarioDTO
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string NomeExibicao { get; set; }
    public required string Token { get; set; }
    public string? FotoUrl { get; set; }
}