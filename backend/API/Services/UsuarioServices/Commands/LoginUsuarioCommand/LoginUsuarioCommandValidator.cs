using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.UsuarioServices.Commands.LoginUsuarioCommand
{
  public class LoginUsuarioCommandValidator : AbstractValidator<LoginUsuarioCommand>
  {
    private readonly mueblesmayoContext _context;
    public LoginUsuarioCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(u => u.Username)
          .NotEmpty().WithMessage("El usuario no puede estar vacío")
          .NotNull().WithMessage("El usuario no puede ser nulo");
      RuleFor(u => u.Password)
          .NotEmpty().WithMessage("La contraseña no puede estar vacía")
          .NotNull().WithMessage("La contraseña no puede ser nulo");

      RuleFor(u => u)
          .MustAsync(ExisteUsario).WithMessage("Usuario o contraseña incorrecta");
    }

    private async Task<bool> ExisteUsario(LoginUsuarioCommand command, CancellationToken token)
    {
      bool existe = await _context.Usuarios.AnyAsync(u => u.Username == command.Username &&
      u.Password == command.Password);
      return existe;
    }
  }
}
