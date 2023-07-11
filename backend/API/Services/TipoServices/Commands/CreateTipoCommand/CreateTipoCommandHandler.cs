using API.Data;
using API.Dtos.TipoDtos;
using API.Models;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.TipoServices.Commands.CreateTipoCommand
{
  public class CreateTipoCommandHandler : IRequestHandler<CreateTipoCommand, TipoDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateTipoCommand> _validator;

    public CreateTipoCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<CreateTipoCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<TipoDto> Handle(CreateTipoCommand request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var TipoVacio = new TipoDto();

          TipoVacio.StatusCode = StatusCodes.Status400BadRequest;
          TipoVacio.ErrorMessage = validationResult.ToString();
          TipoVacio.IsSuccess = false;

          return TipoVacio;
        }
        else
        {
          var tipoToCreate = _mapper.Map<Tipo>(request);
          await _context.AddAsync(tipoToCreate);
          await _context.SaveChangesAsync();

          var tipoDto = _mapper.Map<TipoDto>(tipoToCreate);

          tipoDto.StatusCode = StatusCodes.Status200OK;
          tipoDto.IsSuccess = true;
          tipoDto.ErrorMessage = string.Empty;

          return tipoDto;
        }
      }
      catch (Exception ex)
      {
        var TipoVacio = new TipoDto();

        TipoVacio.StatusCode = StatusCodes.Status400BadRequest;
        TipoVacio.ErrorMessage = ex.Message;
        TipoVacio.IsSuccess = false;

        return TipoVacio;
      }
    }

  }
}
