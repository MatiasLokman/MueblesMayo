using API.Data;
using API.Services.CategoriaServices.Commands.CreateCategoriaCommand;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.MaterialServices.Commands.CreateMaterialCommand
{
  public class CreateMaterialCommandValidator : AbstractValidator<CreateMaterialCommand>
  {
    private readonly mueblesmayoContext _context;

    public CreateMaterialCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(m => m.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");

      RuleFor(m => m)
          .MustAsync(MaterialExiste).WithMessage("Este material ya se encuentra registrado");
    }

    private async Task<bool> MaterialExiste(CreateMaterialCommand command, CancellationToken token)
    {
      bool existe = await _context.Materiales.AnyAsync(m => m.Nombre == command.Nombre);
      return !existe;
    }

  }
}
