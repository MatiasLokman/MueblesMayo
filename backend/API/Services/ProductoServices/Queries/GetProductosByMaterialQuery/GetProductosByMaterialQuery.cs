using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductosByMaterialQuery
{
  public record GetProductosByMaterialQuery(string material) : IRequest<ListaProductosDto>;
}
