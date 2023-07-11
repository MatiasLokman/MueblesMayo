using API.Dtos.ProductoDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.ProductoServices.Commands.DeleteProductoCommand
{
  public class DeleteProductoCommand : IRequest<ProductoDto>
  {
    [JsonIgnore]
    public int IdProducto { get; set; }
  }
}
