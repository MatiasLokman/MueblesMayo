namespace API.Dtos.ProductoDtos
{
  public class ListaProductoDto
  {
    public int IdProducto { get; set; }
    public string Nombre { get; set; } = null!;
    public float? Frente { get; set; }
    public float? Profundidad { get; set; }
    public float? Alto { get; set; }
    public bool EnDescuento { get; set; }
    public string? NombreMaterial { get; set; }
    public string? NombreTipo { get; set; }
    public string? NombreCategoria { get; set; }
    public string? UrlImagen { get; set; }
  }
}
