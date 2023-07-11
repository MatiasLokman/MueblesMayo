using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using API.Dtos.CategoriaDtos;
using API.Services.CategoriaServices.Queries.GetCategoriasQuery;
using API.Services.CategoriaServices.Commands.CreateCategoriaCommand;
using API.Services.CategoriaServices.Commands.UpdateCategoriaCommand;
using API.Services.CategoriaServices.Commands.DeleteCategoriaCommand;

namespace API.Controllers;

[ApiController]
[Route("categoria")]
public class CategoriaController : ControllerBase
{
  private readonly IMediator _mediator;

  public CategoriaController(IMediator mediator)
  {
    _mediator = mediator;
  }


  [HttpGet]
  public Task<ListaCategoriasDto> GetCategorias()
  {
    var categorias = _mediator.Send(new GetCategoriasQuery());
    return categorias;
  }


  [HttpPost]
  [Authorize]
  public async Task<CategoriaDto> CreateCategoria(CreateCategoriaCommand command)
  {
    var categoriaCreada = await _mediator.Send(command);
    return categoriaCreada;
  }


  [HttpPut("{id}")]
  [Authorize]
  public async Task<CategoriaDto> UpdateCategoria(int id, UpdateCategoriaCommand command)
  {
    command.IdCategoria = id;
    var categoriaActualizada = await _mediator.Send(command);
    return categoriaActualizada;
  }


  [HttpDelete("{id}")]
  [Authorize]
  public async Task<CategoriaDto> DeleteCategoria(int id)
  {
    var categoriaEliminada = await _mediator.Send(new DeleteCategoriaCommand { IdCategoria = id });
    return categoriaEliminada;
  }

}
