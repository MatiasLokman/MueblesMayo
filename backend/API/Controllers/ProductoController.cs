using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using API.Services.ProductoServices.Queries.GetProductosManageQuery;
using API.Dtos.ProductoDtos;
using API.Services.ProductoServices.Queries.GetProductoByIdQuery;
using API.Services.ProductoServices.Queries.GetProductosByTypeQuery;
using API.Services.ProductoServices.Queries.GetProductosByCategoryQuery;
using API.Services.ProductoServices.Queries.GetProductosByMaterialQuery;
using API.Services.ProductoServices.Queries.GetProductosOnSaleQuery;
using API.Services.ProductoServices.Queries.GetProductosQuery;
using API.Services.ProductoServices.Commands.CreateProductoCommand;
using API.Services.ProductoServices.Commands.UpdateProductoCommand;
using API.Services.ProductoServices.Commands.DeleteProductoCommand;

namespace API.Controllers;

[ApiController]
[Route("producto")]
public class ProductoController : ControllerBase
{
  private readonly IMediator _mediator;

  public ProductoController(IMediator mediator)
  {
    _mediator = mediator;
  }


  [HttpGet] // Obtener productos con un formato especifico para la administracion de los mismos (con y sin stock)
  [Route("manage")]
  [Authorize]
  public Task<ListaProductosManageDto> GetProductosManage()
  {
    var productosManage = _mediator.Send(new GetProductosManageQuery());
    return productosManage;
  }


  [HttpGet("{id}")] // Obtener producto por id
  public Task<ProductoDto> GetProducto(int id)
  {
    var producto = _mediator.Send(new GetProductoByIdQuery(id));
    return producto;
  }


  [HttpGet("tipo/{type}")] // Obtener productos de un tipo especifico y en stock (stock mayor a 0)
  public Task<ListaProductosDto> GetProductosByType(string type)
  {
    var productosByType = _mediator.Send(new GetProductosByTypeQuery(type));
    return productosByType;
  }


  [HttpGet("categoria/{category}")] // Obtener productos de una categoría especifica y en stock (stock mayor a 0)
  public Task<ListaProductosDto> GetProductosByCategory(string category)
  {
    var productosByCategory = _mediator.Send(new GetProductosByCategoryQuery(category));
    return productosByCategory;
  }


  [HttpGet("material/{material}")] // Obtener productos de un material especifico y en stock (stock mayor a 0)
  public Task<ListaProductosDto> GetProductosByMaterial(string material)
  {
    var productosByMaterial = _mediator.Send(new GetProductosByMaterialQuery(material));
    return productosByMaterial;
  }


  [HttpGet("sale")] // Obtener productos en descuento y en stock (stock mayor a 0)
  public Task<ListaProductosDto> GetProductosOnSale()
  {
    var productosOnSale = _mediator.Send(new GetProductosOnSaleQuery());
    return productosOnSale;
  }


  [HttpGet] // Obtener productos en stock (stock mayor a 0)
  public Task<ListaProductosDto> GetProductos()
  {
    var productos = _mediator.Send(new GetProductosQuery());
    return productos;
  }


  [HttpPost]
  [Authorize]
  public async Task<ProductoDto> CreateProducto(CreateProductoCommand command)
  {
    var productoCreado = await _mediator.Send(command);
    return productoCreado;
  }


  [HttpPut("{id}")]
  [Authorize]
  public async Task<ProductoDto> UpdateProducto(int id, UpdateProductoCommand command)
  {
    command.IdProducto = id;
    var productoActualizado = await _mediator.Send(command);
    return productoActualizado;
  }


  [HttpDelete("{id}")]
  [Authorize]
  public async Task<ProductoDto> DeleteProducto(int id)
  {
    var productoEliminado = await _mediator.Send(new DeleteProductoCommand { IdProducto = id });
    return productoEliminado;
  }

}
