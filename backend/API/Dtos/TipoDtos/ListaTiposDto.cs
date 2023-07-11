using API.AnswerBase;

namespace API.Dtos.TipoDtos
{
  public class ListaTiposDto : RespuestaBase
  {
    public List<ListaTipoDto>? Tipos { get; set; }
  }
}
