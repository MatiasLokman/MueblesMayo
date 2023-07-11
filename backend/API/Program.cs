using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Reflection;
using FluentValidation;

using API.Services.TipoServices.Commands.CreateTipoCommand;
using API.Services.TipoServices.Commands.UpdateTipoCommand;
using API.Services.TipoServices.Commands.DeleteTipoCommand;

using API.Services.CategoriaServices.Commands.CreateCategoriaCommand;
using API.Services.CategoriaServices.Commands.UpdateCategoriaCommand;
using API.Services.CategoriaServices.Commands.DeleteCategoriaCommand;

using API.Services.MaterialServices.Commands.CreateMaterialCommand;
using API.Services.MaterialServices.Commands.UpdateMaterialCommand;
using API.Services.MaterialServices.Commands.DeleteMaterialCommand;

using API.Services.ProductoServices.Queries.GetProductoByIdQuery;
using API.Services.ProductoServices.Queries.GetProductosByTypeQuery;
using API.Services.ProductoServices.Queries.GetProductosByCategoryQuery;
using API.Services.ProductoServices.Queries.GetProductosByMaterialQuery;
using API.Services.ProductoServices.Commands.CreateProductoCommand;
using API.Services.ProductoServices.Commands.UpdateProductoCommand;
using API.Services.ProductoServices.Commands.DeleteProductoCommand;

using API.Services.UsuarioServices.Commands.LoginUsuarioCommand;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();

builder.Services.AddDbContext<mueblesmayoContext>(options =>
 options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var _authkey = builder.Configuration.GetValue<string>("JwtSettings:securitykey");
builder.Services.AddAuthentication(item =>
{
  item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(item =>
{
  item.RequireHttpsMetadata = true;
  item.SaveToken = true;
  item.TokenValidationParameters = new TokenValidationParameters()
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authkey)),
    ValidateIssuer = false,
    ValidateAudience = false,
    ClockSkew = TimeSpan.Zero
  };
});

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddMediatR(opt =>
{
  opt.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
});

// Validaciones para CRUD (Tipos)
builder.Services.AddScoped<IValidator<CreateTipoCommand>, CreateTipoCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateTipoCommand>, UpdateTipoCommandValidator>();
builder.Services.AddScoped<IValidator<DeleteTipoCommand>, DeleteTipoCommandValidator>();

// Validaciones para CRUD (Categor�as)
builder.Services.AddScoped<IValidator<CreateCategoriaCommand>, CreateCategoriaCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateCategoriaCommand>, UpdateCategoriaCommandValidator>();
builder.Services.AddScoped<IValidator<DeleteCategoriaCommand>, DeleteCategoriaCommandValidator>();

// Validaciones para CRUD (Materiales)
builder.Services.AddScoped<IValidator<CreateMaterialCommand>, CreateMaterialCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateMaterialCommand>, UpdateMaterialCommandValidator>();
builder.Services.AddScoped<IValidator<DeleteMaterialCommand>, DeleteMaterialCommandValidator>();

// Validaciones para CRUD (Productos)
builder.Services.AddScoped<IValidator<CreateProductoCommand>, CreateProductoCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateProductoCommand>, UpdateProductoCommandValidator>();
builder.Services.AddScoped<IValidator<DeleteProductoCommand>, DeleteProductoCommandValidator>();
builder.Services.AddScoped<IValidator<GetProductoByIdQuery>, GetProductoByIdQueryValidator>();
builder.Services.AddScoped<IValidator<GetProductosByTypeQuery>, GetProductosByTypeQueryValidator>();
builder.Services.AddScoped<IValidator<GetProductosByCategoryQuery>, GetProductosByCategoryQueryValidator>();
builder.Services.AddScoped<IValidator<GetProductosByMaterialQuery>, GetProductosByMaterialQueryValidator>();

// Validacion para Login (Usuarios)
builder.Services.AddScoped<IValidator<LoginUsuarioCommand>, LoginUsuarioCommandValidator>();

builder.Services.AddControllers();

var _jwtsettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSetings>(_jwtsettings);

var app = builder.Build();

app.UseCors(c =>
{
  c.AllowAnyHeader();
  c.AllowAnyMethod();
  c.WithOrigins("https://www.mueblesmayo.com.ar");
});

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
