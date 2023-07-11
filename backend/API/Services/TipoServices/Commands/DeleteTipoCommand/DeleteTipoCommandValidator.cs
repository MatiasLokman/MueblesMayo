using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.TipoServices.Commands.DeleteTipoCommand
{
  public class DeleteTipoCommandValidator : AbstractValidator<DeleteTipoCommand>
  {
    private readonly mueblesmayoContext _context;

    public DeleteTipoCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(t => t.IdTipo)
          .NotEmpty().WithMessage("El id no puede estar vacío")
          .NotNull().WithMessage("El id no puede ser nulo")
          .MustAsync(TipoExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de un tipo de mueble existente");
    }

    private async Task<bool> TipoExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Tipos.AnyAsync(t => t.IdTipo == id);
      return existe;
    }

  }
}
