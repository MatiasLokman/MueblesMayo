using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.CategoriaServices.Commands.CreateCategoriaCommand
{
  public class CreateCategoriaCommandValidator : AbstractValidator<CreateCategoriaCommand>
  {
    private readonly mueblesmayoContext _context;

    public CreateCategoriaCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(c => c.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");

      RuleFor(c => c)
          .MustAsync(CategoriaExiste).WithMessage("Esta categoría ya se encuentra registrada");
    }

    private async Task<bool> CategoriaExiste(CreateCategoriaCommand command, CancellationToken token)
    {
      bool existe = await _context.Categorias.AnyAsync(c => c.Nombre == command.Nombre);

      return !existe;
    }

  }
}
