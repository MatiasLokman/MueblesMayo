using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Commands.DeleteProductoCommand
{
  public class DeleteProductoCommandValidator : AbstractValidator<DeleteProductoCommand>
  {
    private readonly mueblesmayoContext _context;

    public DeleteProductoCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(p => p.IdProducto)
          .NotEmpty().WithMessage("El id no puede estar vacío")
          .NotNull().WithMessage("El id no puede ser nulo")
          .MustAsync(ProductoExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un producto existente");
    }

    private async Task<bool> ProductoExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Productos.AnyAsync(p => p.IdProducto == id);
      return existe;
    }

  }
}
