using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.CategoriaServices.Commands.UpdateCategoriaCommand
{
  public class UpdateCategoriaCommandValidator : AbstractValidator<UpdateCategoriaCommand>
  {
    private readonly mueblesmayoContext _context;
    public UpdateCategoriaCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(c => c.IdCategoria)
         .NotEmpty().WithMessage("El id no puede estar vacío")
         .NotNull().WithMessage("El id no puede ser nulo")
         .MustAsync(CategoriaExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de una categoría existente");

      RuleFor(c => c.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");
    }

    private async Task<bool> CategoriaExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Categorias.AnyAsync(c => c.IdCategoria == id);
      return existe;
    }

  }
}
