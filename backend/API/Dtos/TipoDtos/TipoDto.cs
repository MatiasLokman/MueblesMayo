using API.AnswerBase;

namespace API.Dtos.TipoDtos
{
  public class TipoDto : RespuestaBase
  {
    public int IdTipo { get; set; }
    public string Nombre { get; set; } = null!;
  }
}
