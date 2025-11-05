using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsuariosController(AppDbContext context) : MainController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Usuario>>> ObterUsuarios()
    {
        var usuarios = await context.Usuarios.ToListAsync();
        return Ok(usuarios);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Usuario>> ObterUsuarioPorId(string id)
    {
        var usuario = await context.Usuarios.FindAsync(id);

        if (usuario == null)
        {
            return NotFound();
        }

        return Ok(usuario);
    }
}