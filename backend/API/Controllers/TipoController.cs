using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using API.Dtos.TipoDtos;
using API.Services.TipoServices.Queries.GetTiposQuery;
using API.Services.TipoServices.Commands.CreateTipoCommand;
using API.Services.TipoServices.Commands.UpdateTipoCommand;
using API.Services.TipoServices.Commands.DeleteTipoCommand;

namespace API.Controllers;

[ApiController]
[Route("tipo")]

public class TipoController : ControllerBase
{
  private readonly IMediator _mediator;

  public TipoController(IMediator mediator)
  {
    _mediator = mediator;
  }


  [HttpGet]
  public Task<ListaTiposDto> GetTipos()
  {
    var tipos = _mediator.Send(new GetTiposQuery());
    return tipos;
  }


  [HttpPost]
  [Authorize]
  public async Task<TipoDto> CreateTipo(CreateTipoCommand command)
  {
    var tipoCreado = await _mediator.Send(command);
    return tipoCreado;
  }


  [HttpPut("{id}")]
  [Authorize]
  public async Task<TipoDto> UpdateTipo(int id, UpdateTipoCommand command)
  {
    command.IdTipo = id;
    var tipoActualizado = await _mediator.Send(command);
    return tipoActualizado;
  }


  [HttpDelete("{id}")]
  [Authorize]
  public async Task<TipoDto> DeleteTipo(int id)
  {
    var tipoEliminado = await _mediator.Send(new DeleteTipoCommand { IdTipo = id });
    return tipoEliminado;
  }

}
