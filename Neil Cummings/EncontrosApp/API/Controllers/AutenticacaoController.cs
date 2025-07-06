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

    [HttpPost("login")]
    public async Task<ActionResult<Usuario>> LoginAsync(LoginDTO loginDTO)
    {
        var usuario = await context.Usuarios.SingleOrDefaultAsync(u => u.Email == loginDTO.Email);

        if (usuario == null)
        {
            return Unauthorized("Email ou senha inválidos.");
        }

        using var hmac = new HMACSHA512(usuario.SenhaSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Senha));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != usuario.SenhaHash[i])
            {
                return Unauthorized("Email ou senha inválidos.");
            }
        }

        return Ok(usuario);
    }

    private async Task<bool> EmailExisteAsync(string email)
    {
        return await context.Usuarios.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}