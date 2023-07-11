using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductosByTypeQuery
{
  public class GetProductosByTypeQueryValidator : AbstractValidator<GetProductosByTypeQuery>
  {
    private readonly mueblesmayoContext _context;

    public GetProductosByTypeQueryValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(p => p.type)
          .NotEmpty().WithMessage("El tipo de mueble no puede estar vacío")
          .NotNull().WithMessage("El tipo de mueble no puede ser nulo")
          .MustAsync(TipoExiste).WithMessage("No hay muebles con el tipo: {PropertyValue}");
    }

    private async Task<bool> TipoExiste(string type, CancellationToken token)
    {
      bool existe = await _context.Productos.AnyAsync(p => p.IdTipoNavigation.Nombre == type);
      return existe;
    }

  }
}
