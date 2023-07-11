import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import "../ProductsModel/ProductsModel.css";

//#region SVG'S Imports
import { ReactComponent as NoProductSvg } from "../../../assets/svgs/noproducts.svg";
import { ReactComponent as Close } from "../../../assets/svgs/close.svg";
import { ReactComponent as Filter } from "../../../assets/svgs/filter.svg";
import { ReactComponent as Lupa } from "../../../assets/svgs/lupa.svg";
//#endregion

import Loader from '../../../components/Loaders/LoaderCircle';

import { GetProducts, GetProductsByType, GetProductsByCategory, GetProductsByMaterial, GetProductsOnSale, GetCategories, GetMaterials, GetTypes } from '../../../functions/functions';


function ProductsModel(listType) {

  //#region Constantes
  const params = useParams()

  const [productsList, setProductsList] = useState([]);
  const [originalProductsList, setOriginalProductsList] = useState(productsList);

  const [typesList, setTypesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);

  const [title, setTitle] = useState(["Muebles"])

  const [typeSign, setTypeSign] = useState("+")
  const [categorySign, setCategorySign] = useState("+")
  const [materialSign, setMaterialSign] = useState("+")

  const [filterName, setFilterName] = useState("")

  const [query, setQuery] = useState("");

  const [onDiscount, setOnDiscount] = useState(false);

  // bandera para saber si la peticion a la API termino o no
  const [isLoading, setIsLoading] = useState(true);

  // bandera para saber si el 'collapse' de bootstrap se esta mostrando o esta escondido
  const [isCollapsed, setIsCollapsed] = useState(false);
  //#endregion

  //#region Constantes de la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const productsTable = productsList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(productsList.length / productsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const [maxPageNumbersToShow] = useState(1);
  const minPageNumbersToShow = 0;
  //#endregion

  //#region Funciones para la paginacion 
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }
  //#endregion

  //#region Funcion para setear el titulo principal segun la lista de productos que se pase al constructor
  const SetTitleFunction = useCallback(() => {

    // Si el tipo de lista es 'category'
    if (listType === "category") {
      if (params.category === "Infantil") {
        setTitle("Muebles Infantiles");
      } else {
        setTitle(`Muebles de ${params.category}`);
      }
    }

    // Si el tipo de lista es 'material'
    if (listType === "material") {
      setTitle(`Muebles de ${params.material}`);
    }

    // Si el tipo de lista es 'type'
    if (listType === "type") {
      setTitle(`${params.type}`);
    }

    // Si el tipo de lista es 'onsale'
    if (listType === "onsale") {
      setTitle("Muebles en descuento");
    }
  }, [listType, params.category, params.material, params.type, setTitle]);
  //#endregion

  //#region Funciones para mostrar '+' o '-' cuando se toca en el 'collapse' de cada filtro
  const handleTypeClick = () => {
    setTypeSign(typeSign === "+" ? "-" : "+");
  };

  const handleCategoryClick = () => {
    setCategorySign(categorySign === "+" ? "-" : "+");
  };

  const handleMaterialClick = () => {
    setMaterialSign(materialSign === "+" ? "-" : "+");
  };
  //#endregion

  //#region Funcion para borrar negrita al filtro (item) seleccionado anteriormente (aplica a los filtros de: tipo, categoria y material)
  const ClearBold = () => {
    const items = document.getElementsByClassName('items-collapse'); // identificamos el boton con el nombre de la categoria
    for (let i = 0; i < items.length; i++) { //recorremos los botones con las opciones de categorías
      if (items[i].classList.contains('active')) { // reconoce la categoria clickeada
        items[i].classList.remove('active'); // le remueve la clase 'active' a la categoria que se clickeo anterioremnte para filtrar y asi luego de limpiar el filtro ya no tiene mas la clase 'active'
        break;
      }
    }

    if (onDiscount === true) {
      setOnDiscount(false)
    }
  }
  //#endregion

  //#region Funcion para borrar cualquier filtro
  const ClearFilter = () => {
    setProductsList(originalProductsList); // trae la lista de muebles original, sin ningun filtro
    setQuery("");

    setTitle("Muebles")

    if (listType === "type") {
      setTitle(`${params.type}`)
    }

    else if (listType === "category") {
      if (params.category === "Infantil") {
        setTitle(`Muebles Infantiles`)
      } else {
        setTitle(`Muebles de ${params.category}`)
      }
    }

    else if (listType === "material") {
      setTitle(`Muebles de ${params.material}`)
    }

    else if (listType === "onsale") {
      setTitle("Muebles en descuento")
    }

    document.getElementById("clear-filter").style.display = "none"; // esconde del DOM el boton de limpiar filtros
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };
  //#endregion

  //#region Funcion constructora para construir los distintos filtros disponibles (tipo, categoria, material, descuento)
  const filterResults = (filterType, filterValue, titlePrefix) => {
    setProductsList(originalProductsList);
    const result = originalProductsList.filter((product) => {
      return product[filterType] === filterValue;
    });

    // titulo si la lista de productos es la normal
    let title = `${titlePrefix}${filterValue}`;
    if (filterType === "nombreCategoria" && filterValue === "Infantil") {
      title = "Muebles Infantiles";
    } else if (filterType === "enDescuento" && filterValue === true) {
      title = "Muebles en Descuento";
    }

    // titulos si la lista de productos seleccionada es con un tipo de producto
    if (listType === "type") {
      // posibles filtros
      const material = filterType === "nombreMaterial" ? filterValue : null;
      const category = filterType === "nombreCategoria" ? filterValue : null;
      const onDiscount = filterType === "enDescuento" ? filterValue : null;
      // titulos si a su vez se la filtra por un material, descuento o categoria
      if (material) {
        title = `${params.type} de ${material}`;
      } else if (onDiscount) {
        title = `${params.type} en descuento`;
      } else if (category === "Infantil") {
        title = `${params.type} Infantiles`;
      } else {
        title = `${params.type} de ${category}`;
      }
    }

    // titulos si la lista de productos seleccionada es con una categoria de producto
    else if (listType === "category") {
      // posibles filtros
      const type = filterType === "nombreTipo" ? filterValue : null;
      const material = filterType === "nombreMaterial" ? filterValue : null;
      const onDiscount = filterType === "enDescuento" ? filterValue : null;
      // titulos si a su vez se la filtra por un tipo, material o descuento
      if (type) {
        if (params.category === "Infantil") {
          title = `${type} Infantiles`;
        } else {
          title = `${type} de ${params.category}`;
        }
      } else if (material) {
        if (params.category === "Infantil") {
          title = `Muebles Infantiles de ${material}`;
        } else {
          title = `Muebles de ${params.category} de ${material}`;
        }
      } else if (onDiscount) {
        if (params.category === "Infantil") {
          title = `Muebles Infantiles en descuento`;
        } else {
          title = `Muebles de ${params.category} en descuento`;
        }
      }
    }

    // titulos si la lista de productos seleccionada es con un material de producto
    else if (listType === "material") {
      // posibles filtros
      const type = filterType === "nombreTipo" ? filterValue : null;
      const category = filterType === "nombreCategoria" ? filterValue : null;
      const onDiscount = filterType === "enDescuento" ? filterValue : null;
      // titulos si a su vez se la filtra por un tipo, descuento o categoria
      if (type) {
        title = `${type} de ${params.material}`;
      } else if (onDiscount) {
        title = `Muebles de ${params.material} en descuento`;
      } else if (category === "Infantil") {
        title = `Muebles de ${params.material} Infantiles`;
      } else {
        title = `Muebles de ${params.material} de ${category}`;
      }
    }

    // titulos si la lista de productos seleccionada es con descuento del producto
    else if (listType === "onsale") {
      // posibles filtros
      const type = filterType === "nombreTipo" ? filterValue : null;
      const category = filterType === "nombreCategoria" ? filterValue : null;
      const material = filterType === "nombreMaterial" ? filterValue : null;
      // titulos si a su vez se la filtra por un tipo, material o categoria
      if (type) {
        title = `${type} en descuento`;
      } else if (material) {
        title = `Muebles de ${material} en descuento`;
      } else if (category === "Infantil") {
        title = `Muebles Infantiles en descuento`;
      } else {
        title = `Muebles de ${category} en descuento`;
      }
    }

    setTitle(title);
    setProductsList(result);
    setQuery("");
    document.getElementById("clear-filter").style.display = "flex";
    if (filterType === "enDescuento" && filterValue === true) {
      setFilterName("En descuento");
    } else {
      setFilterName(filterValue);
    }
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };
  //#endregion

  //#region Funciones de los filtros creadas en base al constructor anterior
  const filterResultType = (type) => {
    filterResults("nombreTipo", type, "");
  };

  const filterResultCategory = (category) => {
    const titlePrefix = category === "Infantil" ? "Muebles " : "Muebles de ";
    filterResults("nombreCategoria", category, titlePrefix);
  };

  const filterResultMaterial = (material) => {
    filterResults("nombreMaterial", material, "Muebles de ");
  };

  const filterResultOnDiscount = (onDiscount) => {
    if (onDiscount === false) {
      filterResults("enDescuento", true, "Muebles en ");
    } else {
      ClearFilter();
    }
  };
  //#endregion

  //#region Funcion para filtrar mueble mediante una consulta personalizada
  const search = () => {
    setProductsList(originalProductsList);
    const result = originalProductsList.filter((product) =>
      product.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setProductsList(result);
    document.getElementById("clear-filter").style.display = "flex";
    setTitle(`Muebles con: "${query.charAt(0).toUpperCase() + query.slice(1)}"`);
    setFilterName(query.charAt(0).toUpperCase() + query.slice(1));
    window.scrollTo(0, 0);
    if (query === "") {
      document.getElementById("clear-filter").style.display = "none";
      setTitle("Muebles")
      window.scrollTo(0, 0);
    }

    if (listType === "type") {
      setTitle(`${params.type} con: "${query.charAt(0).toUpperCase() + query.slice(1)}"`);
      if (query === "") {
        document.getElementById("clear-filter").style.display = "none";
        setTitle(`${params.type}`)
      }
    }

    if (listType === "category") {
      if (params.category === "Infantil") {
        setTitle(`Muebles Infantiles con: "${query.charAt(0).toUpperCase() + query.slice(1)}"`);
      } else {
        setTitle(`Muebles de ${params.category} con: "${query.charAt(0).toUpperCase() + query.slice(1)}"`);
      }
      if (query === "") {
        document.getElementById("clear-filter").style.display = "none";
        if (params.category === "Infantil") {
          setTitle("Muebles Infantiles");
        } else {
          setTitle(`Muebles de ${params.category}`);
        }
      }
    }

    if (listType === "material") {
      setTitle(`Muebles de ${params.material} con: "${query.charAt(0).toUpperCase() + query.slice(1)}"`);
      if (query === "") {
        document.getElementById("clear-filter").style.display = "none";
        setTitle(`Muebles de ${params.material}`)
      }
    }

    if (listType === "onsale") {
      setTitle(`Muebles con: "${query.charAt(0).toUpperCase() + query.slice(1)}" en descuento`);
      if (query === "") {
        document.getElementById("clear-filter").style.display = "none";
        setTitle("Muebles en descuento")
      }
    }

    ClearBold();
    setCurrentPage(1);
  };
  //#endregion

  //#region Funcion para renderizar todos los tipos de filtros existentes y ejecutar sus funciones respectivas al hacer click sobre ellos
  function renderList(list, filterFunction, setList) {
    return (
      <div className="card-collapse">
        {list.map((item, index) => {
          return (
            <p
              key={index}
              id='items-collapse'
              className={`items-collapse ${item.isActive ? 'active' : ''}`}
              onClick={() => {
                filterFunction(item.nombre);
                list[index].isActive = !item.isActive;
                setList([...list]);
              }}
            >
              {item.nombre}
            </p>
          );
        })}
      </div>
    );
  }
  //#endregion

  //#region Funcion para que cuando el ancho de la pantalla sea menor a 640px marcar una bandera (IsCollapsed) que condiciona el useEffect
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 640) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };
  //#endregion

  //#region Funcion lo que carga apenas se renderiza el componente y en cada renderizacion
  useEffect(() => {
    (async () => {
      try {
        let fetchData;

        if (listType === "normal") {
          fetchData = GetProducts;
        } else if (listType === "material") {
          fetchData = GetProductsByMaterial;
        } else if (listType === "category") {
          fetchData = GetProductsByCategory;
        } else if (listType === "type") {
          fetchData = GetProductsByType;
        } else if (listType === "onsale") {
          fetchData = GetProductsOnSale;
        }

        const fetchParams =
          listType === "material" ? params.material :
            listType === "category" ? params.category :
              listType === "type" ? params.type :
                undefined;

        let promises = [
          fetchData(setProductsList),
          fetchData(setOriginalProductsList),
          GetCategories(setCategoriesList),
          GetMaterials(setMaterialsList),
          GetTypes(setTypesList)
        ];

        if (fetchParams) {
          promises = [
            fetchData(fetchParams, setProductsList),
            fetchData(fetchParams, setOriginalProductsList),
            GetCategories(setCategoriesList),
            GetMaterials(setMaterialsList),
            GetTypes(setTypesList)
          ];
        }

        if (listType === "category" || listType === "material" || listType === "type" || listType === "onsale") {
          promises.push(SetTitleFunction());
        }

        await Promise.all(promises);

        setIsLoading(false);
        handleResize();
        window.addEventListener('resize', handleResize);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [listType, params, SetTitleFunction]);
  //#endregion


  //#region Lo que retorna el componente
  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | {title.toString()} </title>
      </Helmet>
      <section id='products' className='products-container'>
        <div className="products-content">



          {listType === "type" && (
            <div className='product-info-navbar'>
              <Link to='/muebles'>Muebles</Link>
              <p className='separator'> / </p>
              <p className='selected'>{params.type}</p>
            </div>
          )}

          {listType === "category" && (
            <div className='product-info-navbar'>
              <Link to='/muebles'>Muebles</Link>
              <p className='separator'> / </p>
              <p className='selected'>{params.category}</p>
            </div>
          )}

          {listType === "material" && (
            <div className='product-info-navbar'>
              <Link to='/muebles'>Muebles</Link>
              <p className='separator'> / </p>
              <p className='selected'>{params.material}</p>
            </div>
          )}

          {listType === "onsale" && (
            <div className='product-info-navbar'>
              <Link to='/muebles'>Muebles</Link>
              <p className='separator'> / </p>
              <p className='selected'>SALE</p>
            </div>
          )}


          <div className={`filter-products-container${listType === "type" || listType === "category" || listType === "material" || listType === "onsale" ? "-navbar" : ""}`}>
            <div className='filters-left'>
              <div className='filter-container'>

                <div className='filter-btn-title-container' id='filter-btn-title-container' data-bs-toggle="collapse" href="#collapseFilters" role="button" aria-expanded="false" aria-controls="collapseFilters">
                  <p className="filter-btn">
                    <Filter className='filter-svg' />
                  </p>
                  <p className="filter-title">
                    Filtros
                  </p>
                </div>

                <button id='clear-filter' className='clear-filter' onClick={ClearFilter}>
                  <Close className='close-svg' />
                  <p className='clear-filter-p'>{filterName}</p>
                </button>

                <div className={`collapse ${isCollapsed ? '' : 'show'}`} id="collapseFilters">
                  <div className="card-collapse">

                    <p className="filter-separator"></p>



                    {listType !== "type" && (
                      <>
                        <div className="filter-btn-container" onClick={handleTypeClick} data-bs-toggle="collapse" href="#collapseType" role="button" aria-expanded="false" aria-controls="collapseType">
                          <p className="filter-btn-name">TIPOS</p>
                          <p className="filter-btn">{typeSign}</p>
                        </div>

                        <div className="collapse" id="collapseType">
                          {renderList(typesList, filterResultType, setTypesList)}
                        </div>

                        <p className="filter-separator"></p>
                      </>
                    )}

                    {listType !== "category" && (
                      <>
                        <div className="filter-btn-container" onClick={handleCategoryClick} data-bs-toggle="collapse" href="#collapseCategory" role="button" aria-expanded="false" aria-controls="collapseCategory">
                          <p className="filter-btn-name">CATEGORÍAS</p>
                          <p className="filter-btn">{categorySign}</p>
                        </div>

                        <div className="collapse" id="collapseCategory">
                          {renderList(categoriesList, filterResultCategory, setCategoriesList)}
                        </div>

                        <p className="filter-separator"></p>
                      </>
                    )}

                    {listType !== "material" && (
                      <>
                        <div className="filter-btn-container" onClick={handleMaterialClick} data-bs-toggle="collapse" href="#collapseMaterial" role="button" aria-expanded="false" aria-controls="collapseMaterial">
                          <p className="filter-btn-name">MATERIALES</p>
                          <p className="filter-btn">{materialSign}</p>
                        </div>

                        <div className="collapse" id="collapseMaterial">
                          {renderList(materialsList, filterResultMaterial, setMaterialsList)}
                        </div>

                        <p className="filter-separator"></p>
                      </>
                    )}

                    {listType !== "onsale" && (
                      <>
                        <div className="filter-btn-container">
                          <p className="filter-btn-name">EN DESCUENTO</p>
                          <p className="filter-btn">
                            <input
                              type="checkbox"
                              className="form-check-input tick"
                              id="onDiscount"
                              checked={onDiscount}
                              onChange={() => {
                                setOnDiscount(!onDiscount);
                                filterResultOnDiscount(onDiscount);
                              }}
                            />
                            <label htmlFor="onDiscount" className="lbl-switch"></label>
                          </p>
                        </div>

                        <p className="filter-separator"></p>
                      </>
                    )}

                  </div>

                </div>

              </div>
            </div>


            <div className='products-content-list'>

              <div className='search-title'>
                <div className='search-container'>
                  <div className="form-group-input-search">
                    <span className="input-group-text"><Lupa className="input-group-svg" /></span>
                    <input
                      className="search-input"
                      type="text"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      onKeyUp={search}
                      placeholder="Buscar..."
                    />
                  </div>
                </div>


                <div className='title-lenght'>
                  <h2 className='products-title-botton'>{title}</h2>
                  {productsList.length > 1 || productsList.length === 0 ? (
                    <p className="total">Hay {productsList.length} muebles.</p>
                  ) : (
                    <p className="total">Hay {productsList.length} mueble.</p>
                  )}
                </div>
              </div>


              {productsList.length > 0 ? (
                <div className='products-list'>
                  {productsTable?.map((product, index) => {
                    return (
                      <Link to={`/mueble/${product.idProducto}`} className="card" key={index}>
                        <figure>
                          <img className="card-img-top" src={product.urlImagen} alt="Card" />
                        </figure>
                        <div className="card-body">
                          <h3 className="card-title">{product.nombre}</h3>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="pagination-count-container2">

                    <div className="pagination-count">
                      {productsList.length > 0 ? (
                        productsList.length === 1 ? (
                          <p className="total">Mueble {firstIndex + 1} de {productsList.length}</p>
                        ) : (
                          <p className="total">Muebles {firstIndex + 1} a {productsTable.length + firstIndex} de {productsList.length}</p>
                        )
                      ) : (
                        <></>
                      )}
                    </div>



                    {productsList.length > 0 ? (
                      <ul className="pagination-manager">

                        <li className="page-item">
                          <div className="page-link" onClick={prePage}>{'<'}</div>
                        </li>

                        <li className="numbers">
                          {numbers.map((n, i) => {
                            if (n === currentPage) {
                              // Render the current page number without a link
                              return (
                                <ul className='page-item-container' key={i}>
                                  <li className="page-item active" key={i}>
                                    <div className="page-link">{n}</div>
                                  </li>
                                </ul>
                              );
                            } else if (n === 1 || n === npage || (n >= currentPage - maxPageNumbersToShow && n <= currentPage + maxPageNumbersToShow)) {
                              // Render the first and last page numbers, or the page numbers within the range around the current page
                              return (
                                <li className="page-item" key={i}>
                                  <div className="page-link" onClick={() => changeCPage(n)}>{n}</div>
                                </li>
                              );
                            } else if ((n === currentPage - maxPageNumbersToShow - 1 && currentPage - maxPageNumbersToShow > minPageNumbersToShow) || (n === currentPage + maxPageNumbersToShow + 1 && currentPage + maxPageNumbersToShow < npage - minPageNumbersToShow)) {
                              // Render the dots to show a break in the page numbers
                              return (
                                <li className="page-item" key={i}>
                                  <div className="page-link">...</div>
                                </li>
                              );
                            } else {
                              // Hide the page number if it's not within the range to show
                              return null;
                            }
                          })}
                        </li>

                        <li className="page-item">
                          <div className="page-link" onClick={nextPage}>{'>'}</div>
                        </li>

                      </ul>
                    ) : (
                      <></>
                    )}




                    <div className="pagination-count2">
                      {productsList.length > 0 ? (
                        productsList.length === 1 ? (
                          <p className="total">Mueble {firstIndex + 1} de {productsList.length}</p>
                        ) : (
                          <p className="total">Muebles {firstIndex + 1} a {productsTable.length + firstIndex} de {productsList.length}</p>
                        )
                      ) : (
                        <></>
                      )}
                    </div>

                  </div>
                </div>
              ) : isLoading === true ? (
                <div className='loading-furniture'><Loader /><p>Cargando {title}...</p></div>
              ) : (
                <div className='notfound-product'>
                  <div className='product-svg'>
                    <NoProductSvg />
                  </div>
                  <h2 className="title-no">No se han encontrado {title.toString().toLowerCase()} disponibles en este momento.</h2>
                </div>
              )}


            </div>
          </div>
        </div>
      </section>
    </div>
  )
  //#endregion
}

export default ProductsModel