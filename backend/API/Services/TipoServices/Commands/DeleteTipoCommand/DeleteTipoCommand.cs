using API.Dtos.TipoDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.TipoServices.Commands.DeleteTipoCommand
{
  public class DeleteTipoCommand : IRequest<TipoDto>
  {
    [JsonIgnore]
    public int IdTipo { get; set; }
  }
}
