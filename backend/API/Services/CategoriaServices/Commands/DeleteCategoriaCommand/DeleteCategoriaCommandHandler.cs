using API.Data;
using API.Dtos.CategoriaDtos;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.CategoriaServices.Commands.DeleteCategoriaCommand
{
  public class DeleteCategoriaCommandHandler : IRequestHandler<DeleteCategoriaCommand, CategoriaDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<DeleteCategoriaCommand> _validator;

    public DeleteCategoriaCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<DeleteCategoriaCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<CategoriaDto> Handle(DeleteCategoriaCommand request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var CategoriaVacia = new CategoriaDto();

          CategoriaVacia.StatusCode = StatusCodes.Status400BadRequest;
          CategoriaVacia.ErrorMessage = string.Join(". ", validationResult.Errors.Select(e => e.ErrorMessage));
          CategoriaVacia.IsSuccess = false;

          return CategoriaVacia;
        }
        else
        {
          var CategoriaToDelete = await _context.Categorias.FindAsync(request.IdCategoria);

          if (CategoriaToDelete == null)
          {
            var CategoriaVacia = new CategoriaDto();

            CategoriaVacia.StatusCode = StatusCodes.Status404NotFound;
            CategoriaVacia.ErrorMessage = "La categoría no existe";
            CategoriaVacia.IsSuccess = false;

            return CategoriaVacia;
          }
          else
          {
            _context.Categorias.Remove(CategoriaToDelete);
            await _context.SaveChangesAsync();

            var categoriaDto = _mapper.Map<CategoriaDto>(CategoriaToDelete);

            categoriaDto.StatusCode = StatusCodes.Status200OK;
            categoriaDto.IsSuccess = true;
            categoriaDto.ErrorMessage = "";

            return categoriaDto;
          }
        }
      }
      catch (Exception ex)
      {
        var CategoriaVacia = new CategoriaDto();

        CategoriaVacia.StatusCode = StatusCodes.Status400BadRequest;
        CategoriaVacia.ErrorMessage = ex.Message;
        CategoriaVacia.IsSuccess = false;

        return CategoriaVacia;
      }
    }

  }
}
