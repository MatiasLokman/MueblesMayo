using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.CategoriaServices.Commands.DeleteCategoriaCommand
{
  public class DeleteCategoriaCommandValidator : AbstractValidator<DeleteCategoriaCommand>
  {
    private readonly mueblesmayoContext _context;

    public DeleteCategoriaCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(c => c.IdCategoria)
          .NotEmpty().WithMessage("El id no puede estar vacío")
          .NotNull().WithMessage("El id no puede ser nulo")
          .MustAsync(CategoriaExiste).WithMessage("El id: {PropertyValue} no existe, ingrese un id de una categoría existente");
    }

    private async Task<bool> CategoriaExiste(int id, CancellationToken token)
    {
      bool existe = await _context.Categorias.AnyAsync(c => c.IdCategoria == id);
      return existe;
    }

  }
}
