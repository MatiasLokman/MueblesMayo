using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductosQuery
{
  public class GetProductosQuery : IRequest<ListaProductosDto>
  {
  }
}
