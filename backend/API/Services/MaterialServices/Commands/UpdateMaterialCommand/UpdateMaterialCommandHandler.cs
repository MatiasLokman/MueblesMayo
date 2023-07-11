using API.Data;
using API.Dtos.MaterialDtos;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.MaterialServices.Commands.UpdateMaterialCommand
{
  public class UpdateMaterialCommandHandler : IRequestHandler<UpdateMaterialCommand, MaterialDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateMaterialCommand> _validator;

    public UpdateMaterialCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<UpdateMaterialCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<MaterialDto> Handle(UpdateMaterialCommand request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var MaterialVacio = new MaterialDto();

          MaterialVacio.StatusCode = StatusCodes.Status400BadRequest;
          MaterialVacio.ErrorMessage = string.Join(". ", validationResult.Errors.Select(e => e.ErrorMessage));
          MaterialVacio.IsSuccess = false;

          return MaterialVacio;
        }
        else
        {
          var MaterialToUpdate = await _context.Materiales.FindAsync(request.IdMaterial);

          if (MaterialToUpdate == null)
          {
            var MaterialVacio = new MaterialDto();

            MaterialVacio.StatusCode = StatusCodes.Status404NotFound;
            MaterialVacio.ErrorMessage = "El material no existe";
            MaterialVacio.IsSuccess = false;

            return MaterialVacio;
          }
          else
          {
            MaterialToUpdate.Nombre = request.Nombre;

            await _context.SaveChangesAsync();

            var materialDto = _mapper.Map<MaterialDto>(MaterialToUpdate);

            materialDto.StatusCode = StatusCodes.Status200OK;
            materialDto.IsSuccess = true;
            materialDto.ErrorMessage = "";

            return materialDto;
          }
        }
      }
      catch (Exception ex)
      {
        var MaterialVacio = new MaterialDto();

        MaterialVacio.StatusCode = StatusCodes.Status400BadRequest;
        MaterialVacio.ErrorMessage = ex.Message;
        MaterialVacio.IsSuccess = false;

        return MaterialVacio;
      }
    }

  }
}
