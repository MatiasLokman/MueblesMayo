using API.Data;
using API.Dtos.MaterialDtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Services.MaterialServices.Queries.GetMaterialesQuery
{
  public class GetMaterialesQueryHandler : IRequestHandler<GetMaterialesQuery, ListaMaterialesDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    public GetMaterialesQueryHandler(mueblesmayoContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<ListaMaterialesDto> Handle(GetMaterialesQuery request, CancellationToken cancellationToken)
    {
      try
      {
        var materiales = await _context.Materiales
            .Select(x => new ListaMaterialDto { IdMaterial = x.IdMaterial, Nombre = x.Nombre })
            .ToListAsync();

        if (materiales.Count > 0)
        {
          var listaMaterialesDto = new ListaMaterialesDto();
          listaMaterialesDto.Materiales = materiales;

          listaMaterialesDto.StatusCode = StatusCodes.Status200OK;
          listaMaterialesDto.ErrorMessage = string.Empty;
          listaMaterialesDto.IsSuccess = true;

          return listaMaterialesDto;
        }
        else
        {
          var listaMaterialesVacia = new ListaMaterialesDto();

          listaMaterialesVacia.StatusCode = StatusCodes.Status404NotFound;
          listaMaterialesVacia.ErrorMessage = "No se han encontrado materiales";
          listaMaterialesVacia.IsSuccess = false;

          return listaMaterialesVacia;
        }
      }
      catch (Exception ex)
      {
        var listaMaterialesVacia = new ListaMaterialesDto();

        listaMaterialesVacia.StatusCode = StatusCodes.Status400BadRequest;
        listaMaterialesVacia.ErrorMessage = ex.Message;
        listaMaterialesVacia.IsSuccess = false;

        return listaMaterialesVacia;
      }
    }
  }
}
