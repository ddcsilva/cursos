using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController(DataContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuario>>> ObterUsuarios()
    {
        var usuarios = await context.Usuarios.ToListAsync();
        return Ok(usuarios);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Usuario>> ObterUsuario(int id)
    {
        var usuario = await context.Usuarios.FindAsync(id);
        if (usuario == null) return NotFound();
        return usuario;
    }
}