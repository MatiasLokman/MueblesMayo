using API.Data;
using API.Dtos.TipoDtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Services.TipoServices.Queries.GetTiposQuery
{
  public class GetTiposQueryHandler : IRequestHandler<GetTiposQuery, ListaTiposDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    public GetTiposQueryHandler(mueblesmayoContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<ListaTiposDto> Handle(GetTiposQuery request, CancellationToken cancellationToken)
    {
      try
      {
        var tipos = await _context.Tipos
            .Select(x => new ListaTipoDto { IdTipo = x.IdTipo, Nombre = x.Nombre })
            .OrderBy(x => x.Nombre)
            .ToListAsync();

        if (tipos.Count > 0)
        {
          var listaTiposDto = new ListaTiposDto();
          listaTiposDto.Tipos = tipos;

          listaTiposDto.StatusCode = StatusCodes.Status200OK;
          listaTiposDto.ErrorMessage = string.Empty;
          listaTiposDto.IsSuccess = true;

          return listaTiposDto;
        }
        else
        {
          var listaTiposVacia = new ListaTiposDto();

          listaTiposVacia.StatusCode = StatusCodes.Status404NotFound;
          listaTiposVacia.ErrorMessage = "No se han encontrado tipos de muebles";
          listaTiposVacia.IsSuccess = false;

          return listaTiposVacia;
        }
      }
      catch (Exception ex)
      {
        var listaTiposVacia = new ListaTiposDto();

        listaTiposVacia.StatusCode = StatusCodes.Status400BadRequest;
        listaTiposVacia.ErrorMessage = ex.Message;
        listaTiposVacia.IsSuccess = false;

        return listaTiposVacia;
      }
    }
  }
}
