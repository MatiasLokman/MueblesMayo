using API.Dtos.UsuarioDto;
using MediatR;

namespace API.Services.UsuarioServices.Commands.LoginUsuarioCommand
{
  public class LoginUsuarioCommand : IRequest<UsuarioDto>
  {
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
  }
}
