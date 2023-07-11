using API.Data;
using API.Dtos.CategoriaDtos;
using API.Models;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.CategoriaServices.Commands.CreateCategoriaCommand
{
  public class CreateCategoriaCommandHandler : IRequestHandler<CreateCategoriaCommand, CategoriaDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateCategoriaCommand> _validator;

    public CreateCategoriaCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<CreateCategoriaCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<CategoriaDto> Handle(CreateCategoriaCommand request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var CategoriaVacia = new CategoriaDto();

          CategoriaVacia.StatusCode = StatusCodes.Status400BadRequest;
          CategoriaVacia.ErrorMessage = validationResult.ToString();
          CategoriaVacia.IsSuccess = false;

          return CategoriaVacia;
        }
        else
        {
          var categoriaToCreate = _mapper.Map<Categoria>(request);
          await _context.AddAsync(categoriaToCreate);
          await _context.SaveChangesAsync();

          var categoriaDto = _mapper.Map<CategoriaDto>(categoriaToCreate);

          categoriaDto.StatusCode = StatusCodes.Status200OK;
          categoriaDto.IsSuccess = true;
          categoriaDto.ErrorMessage = string.Empty;

          return categoriaDto;
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
