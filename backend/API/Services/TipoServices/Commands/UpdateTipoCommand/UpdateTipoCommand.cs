using API.Dtos.TipoDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.TipoServices.Commands.UpdateTipoCommand
{
  public class UpdateTipoCommand : IRequest<TipoDto>
  {
    [JsonIgnore]
    public int IdTipo { get; set; }
    public string Nombre { get; set; } = null!;
  }
}
