using API.Data;
using API.Dtos.TipoDtos;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.TipoServices.Commands.UpdateTipoCommand
{
  public class UpdateTipoCommandHandler : IRequestHandler<UpdateTipoCommand, TipoDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateTipoCommand> _validator;

    public UpdateTipoCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<UpdateTipoCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<TipoDto> Handle(UpdateTipoCommand request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var TipoVacio = new TipoDto();

          TipoVacio.StatusCode = StatusCodes.Status400BadRequest;
          TipoVacio.ErrorMessage = string.Join(". ", validationResult.Errors.Select(e => e.ErrorMessage));
          TipoVacio.IsSuccess = false;

          return TipoVacio;
        }
        else
        {
          var TipoToUpdate = await _context.Tipos.FindAsync(request.IdTipo);

          if (TipoToUpdate == null)
          {
            var TipoVacio = new TipoDto();

            TipoVacio.StatusCode = StatusCodes.Status404NotFound;
            TipoVacio.ErrorMessage = "El tipo de mueble no existe";
            TipoVacio.IsSuccess = false;

            return TipoVacio;
          }
          else
          {
            TipoToUpdate.Nombre = request.Nombre;

            await _context.SaveChangesAsync();

            var tipoDto = _mapper.Map<TipoDto>(TipoToUpdate);

            tipoDto.StatusCode = StatusCodes.Status200OK;
            tipoDto.IsSuccess = true;
            tipoDto.ErrorMessage = "";

            return tipoDto;
          }
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
