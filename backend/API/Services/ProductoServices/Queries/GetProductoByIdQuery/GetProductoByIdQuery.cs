using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductoByIdQuery
{
  public record GetProductoByIdQuery(int id) : IRequest<ProductoDto>;
}
