using API.Data;
using API.Dtos.ProductoDtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductosOnSaleQuery
{
  public class GetProductosOnSaleQueryHandler : IRequestHandler<GetProductosOnSaleQuery, ListaProductosDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;

    public GetProductosOnSaleQueryHandler(mueblesmayoContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<ListaProductosDto> Handle(GetProductosOnSaleQuery request, CancellationToken cancellationToken)
    {

      try
      {
        var productos = await _context.Productos
                .Where(x => x.EnDescuento == true && x.Stock > 0)
                .Select(x => new ListaProductoDto
                {
                  IdProducto = x.IdProducto,
                  Nombre = x.Nombre,
                  Frente = x.Frente,
                  Profundidad = x.Profundidad,
                  Alto = x.Alto,
                  EnDescuento = x.EnDescuento,
                  NombreMaterial = x.IdMaterialNavigation.Nombre,
                  NombreTipo = x.IdTipoNavigation.Nombre,
                  NombreCategoria = x.IdCategoriaNavigation.Nombre,
                  UrlImagen = x.UrlImagen
                })
                .OrderBy(x => x.NombreTipo)
                .ThenBy(x => x.NombreCategoria)
                .ThenBy(x => x.NombreMaterial)
                .ToListAsync();

        if (productos == null)
        {
          var ListaProductosVacia = new ListaProductosDto();

          ListaProductosVacia.StatusCode = StatusCodes.Status404NotFound;
          ListaProductosVacia.ErrorMessage = "No hay productos en descuento";
          ListaProductosVacia.IsSuccess = false;

          return ListaProductosVacia;
        }
        else
        {
          var listaProductosDto = new ListaProductosDto();
          listaProductosDto.Productos = productos;

          listaProductosDto.StatusCode = StatusCodes.Status200OK;
          listaProductosDto.IsSuccess = true;
          listaProductosDto.ErrorMessage = "";

          return listaProductosDto;
        }
      }
      catch (Exception ex)
      {
        var ListaProductosVacia = new ListaProductosDto();

        ListaProductosVacia.StatusCode = StatusCodes.Status400BadRequest;
        ListaProductosVacia.ErrorMessage = ex.Message;
        ListaProductosVacia.IsSuccess = false;

        return ListaProductosVacia;
      }
    }

  }
}
