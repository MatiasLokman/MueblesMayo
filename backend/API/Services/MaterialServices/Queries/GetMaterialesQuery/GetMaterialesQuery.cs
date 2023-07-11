using API.Dtos.MaterialDtos;
using MediatR;

namespace API.Services.MaterialServices.Queries.GetMaterialesQuery
{
  public class GetMaterialesQuery : IRequest<ListaMaterialesDto>
  {
  }
}
