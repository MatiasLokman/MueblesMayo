using System;
using System.Collections.Generic;

namespace API.Models
{
  public partial class Material
  {
    public Material()
    {
      Productos = new HashSet<Producto>();
    }

    public int IdMaterial { get; set; }
    public string Nombre { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; }
  }
}
