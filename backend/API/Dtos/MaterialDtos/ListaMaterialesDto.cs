using API.AnswerBase;

namespace API.Dtos.MaterialDtos
{
  public class ListaMaterialesDto : RespuestaBase
  {
    public List<ListaMaterialDto>? Materiales { get; set; }
  }
}
