using Microsoft.AspNetCore.Mvc;
using MediatR;
using API.Dtos.UsuarioDto;
using API.Services.UsuarioServices.Commands.LoginUsuarioCommand;

namespace API.Controllers;

[ApiController]
[Route("usuario")]

public class UsuarioController : ControllerBase
{
  private readonly IMediator _mediator;

  public UsuarioController(IMediator mediator)
  {
    _mediator = mediator;
  }

  [HttpPost]
  [Route("login")]
  public async Task<UsuarioDto> LoginUsuario(LoginUsuarioCommand command)
  {
    var token = await _mediator.Send(command);
    return token;
  }

}
