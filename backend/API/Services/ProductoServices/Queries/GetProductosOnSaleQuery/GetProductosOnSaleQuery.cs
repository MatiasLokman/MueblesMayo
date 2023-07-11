using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductosOnSaleQuery
{
  public class GetProductosOnSaleQuery : IRequest<ListaProductosDto>
  {
  }
}
