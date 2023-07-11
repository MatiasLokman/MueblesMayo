using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.TipoServices.Commands.UpdateTipoCommand
{
  public class UpdateTipoCommandValidator : AbstractValidator<UpdateTipoCommand>
  {
    private readonly mueblesmayoContext _context;

    public UpdateTipoCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(t => t.IdTipo)
         .NotEmpty().WithMessage("El id no puede estar vacío")
         .NotNull().WithMessage("El id no puede ser nulo")
         .MustAsync(TipoExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un tipo de mueble existente");

      RuleFor(t => t.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");
    }

    private async Task<bool> TipoExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Tipos.AnyAsync(t => t.IdTipo == id);
      return existe;
    }

  }
}
