using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AutenticacaoController(AppDbContext context) : MainController
{
    [HttpPost("registrar")]
    public async Task<ActionResult<Usuario>> RegistrarAsync(RegistroDTO registroDTO)
    {
        if (await EmailExisteAsync(registroDTO.Email))
        {
            return BadRequest($"O email {registroDTO.Email} já está em uso.");
        }

        using var hmac = new HMACSHA512();

        var usuario = new Usuario
        {
            Email = registroDTO.Email,
            NomeExibicao = registroDTO.NomeExibicao,
            SenhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registroDTO.Senha)),
            SenhaSalt = hmac.Key
        };

        await context.Usuarios.AddAsync(usuario);
        await context.SaveChangesAsync();

        return Ok(usuario);
    }

    private async Task<bool> EmailExisteAsync(string email)
    {
        return await context.Usuarios.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}