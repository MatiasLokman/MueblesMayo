using API.Data;
using API.Dtos.TipoDtos;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.TipoServices.Commands.DeleteTipoCommand
{
  public class DeleteTipoCommandHandler : IRequestHandler<DeleteTipoCommand, TipoDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<DeleteTipoCommand> _validator;

    public DeleteTipoCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<DeleteTipoCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<TipoDto> Handle(DeleteTipoCommand request, CancellationToken cancellationToken)
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
          var TipoToDelete = await _context.Tipos.FindAsync(request.IdTipo);

          if (TipoToDelete == null)
          {
            var TipoVacio = new TipoDto();

            TipoVacio.StatusCode = StatusCodes.Status404NotFound;
            TipoVacio.ErrorMessage = "El tipo de mueble no existe";
            TipoVacio.IsSuccess = false;

            return TipoVacio;
          }
          else
          {
            _context.Tipos.Remove(TipoToDelete);
            await _context.SaveChangesAsync();

            var tipoDto = _mapper.Map<TipoDto>(TipoToDelete);

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
