using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Queries.GetProductosManageQuery
{
  public class GetProductosManageQuery : IRequest<ListaProductosManageDto>
  {
  }
}
