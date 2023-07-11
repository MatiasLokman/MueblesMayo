using API.Dtos.CategoriaDtos;
using MediatR;

namespace API.Services.CategoriaServices.Queries.GetCategoriasQuery
{
  public class GetCategoriasQuery : IRequest<ListaCategoriasDto>
  {
  }
}
