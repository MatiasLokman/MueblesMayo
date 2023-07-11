using AutoMapper;
using API.Models;

using API.Dtos.TipoDtos;
using API.Services.TipoServices.Commands.CreateTipoCommand;
using API.Services.TipoServices.Commands.UpdateTipoCommand;
using API.Services.TipoServices.Commands.DeleteTipoCommand;

using API.Dtos.CategoriaDtos;
using API.Services.CategoriaServices.Commands.CreateCategoriaCommand;
using API.Services.CategoriaServices.Commands.UpdateCategoriaCommand;
using API.Services.CategoriaServices.Commands.DeleteCategoriaCommand;

using API.Dtos.MaterialDtos;
using API.Services.MaterialServices.Commands.CreateMaterialCommand;
using API.Services.MaterialServices.Commands.UpdateMaterialCommand;
using API.Services.MaterialServices.Commands.DeleteMaterialCommand;

using API.Dtos.ProductoDtos;
using API.Services.ProductoServices.Commands.CreateProductoCommand;
using API.Services.ProductoServices.Commands.UpdateProductoCommand;
using API.Services.ProductoServices.Commands.DeleteProductoCommand;

namespace API.Mapper
{
  public class MapperConfig : Profile
  {
    public MapperConfig()
    {
      //// Mappers para Tipos
      CreateMap<TipoDto, Tipo>().ReverseMap();
      CreateMap<Tipo, CreateTipoCommand>().ReverseMap();
      CreateMap<Tipo, UpdateTipoCommand>().ReverseMap();
      CreateMap<Tipo, DeleteTipoCommand>().ReverseMap();

      // Mappers para Categorías
      CreateMap<CategoriaDto, Categoria>().ReverseMap();
      CreateMap<Categoria, CreateCategoriaCommand>().ReverseMap();
      CreateMap<Categoria, UpdateCategoriaCommand>().ReverseMap();
      CreateMap<Categoria, DeleteCategoriaCommand>().ReverseMap();

      //// Mappers para Materiales
      CreateMap<MaterialDto, Material>().ReverseMap();
      CreateMap<Material, CreateMaterialCommand>().ReverseMap();
      CreateMap<Material, UpdateMaterialCommand>().ReverseMap();
      CreateMap<Material, DeleteMaterialCommand>().ReverseMap();

      //// Mappers para Productos
      CreateMap<Producto, ProductoDto>()
          .ForMember(dest => dest.NombreMaterial, opt => opt.MapFrom(src => src.IdMaterialNavigation.Nombre))
          .ForMember(dest => dest.NombreTipo, opt => opt.MapFrom(src => src.IdTipoNavigation.Nombre))
          .ForMember(dest => dest.NombreCategoria, opt => opt.MapFrom(src => src.IdCategoriaNavigation.Nombre));
      CreateMap<Producto, CreateProductoCommand>().ReverseMap();
      CreateMap<Producto, UpdateProductoCommand>().ReverseMap();
      CreateMap<Producto, DeleteProductoCommand>().ReverseMap();
    }
  }
}
