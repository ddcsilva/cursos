using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
    string CriarToken(Usuario usuario);
}