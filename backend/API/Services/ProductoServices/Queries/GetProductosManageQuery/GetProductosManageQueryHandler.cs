using API.Data;
using API.Dtos.CategoriaDtos;
using API.Dtos.ProductoDtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductosManageQuery
{
  public class GetProductosManageQueryHandler : IRequestHandler<GetProductosManageQuery, ListaProductosManageDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;

    public GetProductosManageQueryHandler(mueblesmayoContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<ListaProductosManageDto> Handle(GetProductosManageQuery request, CancellationToken cancellationToken)
    {
      try
      {
        var productosManage = await _context.Productos
            .Select(x => new ProductoManageDto
            {
              IdProducto = x.IdProducto,
              Nombre = x.Nombre,
              Frente = x.Frente,
              Profundidad = x.Profundidad,
              Alto = x.Alto,
              EnDescuento = x.EnDescuento,
              Stock = x.Stock,
              IdMaterial = x.IdMaterial,
              IdTipo = x.IdTipo,
              IdCategoria = x.IdCategoria,
              NombreMaterial = x.IdMaterialNavigation.Nombre,
              NombreTipo = x.IdTipoNavigation.Nombre,
              NombreCategoria = x.IdCategoriaNavigation.Nombre,
              IdImagen = x.IdImagen,
              UrlImagen = x.UrlImagen
            })
            .OrderBy(x => x.NombreTipo)
            .ThenBy(x => x.NombreCategoria)
            .ThenBy(x => x.NombreMaterial)
            .ToListAsync();

        if (productosManage.Count > 0)
        {
          var listaProductosManageDto = new ListaProductosManageDto();
          listaProductosManageDto.Productos = productosManage;

          listaProductosManageDto.StatusCode = StatusCodes.Status200OK;
          listaProductosManageDto.ErrorMessage = string.Empty;
          listaProductosManageDto.IsSuccess = true;

          return listaProductosManageDto;
        }
        else
        {
          var listaProductosManageVacia = new ListaProductosManageDto();

          listaProductosManageVacia.StatusCode = StatusCodes.Status404NotFound;
          listaProductosManageVacia.ErrorMessage = "No se han encontrado productos";
          listaProductosManageVacia.IsSuccess = false;

          return listaProductosManageVacia;
        }
      }
      catch (Exception ex)
      {
        var listaProductosManageVacia = new ListaProductosManageDto();

        listaProductosManageVacia.StatusCode = StatusCodes.Status400BadRequest;
        listaProductosManageVacia.ErrorMessage = ex.Message;
        listaProductosManageVacia.IsSuccess = false;

        return listaProductosManageVacia;
      }
    }

  }
}
