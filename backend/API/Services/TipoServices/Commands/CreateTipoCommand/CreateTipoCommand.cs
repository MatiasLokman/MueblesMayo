using API.Dtos.TipoDtos;
using MediatR;

namespace API.Services.TipoServices.Commands.CreateTipoCommand
{
  public class CreateTipoCommand : IRequest<TipoDto>
  {
    public string Nombre { get; set; } = null!;
  }
}
