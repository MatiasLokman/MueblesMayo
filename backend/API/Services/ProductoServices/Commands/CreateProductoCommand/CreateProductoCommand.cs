using API.Dtos.ProductoDtos;
using MediatR;

namespace API.Services.ProductoServices.Commands.CreateProductoCommand
{
  public class CreateProductoCommand : IRequest<ProductoDto>
  {
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
