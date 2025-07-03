using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsuariosController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<Usuario>> ObterUsuarios()
    {
        var usuarios = context.Usuarios.ToList();
        return usuarios;
    }

    [HttpGet("{id}")]
    public ActionResult<Usuario> ObterUsuarioPorId(int id)
    {
        var usuario = context.Usuarios.Find(id);

        if (usuario == null)
        {
            return NotFound();
        }

        return usuario;
    }
}