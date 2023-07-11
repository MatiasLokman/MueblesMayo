using API.Dtos.MaterialDtos;
using MediatR;

namespace API.Services.MaterialServices.Commands.CreateMaterialCommand
{
  public class CreateMaterialCommand : IRequest<MaterialDto>
  {
    public string Nombre { get; set; } = null!;
  }
}
