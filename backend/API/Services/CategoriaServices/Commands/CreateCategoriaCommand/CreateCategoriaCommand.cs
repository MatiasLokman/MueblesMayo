using API.Dtos.CategoriaDtos;
using MediatR;

namespace API.Services.CategoriaServices.Commands.CreateCategoriaCommand
{
  public class CreateCategoriaCommand : IRequest<CategoriaDto>
  {
    public string Nombre { get; set; } = null!;
  }
}
