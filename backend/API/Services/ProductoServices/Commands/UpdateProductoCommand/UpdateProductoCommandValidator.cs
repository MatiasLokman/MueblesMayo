using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Commands.UpdateProductoCommand
{
  public class UpdateProductoCommandValidator : AbstractValidator<UpdateProductoCommand>
  {
    private readonly mueblesmayoContext _context;

    public UpdateProductoCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(p => p.IdProducto)
         .NotEmpty().WithMessage("El id no puede estar vacío")
         .NotNull().WithMessage("El id no puede ser nulo")
         .MustAsync(ProductoExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un producto existente");

      RuleFor(p => p.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");

      RuleFor(p => p.Frente)
          .NotNull().WithMessage("El frente no puede ser nulo");

      RuleFor(p => p.Profundidad)
          .NotNull().WithMessage("La profundidad no puede ser nula");

      RuleFor(p => p.Alto)
          .NotNull().WithMessage("El alto no puede ser nulo");

      RuleFor(p => p.EnDescuento)
          .NotNull().WithMessage("EnDescuento no puede ser nulo");

      RuleFor(p => p.Stock)
          .NotNull().WithMessage("El stock no puede ser nulo");

      RuleFor(p => p.IdTipo)
          .NotEmpty().WithMessage("El id del tipo de mueble no puede estar vacío")
          .NotNull().WithMessage("El id del tipo de mueble no puede ser nulo")
          .MustAsync(TipoExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un tipo de mueble existente");

      RuleFor(p => p.IdCategoria)
          .NotEmpty().WithMessage("El id de la categoría no puede estar vacío")
          .NotNull().WithMessage("El id de la categoría no puede ser nulo")
          .MustAsync(CategoriaExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de una categoría existente");

      RuleFor(p => p.IdMaterial)
          .NotEmpty().WithMessage("El id del material no puede estar vacío")
          .NotNull().WithMessage("El id del material no puede ser nulo")
          .MustAsync(MaterialExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un material existente");

      RuleFor(p => p.IdImagen)
          .NotEmpty().WithMessage("El id de la imagen no puede estar vacío")
          .NotNull().WithMessage("El id de la imagen no puede ser nulo");

      RuleFor(p => p.UrlImagen)
          .NotEmpty().WithMessage("La url de la imagen no puede estar vacía")
          .NotNull().WithMessage("La url de la imagen no puede ser nula");
    }

    private async Task<bool> ProductoExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Productos.AnyAsync(p => p.IdProducto == id);
      return existe;
    }

    private async Task<bool> TipoExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Tipos.AnyAsync(p => p.IdTipo == id);
      return existe;
    }

    private async Task<bool> CategoriaExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Categorias.AnyAsync(p => p.IdCategoria == id);
      return existe;
    }

    private async Task<bool> MaterialExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Materiales.AnyAsync(p => p.IdMaterial == id);
      return existe;
    }

  }
}
