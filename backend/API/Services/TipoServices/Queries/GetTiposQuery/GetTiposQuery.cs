using API.Dtos.TipoDtos;
using MediatR;

namespace API.Services.TipoServices.Queries.GetTiposQuery
{
  public class GetTiposQuery : IRequest<ListaTiposDto>
  {
  }
}
