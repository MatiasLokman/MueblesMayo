using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductosByTypeQuery
{
  public record GetProductosByTypeQuery(string type) : IRequest<ListaProductosDto>;
}
