using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.TipoServices.Commands.CreateTipoCommand
{
  public class CreateTipoCommandValidator : AbstractValidator<CreateTipoCommand>
  {
    private readonly mueblesmayoContext _context;

    public CreateTipoCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(t => t.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");

      RuleFor(t => t)
          .MustAsync(TipoExiste).WithMessage("Este tipo de mueble ya se encuentra registrado");
    }
    private async Task<bool> TipoExiste(CreateTipoCommand command, CancellationToken token)
    {
      bool existe = await _context.Tipos.AnyAsync(t => t.Nombre == command.Nombre);
      return !existe;
    }

  }
}
