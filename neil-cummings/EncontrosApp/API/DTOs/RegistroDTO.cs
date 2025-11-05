using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegistroDTO
{
    [Required]
    public string NomeExibicao { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(4)]
    public string Senha { get; set; } = string.Empty;
}