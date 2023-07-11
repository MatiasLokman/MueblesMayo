using API.Dtos.MaterialDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.MaterialServices.Commands.DeleteMaterialCommand
{
  public class DeleteMaterialCommand : IRequest<MaterialDto>
  {
    [JsonIgnore]
    public int IdMaterial { get; set; }
  }
}
