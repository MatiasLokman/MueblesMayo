using API.Dtos.ProductoDtos;
using MediatR;
using System.Text.Json.Serialization;

namespace API.Services.ProductoServices.Commands.UpdateProductoCommand
{
  public class UpdateProductoCommand : IRequest<ProductoDto>
  {
    [JsonIgnore]
    public int IdProducto { get; set; }
    public string Nombre { get; set; } = null!;
    public float? Frente { get; set; }
    public float? Profundidad { get; set; }
    public float? Alto { get; set; }
    public bool EnDescuento { get; set; }
    public short Stock { get; set; }
    public int IdTipo { get; set; }
    public int IdCategoria { get; set; }
    public int IdMaterial { get; set; }
    public string? IdImagen { get; set; } = null!;
    public string? UrlImagen { get; set; } = null!;
  }
}
