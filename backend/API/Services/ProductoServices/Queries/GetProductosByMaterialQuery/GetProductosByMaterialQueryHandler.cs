using API.Data;
using API.Dtos.ProductoDtos;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductosByMaterialQuery
{
  public class GetProductosByMaterialQueryHandler : IRequestHandler<GetProductosByMaterialQuery, ListaProductosDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<GetProductosByMaterialQuery> _validator;

    public GetProductosByMaterialQueryHandler(mueblesmayoContext context, IMapper mapper, IValidator<GetProductosByMaterialQuery> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<ListaProductosDto> Handle(GetProductosByMaterialQuery request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var ListaProductosVacia = new ListaProductosDto();

          ListaProductosVacia.StatusCode = StatusCodes.Status400BadRequest;
          ListaProductosVacia.ErrorMessage = string.Join(". ", validationResult.Errors.Select(e => e.ErrorMessage));
          ListaProductosVacia.IsSuccess = false;

          return ListaProductosVacia;
        }
        else
        {
          var productos = await _context.Productos
              .Where(x => x.IdMaterialNavigation.Nombre == request.material && x.Stock > 0)
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
              }).ToListAsync();

          if (productos == null)
          {
            var ListaProductosVacia = new ListaProductosDto();

            ListaProductosVacia.StatusCode = StatusCodes.Status404NotFound;
            ListaProductosVacia.ErrorMessage = "No hay productos con ese material";
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
