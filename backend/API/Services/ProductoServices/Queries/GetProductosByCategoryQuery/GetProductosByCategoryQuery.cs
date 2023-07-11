using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductosByCategoryQuery
{
  public record GetProductosByCategoryQuery(string category) : IRequest<ListaProductosDto>;
}
