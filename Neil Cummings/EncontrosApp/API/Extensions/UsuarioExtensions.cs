using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class UsuarioExtensions
{
    public static UsuarioDTO ConverterParaDTO(this Usuario usuario, ITokenService tokenService)
    {
        return new UsuarioDTO
        {
            Id = usuario.Id,
            Email = usuario.Email,
            NomeExibicao = usuario.NomeExibicao,
            Token = tokenService.CriarToken(usuario)
        };
    }
}