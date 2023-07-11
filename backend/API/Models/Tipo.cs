using System;
using System.Collections.Generic;

namespace API.Models
{
  public partial class Tipo
  {
    public Tipo()
    {
      Productos = new HashSet<Producto>();
    }

    public int IdTipo { get; set; }
    public string Nombre { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; }
  }
}
