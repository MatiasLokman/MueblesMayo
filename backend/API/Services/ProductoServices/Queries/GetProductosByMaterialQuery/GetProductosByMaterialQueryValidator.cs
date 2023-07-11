using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductoServices.Queries.GetProductosByMaterialQuery
{
  public class GetProductosByMaterialQueryValidator : AbstractValidator<GetProductosByMaterialQuery>
  {
    private readonly mueblesmayoContext _context;

    public GetProductosByMaterialQueryValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(p => p.material)
          .NotEmpty().WithMessage("El material no puede estar vacío")
          .NotNull().WithMessage("El material no puede ser nulo")
          .MustAsync(MaterialExiste).WithMessage("No hay muebles con el material: {PropertyValue}");
    }

    private async Task<bool> MaterialExiste(string material, CancellationToken token)
    {
      bool existe = await _context.Productos.AnyAsync(p => p.IdMaterialNavigation.Nombre == material);
      return existe;
    }

  }
}
