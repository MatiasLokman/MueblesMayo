using API.AnswerBase;

namespace API.Dtos.CategoriaDtos
{
  public class ListaCategoriasDto : RespuestaBase
  {
    public List<ListaCategoriaDto>? Categorias { get; set; }
  }
}
