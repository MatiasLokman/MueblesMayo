using API.Data;
using API.Dtos.MaterialDtos;
using API.Models;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace API.Services.MaterialServices.Commands.CreateMaterialCommand
{
  public class CreateMaterialCommandHandler : IRequestHandler<CreateMaterialCommand, MaterialDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateMaterialCommand> _validator;

    public CreateMaterialCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<CreateMaterialCommand> validator)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
    }

    public async Task<MaterialDto> Handle(CreateMaterialCommand request, CancellationToken cancellationToken)
    {
      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var MaterialVacio = new MaterialDto();

          MaterialVacio.StatusCode = StatusCodes.Status400BadRequest;
          MaterialVacio.ErrorMessage = validationResult.ToString();
          MaterialVacio.IsSuccess = false;

          return MaterialVacio;
        }
        else
        {
          var materialToCreate = _mapper.Map<Material>(request);
          await _context.AddAsync(materialToCreate);
          await _context.SaveChangesAsync();

          var materialDto = _mapper.Map<MaterialDto>(materialToCreate);

          materialDto.StatusCode = StatusCodes.Status200OK;
          materialDto.IsSuccess = true;
          materialDto.ErrorMessage = string.Empty;

          return materialDto;
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
