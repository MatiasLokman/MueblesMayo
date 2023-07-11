using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.MaterialServices.Commands.DeleteMaterialCommand
{
  public class DeleteMaterialCommandValidator : AbstractValidator<DeleteMaterialCommand>
  {
    private readonly mueblesmayoContext _context;

    public DeleteMaterialCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(m => m.IdMaterial)
          .NotEmpty().WithMessage("El id no puede estar vacío")
          .NotNull().WithMessage("El id no puede ser nulo")
          .MustAsync(MaterialExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un material existente");
    }

    private async Task<bool> MaterialExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Materiales.AnyAsync(m => m.IdMaterial == id);
      return existe;
    }

  }
}
