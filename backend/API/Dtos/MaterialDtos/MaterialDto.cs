using API.AnswerBase;

namespace API.Dtos.MaterialDtos
{
  public class MaterialDto : RespuestaBase
  {
    public int IdMaterial { get; set; }
    public string Nombre { get; set; } = null!;
  }
}

