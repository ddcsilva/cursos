using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AutenticacaoController(AppDbContext context) : MainController
{
    [HttpPost("registrar")]
    public async Task<ActionResult<Usuario>> RegistrarAsync(string email, string nomeExibicao, string senha)
    {
        using var hmac = new HMACSHA512();

        var usuario = new Usuario
        {
            Email = email,
            NomeExibicao = nomeExibicao,
            SenhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(senha)),
            SenhaSalt = hmac.Key
        };

        await context.Usuarios.AddAsync(usuario);
        await context.SaveChangesAsync();

        return Ok(usuario);
    }
}