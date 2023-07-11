using API.Data;
using API.Dtos.ProductoDtos;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductoByIdQuery
{
  public class GetProductoByIdQueryHandler : IRequestHandler<GetProductoByIdQuery, ProductoDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<GetProductoByIdQuery> _validator;

    public GetProductoByIdQueryHandler(mueblesmayoContext context, IMapper mapper, IValidator<GetProductoByIdQuery> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<ProductoDto> Handle(GetProductoByIdQuery request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var ProductoVacio = new ProductoDto();

          ProductoVacio.StatusCode = StatusCodes.Status400BadRequest;
          ProductoVacio.ErrorMessage = string.Join(". ", validationResult.Errors.Select(e => e.ErrorMessage));
          ProductoVacio.IsSuccess = false;

          return ProductoVacio;
        }
        else
        {
          var producto = await _context.Productos
              .Include(p => p.IdTipoNavigation)
              .Include(p => p.IdCategoriaNavigation)
              .Include(p => p.IdMaterialNavigation)
              .FirstAsync(p => p.IdProducto == request.id);

          if (producto == null)
          {
            var ProductoVacio = new ProductoDto();

            ProductoVacio.StatusCode = StatusCodes.Status404NotFound;
            ProductoVacio.ErrorMessage = "El producto no existe";
            ProductoVacio.IsSuccess = false;

            return ProductoVacio;
          }
          else
          {
            var productoDto = _mapper.Map<ProductoDto>(producto);

            productoDto.StatusCode = StatusCodes.Status200OK;
            productoDto.IsSuccess = true;
            productoDto.ErrorMessage = "";

            return productoDto;
          }
        }
      }
      catch (Exception ex)
      {
        var ProductoVacio = new ProductoDto();

        ProductoVacio.StatusCode = StatusCodes.Status400BadRequest;
        ProductoVacio.ErrorMessage = ex.Message;
        ProductoVacio.IsSuccess = false;

        return ProductoVacio;
      }
    }

  }
}
