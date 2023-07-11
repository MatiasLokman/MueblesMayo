using API.Data;
using AutoMapper.Execution;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Services.ProductoServices.Commands.CreateProductoCommand
{
  public class CreateProductoCommandValidator : AbstractValidator<CreateProductoCommand>
  {
    private readonly mueblesmayoContext _context;

    public CreateProductoCommandValidator(mueblesmayoContext context)
    {
      _context = context;

      RuleFor(p => p.Nombre)
          .NotEmpty().WithMessage("El nombre no puede estar vacío")
          .NotNull().WithMessage("El nombre no puede ser nulo");

      RuleFor(p => p.Frente)
          .NotNull().WithMessage("El frente no puede ser nulo");

      RuleFor(p => p.Profundidad)
          .NotNull().WithMessage("La profundidad no puede ser nula");

      RuleFor(p => p.Alto)
          .NotNull().WithMessage("El alto no puede ser nulo");

      RuleFor(p => p.EnDescuento)
          .NotNull().WithMessage("EnDescuento no puede ser nulo");

      RuleFor(p => p.Stock)
          .NotNull().WithMessage("El stock no puede ser nulo");

      RuleFor(p => p.IdTipo)
          .NotEmpty().WithMessage("El id del tipo de mueble no puede estar vacío")
          .NotNull().WithMessage("El id del tipo de mueble no puede ser nulo");

      RuleFor(p => p.IdCategoria)
          .NotEmpty().WithMessage("El id de la categoría no puede estar vacío")
          .NotNull().WithMessage("El id de la categoría no puede ser nulo");

      RuleFor(p => p.IdMaterial)
          .NotEmpty().WithMessage("El id del material no puede estar vacío")
          .NotNull().WithMessage("El id del material no puede ser nulo");

      RuleFor(p => p.IdImagen)
          .NotEmpty().WithMessage("El id de la imagen no puede estar vacío")
          .NotNull().WithMessage("El id de la imagen no puede ser nulo");

      RuleFor(p => p.UrlImagen)
          .NotEmpty().WithMessage("La url de la imagen no puede estar vacía")
          .NotNull().WithMessage("La url de la imagen no puede ser nula");

      RuleFor(p => p)
          .MustAsync(ProductoExiste).WithMessage("Este producto ya se encuentra registrado");
    }

    private async Task<bool> ProductoExiste(CreateProductoCommand command, CancellationToken token)
    {
      bool existe = await _context.Productos.AnyAsync(p => p.Nombre == command.Nombre);
      return !existe;
    }

  }
}
