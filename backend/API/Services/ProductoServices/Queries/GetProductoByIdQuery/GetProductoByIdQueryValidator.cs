using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductoByIdQuery
{
  public class GetProductoByIdQueryValidator : AbstractValidator<GetProductoByIdQuery>
  {
    private readonly mueblesmayoContext _context;

    public GetProductoByIdQueryValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(p => p.id)
          .NotEmpty().WithMessage("El id no puede estar vacío")
          .NotNull().WithMessage("El id no puede ser nulo")
          .MustAsync(ProductoExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un producto existente");

      _context = context;
    }

    private async Task<bool> ProductoExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Productos.AnyAsync(p => p.IdProducto == id);
      return existe;
    }

  }
}
