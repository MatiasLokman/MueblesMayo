using API.AnswerBase;

namespace API.Dtos.ProductoDtos
{
  public class ListaProductosManageDto : RespuestaBase
  {
    public List<ProductoManageDto>? Productos { get; set; }
  }
}
