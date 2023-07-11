using API.Data;
using API.Dtos.UsuarioDto;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services.UsuarioServices.Commands.LoginUsuarioCommand
{
  public class LoginUsuarioCommandHandler : IRequestHandler<LoginUsuarioCommand, UsuarioDto>
  {
    private readonly mueblesmayoContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<LoginUsuarioCommand> _validator;
    private readonly JwtSetings jwtSettings;

    public LoginUsuarioCommandHandler(mueblesmayoContext context, IMapper mapper, IValidator<LoginUsuarioCommand> validator, IOptions<JwtSetings> options)
    {
      _context = context;
      _mapper = mapper;
      _validator = validator;
      this.jwtSettings = options.Value;
    }

    public async Task<UsuarioDto> Handle(LoginUsuarioCommand request, CancellationToken cancellationToken)
    {

      try
      {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
          var UsuarioVacio = new UsuarioDto();

          UsuarioVacio.StatusCode = StatusCodes.Status400BadRequest;
          UsuarioVacio.ErrorMessage = string.Join(". ", validationResult.Errors.Select(e => e.ErrorMessage));
          UsuarioVacio.IsSuccess = false;

          return UsuarioVacio;
        }
        else
        {
          var usuario = await _context.Usuarios.FirstOrDefaultAsync(x => x.Username == request.Username && x.Password == request.Password);

          if (usuario == null)
          {
            var UsuarioVacio = new UsuarioDto();

            UsuarioVacio.StatusCode = StatusCodes.Status404NotFound;
            UsuarioVacio.ErrorMessage = "Usuario o contraseña incorecta";
            UsuarioVacio.IsSuccess = false;

            return UsuarioVacio;
          }
          else
          {
            var tokenhandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF8.GetBytes(this.jwtSettings.securitykey);
            var tokendesc = new SecurityTokenDescriptor
            {
              Subject = new ClaimsIdentity(
              new Claim[] { new Claim(ClaimTypes.Name, usuario.Username), new Claim(ClaimTypes.Name, usuario.Nombre) }
              ),

              Expires = DateTime.UtcNow.AddHours(3),
              SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenhandler.CreateToken(tokendesc);
            string finaltoken = tokenhandler.WriteToken(token);

            var usuarioDto = new UsuarioDto();

            usuarioDto.Token = finaltoken;
            usuarioDto.StatusCode = StatusCodes.Status200OK;
            usuarioDto.IsSuccess = true;
            usuarioDto.ErrorMessage = string.Empty;

            return usuarioDto;
          }
        }
      }
      catch (Exception ex)
      {
        var UsuarioVacio = new UsuarioDto();

        UsuarioVacio.StatusCode = StatusCodes.Status400BadRequest;
        UsuarioVacio.ErrorMessage = ex.Message;
        UsuarioVacio.IsSuccess = false;

        return UsuarioVacio;
      }
    }

  }
}
