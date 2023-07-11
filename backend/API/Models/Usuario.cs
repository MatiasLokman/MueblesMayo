using System;
using System.Collections.Generic;

namespace API.Models
{
  public partial class Usuario
  {
    public int IdUsuario { get; set; }
    public string Nombre { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public DateOnly FechaAlta { get; set; }
  }
}
