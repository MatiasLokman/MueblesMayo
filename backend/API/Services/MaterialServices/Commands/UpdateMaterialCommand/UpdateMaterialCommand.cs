using API.Dtos.MaterialDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.MaterialServices.Commands.UpdateMaterialCommand
{
  public class UpdateMaterialCommand : IRequest<MaterialDto>
  {
    [JsonIgnore]
    public int IdMaterial { get; set; }
    public string Nombre { get; set; } = null!;
  }
}
