using System;
using System.Collections.Generic;

namespace API.Models
{
  public partial class Producto
  {
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

    public virtual Categoria IdCategoriaNavigation { get; set; } = null!;
    public virtual Material IdMaterialNavigation { get; set; } = null!;
    public virtual Tipo IdTipoNavigation { get; set; } = null!;
  }
}
