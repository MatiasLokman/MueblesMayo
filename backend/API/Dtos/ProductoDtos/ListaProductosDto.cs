using API.AnswerBase;

namespace API.Dtos.ProductoDtos
{
  public class ListaProductosDto : RespuestaBase
  {
    public List<ListaProductoDto>? Productos { get; set; }
  }
}
