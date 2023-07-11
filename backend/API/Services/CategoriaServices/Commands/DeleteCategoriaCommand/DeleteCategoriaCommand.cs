using API.Dtos.CategoriaDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.CategoriaServices.Commands.DeleteCategoriaCommand
{
  public class DeleteCategoriaCommand : IRequest<CategoriaDto>
  {
    [JsonIgnore]
    public int IdCategoria { get; set; }
  }
}
