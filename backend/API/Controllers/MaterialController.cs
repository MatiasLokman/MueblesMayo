using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using API.Dtos.MaterialDtos;
using API.Services.MaterialServices.Queries.GetMaterialesQuery;
using API.Services.MaterialServices.Commands.CreateMaterialCommand;
using API.Services.MaterialServices.Commands.UpdateMaterialCommand;
using API.Services.MaterialServices.Commands.DeleteMaterialCommand;

namespace API.Controllers;

[ApiController]
[Route("material")]
public class MaterialController : ControllerBase
{
  private readonly IMediator _mediator;
  public MaterialController(IMediator mediator)
  {
    _mediator = mediator;
  }


  [HttpGet]
  public Task<ListaMaterialesDto> GetMateriales()
  {
    var materiales = _mediator.Send(new GetMaterialesQuery());
    return materiales;
  }


  [HttpPost]
  [Authorize]
  public async Task<MaterialDto> CreateMaterial(CreateMaterialCommand command)
  {
    var materialCreado = await _mediator.Send(command);
    return materialCreado;
  }


  [HttpPut("{id}")]
  [Authorize]
  public async Task<MaterialDto> UpdateMaterial(int id, UpdateMaterialCommand command)
  {
    command.IdMaterial = id;
    var materialActualizado = await _mediator.Send(command);
    return materialActualizado;
  }


  [HttpDelete("{id}")]
  [Authorize]
  public async Task<MaterialDto> DeleteMaterial(int id)
  {
    var materialEliminado = await _mediator.Send(new DeleteMaterialCommand { IdMaterial = id });
    return materialEliminado;
  }

}
