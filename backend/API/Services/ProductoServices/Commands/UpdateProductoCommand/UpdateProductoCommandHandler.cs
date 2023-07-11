using API.Data;
using API.Dtos.ProductoDtos;
using AutoMapper;
using FluentValidation;
using MediatR;


namespace API.Services.ProductoServices.Commands.UpdateProductoCommand
{
  public class UpdateProductoCommandHandler : IRequestHandler<UpdateProductoCommand, ProductoDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateProductoCommand> _validator;

    public UpdateProductoCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<UpdateProductoCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<ProductoDto> Handle(UpdateProductoCommand request, CancellationToken cancellationToken)
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
          var ProductoToUpdate = await _context.Productos.FindAsync(request.IdProducto);

          if (ProductoToUpdate == null)
          {
            var ProductoVacio = new ProductoDto();

            ProductoVacio.StatusCode = StatusCodes.Status404NotFound;
            ProductoVacio.ErrorMessage = "El producto no existe";
            ProductoVacio.IsSuccess = false;

            return ProductoVacio;
          }
          else
          {
            ProductoToUpdate.Nombre = request.Nombre;
            ProductoToUpdate.Frente = request.Frente;
            ProductoToUpdate.Profundidad = request.Profundidad;
            ProductoToUpdate.Alto = request.Alto;
            ProductoToUpdate.EnDescuento = request.EnDescuento;
            ProductoToUpdate.Stock = request.Stock;
            ProductoToUpdate.IdTipo = request.IdTipo;
            ProductoToUpdate.IdCategoria = request.IdCategoria;
            ProductoToUpdate.IdMaterial = request.IdMaterial;
            ProductoToUpdate.IdImagen = request.IdImagen;
            ProductoToUpdate.UrlImagen = request.UrlImagen;

            await _context.SaveChangesAsync();

            _context.Attach(ProductoToUpdate);

            await _context.Entry(ProductoToUpdate)
                .Reference(p => p.IdTipoNavigation)
                .LoadAsync();
            await _context.Entry(ProductoToUpdate)
                .Reference(p => p.IdCategoriaNavigation)
                .LoadAsync();
            await _context.Entry(ProductoToUpdate)
                .Reference(p => p.IdMaterialNavigation)
                .LoadAsync();

            var productoDto = _mapper.Map<ProductoDto>(ProductoToUpdate);

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
