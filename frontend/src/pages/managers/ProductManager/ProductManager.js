import Swal from "sweetalert2";
import { ReactComponent as Filter } from "../../../assets/svgs/filter.svg";
import { ReactComponent as Lupa } from "../../../assets/svgs/lupa.svg";
import { useDownloadExcel } from "react-export-table-to-excel";
import $ from "jquery";
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import "./ProductManager.css";

//#region SVG'S Imports
import { ReactComponent as Edit } from "../../../assets/svgs/edit.svg";
import { ReactComponent as Delete } from "../../../assets/svgs/delete.svg";
import { ReactComponent as Add } from "../../../assets/svgs/add.svg";
import { ReactComponent as Save } from "../../../assets/svgs/save.svg";
import { ReactComponent as Update } from "../../../assets/svgs/update.svg";
import { ReactComponent as Close } from "../../../assets/svgs/closebtn.svg";
import { ReactComponent as Back } from "../../../assets/svgs/back.svg";

import { ReactComponent as Excel } from "../../../assets/svgs/excel.svg";

import { ReactComponent as ProductInput } from "../../../assets/svgs/productinput.svg";
import { ReactComponent as HeightInput } from "../../../assets/svgs/heightinput.svg";
import { ReactComponent as WidthInput } from "../../../assets/svgs/widthinput.svg";
import { ReactComponent as DepthInput } from "../../../assets/svgs/depthinput.svg";
import { ReactComponent as StockInput } from "../../../assets/svgs/stockinput.svg";
import { ReactComponent as ImageInput } from "../../../assets/svgs/imageinput.svg";
//#endregion

import { GetProductsManage, GetMaterials, GetTypes, GetCategories, SaveProducts, UpdateProducts, DeleteProducts, UploadImages } from '../../../functions/functions';


function ProductManager() {
  //#region Constantes
  // Constantes inicializadas como vacias a las cuales se les dara un valor luego y el mismo sera capturado por el "useState()"
  const [idProducto, setIdProducto] = useState("");

  const [nombre, setNombre] = useState("");
  const [prevNombre, setPrevNombre] = useState("");

  const [frente, setFrente] = useState("");
  const [prevFrente, setPrevFrente] = useState("");

  const [profundidad, setProfundidad] = useState("");
  const [prevProfundidad, setPrevProfundidad] = useState("");

  const [alto, setAlto] = useState("");
  const [prevAlto, setPrevAlto] = useState("");

  const [enDescuento, setEnDescuento] = useState("");
  const [prevEnDescuento, setPrevEnDescuento] = useState("");

  var checkbox = document.getElementById("enDescuento");

  const [stock, setStock] = useState("");
  const [prevStock, setPrevStock] = useState("");

  const [idMaterial, setIdMaterial] = useState("");
  const [prevIdMaterial, setPrevIdMaterial] = useState("");

  const [idTipo, setIdTipo] = useState("");
  const [prevIdTipo, setPrevIdTipo] = useState("");

  const [idCategoria, setIdCategoria] = useState("");
  const [prevIdCategoria, setPrevIdCategoria] = useState("");

  const [idImagen, setIdImagen] = useState("");

  const [urlImagen, setUrlImagen] = useState("");
  const [prevUrlImagen, setPrevUrlImagen] = useState("");

  const [modalTitle, setModalTitle] = useState("");

  // Constantes inicializadas como arrays vacios
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [originalProductsList, setOriginalProductsList] = useState(products);

  const [title, setTitle] = useState(["Detalles de Muebles"])

  const [typeSign, setTypeSign] = useState("+")
  const [categorySign, setCategorySign] = useState("+")
  const [materialSign, setMaterialSign] = useState("+")

  const [filterName, setFilterName] = useState("")

  const [filterType, setFilterType] = useState("")

  const [imageSelected, setImageSelected] = useState()

  const [query, setQuery] = useState("");

  const [onDiscount, setOnDiscount] = useState(false);

  const tableRef = useRef(null)

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${title}`,
    sheet: `${title}`
  });

  const token = localStorage.getItem('token'); // Obtener el token del localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Agregar el encabezado Authorization con el valor del token
  };

  const navigate = useNavigate()
  //#endregion

  //#region Constantes de la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const productsTable = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / productsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const [maxPageNumbersToShow, setMaxPageNumbersToShow] = useState(9);
  const minPageNumbersToShow = 0;
  //#endregion

  //#region Funciones que se ejecutaran automaticamente cuando se renderize el componente
  useEffect(() => {
    (async () => await [GetProductsManage(setProducts), GetProductsManage(setOriginalProductsList), GetCategories(setCategories), GetMaterials(setMaterials), GetTypes(setTypes)])();

    if (window.matchMedia("(max-width: 500px)").matches) {
      setProductsPerPage(1);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 600px)").matches) {
      setProductsPerPage(2);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 700px)").matches) {
      setProductsPerPage(3);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 800px)").matches) {
      setProductsPerPage(4);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 900px)").matches) {
      setProductsPerPage(5);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 1000px)").matches) {
      setProductsPerPage(6);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 1140px)").matches) {
      setProductsPerPage(7);
      setMaxPageNumbersToShow(1)
    }
    else {
      setProductsPerPage(10);
      setMaxPageNumbersToShow(9)
    }

    const token = localStorage.getItem("token");

    if (token) {
      const expiracionEnSegundos = (JSON.parse(atob(token.split(".")[1]))).exp;
      const expiracionEnMilisegundos = expiracionEnSegundos * 1000;
      const fechaExpiracion = new Date(expiracionEnMilisegundos);
      const fechaActual = new Date();

      if (fechaExpiracion <= fechaActual) {
        localStorage.removeItem('token');
        navigate('/login');
      }

      const temporizador = setInterval(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          clearInterval(temporizador);
          return;
        }

        const expiracionEnSegundos = (JSON.parse(atob(token.split(".")[1]))).exp;
        const expiracionEnMilisegundos = expiracionEnSegundos * 1000;
        const fechaExpiracion = new Date(expiracionEnMilisegundos);
        const fechaActual = new Date();

        if (fechaExpiracion <= fechaActual) {
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'warning',
            title: 'Tu sesión ha expirado',
            text: "Te estamos redirigiendo a la página de autenticación...",
            timer: 4500,
            timerProgressBar: true,
            showConfirmButton: false
          })
          navigate('/login');
        }
      }, 3 * 60 * 60 * 1000); // 3 horas

      return () => {
        clearInterval(temporizador);
      };
    }
  }, [navigate]);
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
    // borrar la negritra a cualquier item seleccionado anteriormente
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
    setProducts(originalProductsList); // trae la lista de muebles original, sin ningun filtro
    setQuery("");
    setFilterName("")
    setFilterType("")
    setTitle("Detalles de Muebles")
    document.getElementById("clear-filter").style.display = "none";
    document.getElementById("clear-filter2").style.display = "none"; // esconde del DOM el boton de limpiar filtros
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };
  //#endregion

  //#region Funciones de los filtros
  const filterResultType = (type) => {
    setProducts(originalProductsList);
    const result = originalProductsList.filter((originalProductsList) => {
      return originalProductsList.nombreTipo === type;
    })
    setTitle(`Detalles de ${type}`);
    setProducts(result);
    setQuery("");
    document.getElementById("clear-filter").style.display = "flex";
    document.getElementById("clear-filter2").style.display = "flex";
    setFilterName(type)
    setFilterType("type")
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }

  const filterResultCategory = (category) => {
    setProducts(originalProductsList);
    const result = originalProductsList.filter((originalProductsList) => {
      return originalProductsList.nombreCategoria === category;
    })
    if (category === "Infantil") {
      setTitle(`Detalles de Muebles Infantiles`);
    } else {
      setTitle(`Detalles de Muebles de ${category}`);
    }
    setProducts(result);
    setQuery("");
    document.getElementById("clear-filter").style.display = "flex";
    document.getElementById("clear-filter2").style.display = "flex";
    setFilterName(category)
    setFilterType("category")
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }

  const filterResultMaterial = (material) => {
    setProducts(originalProductsList);
    const result = originalProductsList.filter((originalProductsList) => {
      return originalProductsList.nombreMaterial === material;
    })
    setTitle(`Detalles de Muebles de ${material}`);
    setProducts(result);
    setQuery("");
    document.getElementById("clear-filter").style.display = "flex";
    document.getElementById("clear-filter2").style.display = "flex";
    setFilterName(material)
    setFilterType("material")
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }


  const filterResultOnDiscount = (onDiscount) => {
    if (onDiscount === false) {
      setProducts(originalProductsList);
      const result = originalProductsList.filter((originalProductsList) => {
        return originalProductsList.enDescuento === true;
      })
      setTitle("Detalles de Muebles en descuento");
      setProducts(result);
      setQuery("");
      document.getElementById("clear-filter").style.display = "flex";
      document.getElementById("clear-filter2").style.display = "flex";
      setFilterName("En descuento")
      setFilterType("discount")
      ClearBold();
      setCurrentPage(1)
      window.scrollTo(0, 0);
    }
    else {
      ClearFilter();
    }
  }
  //#endregion

  //#region Funcion para filtrar mueble mediante una consulta personalizada
  const search = () => {
    setProducts(originalProductsList);
    const result = originalProductsList.filter((product) =>
      product.nombre.toLowerCase().includes(query.toLowerCase()) ||
      product.idProducto.toString().toLowerCase().includes(query.toLowerCase())
    );
    setProducts(result);
    document.getElementById("clear-filter").style.display = "flex";
    document.getElementById("clear-filter2").style.display = "flex";
    setTitle(`Detalles de Muebles con: "${query.charAt(0).toUpperCase() + query.slice(1)}"`);
    setFilterName(query.charAt(0).toUpperCase() + query.slice(1));
    setFilterType("search")
    ClearBold();
    setCurrentPage(1);
    window.scrollTo(0, 0);
    if (query === "") {
      document.getElementById("clear-filter").style.display = "none";
      document.getElementById("clear-filter2").style.display = "none";
      setFilterType("")
      setTitle("Detalles de Muebles")
      window.scrollTo(0, 0);
    }
  };
  //#endregion

  //#region Funcion para subir una imagen a cloudinary
  const uploadImage = async () => {
    try {
      const result = await UploadImages(imageSelected);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
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

  //#region Funcion para limpiar todos los valores de los inputs del formulario
  function ClearProductInputs() {
    setIdProducto("");

    setNombre("");
    setFrente("");
    setProfundidad("");
    setAlto("");
    setEnDescuento("");
    setStock("");
    setIdMaterial("");
    setIdTipo("");
    setIdCategoria("");
    setIdImagen("");
    setUrlImagen("");

    document.getElementById("image-url").value = "";
  }
  //#endregion

  //#region Funcion para traer los valores almacenados de un mueble y cargar cada uno de ellos en su input correspondiente
  function RetrieveProductInputs(product) {
    setIdProducto(product.idProducto);
    setNombre(product.nombre);
    setFrente(product.frente);
    setProfundidad(product.profundidad);
    setAlto(product.alto);
    setEnDescuento(product.enDescuento);
    setStock(product.stock);
    setIdMaterial(product.idMaterial);
    setIdTipo(product.idTipo);
    setIdCategoria(product.idCategoria);
    setIdImagen(product.idImagen);
    setUrlImagen(product.urlImagen);

    setPrevNombre(product.nombre);
    setPrevFrente(product.frente);
    setPrevProfundidad(product.profundidad);
    setPrevAlto(product.alto);
    setPrevEnDescuento(product.enDescuento);
    setPrevStock(product.stock);
    setPrevIdMaterial(product.idMaterial);
    setPrevIdTipo(product.idTipo);
    setPrevIdCategoria(product.idCategoria);
    setPrevUrlImagen(product.urlImagen);
  }
  //#endregion

  //#region Funcion para volver el formulario a su estado inicial, borrando los valores de los inputs, cargando los selects y refrezcando la lista de muebles
  function InitialState() {
    ClearProductInputs();
    GetProductsManage(setProducts);
    GetProductsManage(setOriginalProductsList)
    GetCategories(setCategories);
    GetMaterials(setMaterials);
    GetTypes(setTypes);
  }
  //#endregion

  //#region Funcion para cerrar el modal a mano mediante el codigo
  function CloseModal() {
    $(document).ready(function () {
      $("#btn-close-modal").click();
    });
  }
  //#endregion

  //#region Funcion para cerrar el modal a mano mediante el codigo
  function CloseFilterModal() {
    $(document).ready(function () {
      $("#btn-close-modal-filters").click();
    });
  }
  //#endregion

  //#region Funcion para mostrar el boton de Guardar de manera normal
  function ShowSaveButton() {
    const btnSave = document.getElementById("btn-save");
    const divBtnSave = document.getElementById("div-btn-save");
    btnSave.style.pointerEvents = "all";
    btnSave.style.opacity = "1";
    divBtnSave.style.cursor = "default";
  }
  //#endregion

  //#region Funcion para verificar si los valores ingresados a traves del input son correctos
  function IsValid() {
    if (nombre === "") {
      Swal.fire({
        icon: 'error',
        title: 'El nombre no puede estar vacío',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#nombre').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    } else if (frente === "") {
      Swal.fire({
        icon: 'error',
        title: 'El frente no puede estar vacío',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#frente').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    } else if (alto === "") {
      Swal.fire({
        icon: 'error',
        title: 'El alto no puede estar vacío',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#alto').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    } else if (profundidad === "") {
      Swal.fire({
        icon: 'error',
        title: 'La profundiad no puede estar vacía',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#profundidad').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    } else if (enDescuento === "") {
      Swal.fire({
        icon: 'error',
        title: 'Debe indicar si se encuentra en descuento',
        text: 'Clickeé el botón en caso de que el mismo se encuentre en descuento',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      )
      ShowSaveButton();
      return false
    } else if (stock === "") {
      Swal.fire({
        icon: 'error',
        title: 'El stock no puede estar vacío',
        text: 'Complete el campo, si no hay stock ingrese 0',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#stock').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    } else if (stock > 10000) {
      Swal.fire({
        icon: 'error',
        title: 'El stock no puede ser mayor a 10.000',
        text: 'Modifique la cifra del campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#stock').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    } else if (idTipo === "") {
      Swal.fire({
        icon: 'error',
        title: 'El tipo no puede estar vacío',
        text: 'Seleccione un tipo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      )
      ShowSaveButton();
      return false
    } else if (idCategoria === "") {
      Swal.fire({
        icon: 'error',
        title: 'La categoría no puede estar vacía',
        text: 'Seleccione una categoría',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      )
      ShowSaveButton();
      return false
    } else if (idMaterial === "") {
      Swal.fire({
        icon: 'error',
        title: 'El material no puede estar vacío',
        text: 'Seleccione un material',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      )
      ShowSaveButton();
      return false
    } else if (urlImagen === "") {
      Swal.fire({
        icon: 'error',
        title: 'El campo imagen no puede estar vacío',
        text: 'Suba una imagen',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#imagen').focus(); }, 500);
      });
      ShowSaveButton();
      return false
    }
    return true
  }
  //#endregion

  //#region Funcion para verificar si el valor ingresado a traves del input no esta repetido
  function IsRepeated() {
    for (let i = 0; i < products.length; i++) {
      if (nombre.toLowerCase() === products[i].nombre.toLowerCase() && nombre !== prevNombre) {
        Swal.fire({
          icon: 'error',
          title: 'El nombre ingresado ya se encuentra registrado',
          text: 'Modifique el campo',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        }).then(function () {
          setTimeout(function () { $('#nombre').focus(); }, 500);
        });

        ShowSaveButton();

        return true;
      }
    }
    return false
  }
  //#endregion

  //#region Funcion para verificar si el valor del input esta vacio
  function IsEmpty() {
    if (nombre !== "") {
      return false
    } else if (frente !== "") {
      return false
    } else if (profundidad !== "") {
      return false
    } else if (alto !== "") {
      return false
    } else if (enDescuento !== false) {
      return false
    } else if (stock !== "") {
      return false
    } else if (idCategoria !== "") {
      return false
    } else if (idTipo !== "") {
      return false
    } else if (idMaterial !== "") {
      return false
    } else if (urlImagen !== "") {
      return false
    }
    return true
  }
  //#endregion

  //#region Funcion para verificar si se actualizo el valor del input
  function IsUpdated() {
    if (prevNombre.toLowerCase() !== nombre.toLocaleLowerCase() ||
      prevFrente !== frente ||
      prevProfundidad !== profundidad ||
      prevAlto !== alto ||
      prevEnDescuento !== enDescuento ||
      prevStock !== stock ||
      prevIdCategoria !== idCategoria ||
      prevIdTipo !== idTipo ||
      prevIdMaterial !== idMaterial ||
      prevUrlImagen !== urlImagen) {
      return true
    }
    return false
  }
  //#endregion

  //#region Funcion para insertar un mueble a la base de datos
  async function SaveProduct(event) {
    event.preventDefault();

    const btnSave = document.getElementById("btn-save");
    const divBtnSave = document.getElementById("div-btn-save");
    btnSave.style.pointerEvents = "none";
    btnSave.style.opacity = "0.5";
    divBtnSave.style.cursor = "wait";

    IsValid();
    IsRepeated();

    const { imageUrl, imageId } = await uploadImage();

    if (IsValid() === true && IsRepeated() === false && imageUrl != null) {
      try {
        await SaveProducts(
          {
            nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
            frente: frente,
            profundidad: profundidad,
            alto: alto,
            enDescuento: enDescuento,
            stock: stock,
            idMaterial: idMaterial,
            idTipo: idTipo,
            idCategoria: idCategoria,
            idImagen: imageId,
            urlImagen: imageUrl
          },
          headers
        );
        Swal.fire({
          icon: 'success',
          title: 'Mueble registrado exitosamente!',
          showConfirmButton: false,
          timer: 2000
        })
        CloseModal();
        InitialState();
        ShowSaveButton();
        setTitle("Detalles de Muebles");
        setQuery("");
        document.getElementById("clear-filter").style.display = "none";
        document.getElementById("clear-filter2").style.display = "none";
      } catch (err) {
        Swal.fire({
          title: (err),
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        })
      }
    }
  }
  //#endregion

  //#region Funcion para actualizar un mueble ya existente en la base de datos
  async function UpdateProduct(event) {
    let updatedImage = urlImagen; // Variable de estado para almacenar la URL de la imagen
    let updatedImageId = idImagen; // Variable de estado para almacenar la URL de la imagen

    event.preventDefault();

    if (urlImagen !== prevUrlImagen) {
      const { imageUrl, imageId } = await uploadImage();

      updatedImageId = imageId;
      updatedImage = imageUrl; // Actualiza la variable de estado con la nueva URL de la imagen
    }

    if (IsUpdated() === false) {
      Swal.fire({
        icon: 'error',
        title: 'No puede actualizar el mueble sin modificar ningun campo',
        text: 'Modifique al menos un campo para poder actualizarlo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#F27474',
      })
    }
    else if ((IsValid() === true) && (IsUpdated() === true) && (IsRepeated() === false)) {
      try {
        await UpdateProducts(
          products.find((u) => u.idProducto === idProducto).idProducto || idProducto,
          {
            idProducto: idProducto,
            nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
            frente: frente,
            profundidad: profundidad,
            alto: alto,
            enDescuento: enDescuento,
            stock: stock,
            idMaterial: idMaterial,
            idTipo: idTipo,
            idCategoria: idCategoria,
            idImagen: updatedImageId,
            urlImagen: updatedImage
          },
          headers
        );
        Swal.fire({
          icon: 'success',
          title: 'Mueble actualizado exitosamente!',
          showConfirmButton: false,
          timer: 2000
        })
        CloseModal();

        // InitialState();
        ClearProductInputs();
        await GetProductsManage(setProducts);
        GetCategories(setCategories);
        GetMaterials(setMaterials);
        GetTypes(setTypes)

        setProducts((prevProducts) => {
          setOriginalProductsList(prevProducts)

          if (filterType === "type") {
            const result = prevProducts.filter((product) => {
              return product.nombreTipo === filterName;
            });
            setTitle(`Detalles de ${filterName}`);
            setProducts(result);
            setQuery("");
            document.getElementById("clear-filter").style.display = "flex";
            document.getElementById("clear-filter2").style.display = "flex";
            setFilterName(filterName);
            setFilterType("type");
            ClearBold();
            setCurrentPage(1);
            return result;
          }

          if (filterType === "category") {
            const result = prevProducts.filter((product) => {
              return product.nombreCategoria === filterName;
            })
            if (filterName === "Infantil") {
              setTitle(`Detalles de Muebles Infantiles`);
            } else {
              setTitle(`Detalles de Muebles de ${filterName}`);
            }
            setProducts(result);
            setQuery("");
            document.getElementById("clear-filter").style.display = "flex";
            document.getElementById("clear-filter2").style.display = "flex";
            setFilterName(filterName)
            setFilterType("category")
            ClearBold();
            setCurrentPage(1);
          }

          if (filterType === "material") {
            const result = prevProducts.filter((product) => {
              return product.nombreMaterial === filterName;
            })
            setTitle(`Detalles de Muebles de ${filterName}`);
            setProducts(result);
            setQuery("");
            document.getElementById("clear-filter").style.display = "flex";
            document.getElementById("clear-filter2").style.display = "flex";
            setFilterName(filterName)
            setFilterType("material")
            ClearBold();
            setCurrentPage(1);
          }

          if (filterType === "discount") {
            const result = prevProducts.filter((product) => {
              return product.enDescuento === true;
            })
            setTitle("Detalles de Muebles en descuento");
            setProducts(result);
            setQuery("");
            document.getElementById("clear-filter").style.display = "flex";
            document.getElementById("clear-filter2").style.display = "flex";
            setFilterName("En descuento")
            setFilterType("discount")
            ClearBold();
            setCurrentPage(1);
          }

          if (filterType === "search") {
            const result = prevProducts.filter((product) => {
              return product.nombre.toLowerCase().includes(filterName.toLowerCase())
            });
            setProducts(result);
            document.getElementById("clear-filter").style.display = "flex";
            document.getElementById("clear-filter2").style.display = "flex";
            setTitle(`Detalles de Muebles con: "${filterName.charAt(0).toUpperCase() + filterName.slice(1)}"`);
            setFilterName(filterName.charAt(0).toUpperCase() + filterName.slice(1));
            setFilterType("search")
            ClearBold();
            setCurrentPage(1);
            if (filterName === "") {
              document.getElementById("clear-filter").style.display = "none";
              document.getElementById("clear-filter2").style.display = "none";
              setFilterType("")
              setTitle("Detalles de Muebles")
            }
          } if (filterType === "other") {
            setProducts(prevProducts);
          }
          else {
            return prevProducts;
          }
        });

      } catch (err) {
        Swal.fire({
          title: (err),
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        })
      }
    }
  }
  //#endregion

  //#region Funcion para eliminar un mueble existente en la base de datos
  async function DeleteProduct(id) {
    await DeleteProducts(id, headers);
    Swal.fire({
      icon: 'success',
      title: 'Mueble eliminado exitosamente!',
      showConfirmButton: false,
      timer: 2000
    })
    InitialState();
    setTitle("Detalles de Muebles")
    document.getElementById("clear-filter").style.display = "none";
    document.getElementById("clear-filte2").style.display = "none";
  }
  //#endregion


  //#region Lo que retornara el componente
  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | Administrar Muebles</title>
      </Helmet>

      <section id='products' className='products-container'>
        <div className="products-content">
          <div className="products-title">

            <div className="title-header">
              <Link to="/panel-de-administrador" className="btn btn-info btn-back">
                <div className="btn-back-content">
                  <Back className="back" />
                  <p className="p-back">Regresar</p>
                </div>
              </Link>

              <h2 className="title title-product">{title}</h2>
              <button type="button" className="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { ClearProductInputs(); setModalTitle("Registrar Mueble"); setTimeout(function () { $('#nombre').focus(); }, 500); setEnDescuento(false) }}>
                <div className="btn-add-content">
                  <Add className="add" />
                  <p className="p-add">Añadir</p>
                </div>
              </button>

            </div>

            {products.length > 1 || products.length === 0 ? (
              <p className="total">Hay {products.length} muebles.</p>
            ) : (
              <p className="total">Hay {products.length} mueble.</p>
            )}

          </div>

          {/* modal con el formulario para registrar un mueble */}
          <div className="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="exampleModalLabel">{modalTitle}</h1>
                </div>
                <div className="modal-body">
                  <div className="container mt-4">
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="input"
                          id="idProducto"
                          hidden
                          value={idProducto}
                          onChange={(event) => {
                            setIdProducto(event.target.value);
                          }}
                        />

                        <label className="label">Nombre:</label>
                        <div className="form-group-input">
                          <span className="input-group-text"><ProductInput className="input-group-svg" /></span>
                          <input
                            type="text"
                            className="input"
                            id="nombre"
                            value={nombre}
                            onChange={(event) => {
                              setNombre(event.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="frente-profundidad-alto">
                        <div className="form-group divs-contenedores">
                          <label className="label">Frente:</label>
                          <div className="form-group-input">
                            <span className="input-group-text"><WidthInput className="input-group-svg" /></span>
                            <input
                              type="number"
                              step="0.1"
                              min={0}
                              className="input"
                              id="frente"
                              value={frente}
                              onChange={(event) => {
                                setFrente(event.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group divs-contenedores">
                          <label className="label">Alto:</label>
                          <div className="form-group-input">
                            <span className="input-group-text"><HeightInput className="input-group-svg" /></span>
                            <div className="checkbtn">
                              <input
                                type="number"
                                step="0.1"
                                min={0}
                                className="input"
                                id="alto"
                                value={alto}
                                onChange={(event) => {
                                  setAlto(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group divs-contenedores">
                          <label className="label">Profundidad:</label>
                          <div className="form-group-input">
                            <span className="input-group-text"><DepthInput className="input-group-svg" /></span>
                            <input
                              type="number"
                              step="0.1"
                              min={0}
                              className="input"
                              id="profundidad"
                              value={profundidad}
                              onChange={(event) => {
                                setProfundidad(event.target.value);
                              }}
                            />
                          </div>
                        </div>

                      </div>

                      <div className="form-group endescuento">
                        <label className="label">Esta en descuento?</label>
                        <input
                          type="checkbox"
                          className="form-check-input tick"
                          id="enDescuento"
                          checked={enDescuento}
                          onChange={() => {
                            setEnDescuento(checkbox.checked);
                          }}
                        />
                        <label htmlFor="enDescuento" className="lbl-switch"></label>
                      </div>

                      <div className="form-group">
                        <label className="label">Stock:</label>
                        <div className="form-group-input">
                          <span className="input-group-text"><StockInput className="input-group-svg" /></span>
                          <input
                            type="number"
                            step="1"
                            min={0}
                            className="input"
                            id="stock"
                            value={stock}
                            onChange={(event) => {
                              setStock(event.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="contact-field-subject-products">
                        <label className="label selects" htmlFor="types">Tipo:</label>
                        <select className='custom-select btn-select' name='types' id="types" value={idTipo} onChange={(e) => setIdTipo(e.target.value)}>
                          <option hidden key={0} value="0">Seleccione un tipo</option>
                          {
                            Array.from(types).map((opts, i) => <option className="btn-option" key={i} value={opts.idTipo}>{opts.nombre}</option>)
                          }
                        </select>
                      </div>

                      <div className="contact-field-subject-products">
                        <label className="label selects" htmlFor="categorias">Categoria:</label>
                        <select className='custom-select btn-select' name='categorias' id="categorias" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                          <option hidden key={0} value="0">Seleccione una categoría</option>
                          {
                            Array.from(categories).map((opts, i) => <option className="btn-option" key={i} value={opts.idCategoria}>{opts.nombre}</option>)
                          }
                        </select>
                      </div>

                      <div className="contact-field-subject-products">
                        <label className="label selects" htmlFor="materials">Material:</label>
                        <select className='custom-select btn-select' name='materials' id="materials" value={idMaterial} onChange={(e) => setIdMaterial(e.target.value)}>
                          <option hidden key={0} value="0">Seleccione un material</option>
                          {
                            Array.from(materials).map((opts, i) => <option className="btn-option" key={i} value={opts.idMaterial}>{opts.nombre}</option>)
                          }
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="label">Imagen:</label>
                        <div className="form-group-input">
                          <span className="input-group-text"><ImageInput className="input-group-svg" /></span>
                          <input
                            id="image-url"
                            type="file"
                            className="input-file"
                            accept="image/*"
                            onChange={(event) => {
                              setImageSelected(event.target.files[0]);

                              setUrlImagen(event.target.value);
                            }}
                          />

                        </div>
                      </div>
                      <div>
                        {modalTitle === "Registrar Mueble" ? (
                          <div id="div-btn-save">
                            <button className="btn btn-success btnadd" id="btn-save" onClick={SaveProduct}>
                              <div className="btn-save-update-close">
                                <Save className="save-btn" />
                                <p className="p-save-update-close">Guardar</p>
                              </div>
                            </button>
                          </div>
                        ) : (
                          <button className="btn btn-warning btn-edit-color" id="btn-update" onClick={UpdateProduct}>
                            <div className="btn-save-update-close">
                              <Update className="update-btn" />
                              <p className="p-save-update-close">Actualizar</p>
                            </div>
                          </button>
                        )}
                      </div>

                    </form>
                  </div>
                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-secondary"
                    onClick={() => {
                      if (modalTitle === 'Registrar Mueble') {
                        if (IsEmpty() === true) {
                          ClearProductInputs();
                          CloseModal()
                        } else {
                          Swal.fire({
                            icon: 'warning',
                            title: '¿Está seguro de que desea cerrar el formulario?',
                            text: "Se perderán todos los datos cargados",
                            confirmButtonText: 'Aceptar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#f8bb86',
                            cancelButtonColor: '#6c757d',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              ClearProductInputs();
                              CloseModal();
                            }
                          })
                        }
                      } else if (modalTitle === 'Actualizar Mueble') {
                        if (IsUpdated() === false) {
                          ClearProductInputs();
                          CloseModal();
                        } else {
                          Swal.fire({
                            icon: 'warning',
                            title: '¿Está seguro de que desea cerrar el formulario?',
                            text: "Se perderán todos los datos modificados",
                            confirmButtonText: 'Aceptar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#f8bb86',
                            cancelButtonColor: '#6c757d',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              ClearProductInputs();
                              CloseModal();
                            }
                          })
                        }
                      }
                    }}
                  >
                    <div className="btn-save-update-close">
                      <Close className="close-btn" />
                      <p className="p-save-update-close">Cerrar</p>
                    </div>
                  </button>

                  <button type="button" className="btn-close-modal" id="btn-close-modal" data-bs-dismiss="modal"></button>

                </div>
              </div>
            </div>
          </div>

          <br />


          {/* modal con filtros */}
          <div className="modal fade" id="modal-filters" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog2">
              <div className="modal-content">
                <div className="modal-header2">
                  <h1 className="modal-title2" id="exampleModalLabel">Filtros</h1>
                  <button id='clear-filter2' className='clear-filter2' onClick={ClearFilter}>
                    <Close className='close-svg2' />
                    <p className='clear-filter-p'>{filterName}</p>
                  </button>

                </div>
                <div className="modal-body">
                  <div className="container">

                    <p className="filter-separator separator-margin"></p>

                    <div className='filter-btn-container' onClick={handleTypeClick} data-bs-toggle="collapse" href="#collapseType" role="button" aria-expanded="false" aria-controls="collapseType">
                      <p className="filter-btn-name">
                        TIPOS
                      </p>
                      <p className="filter-btn">
                        {typeSign}
                      </p>
                    </div>

                    <div className="collapse" id="collapseType">
                      <div className="card-collapse">
                        {types.map((type, index) => {
                          return (
                            <p
                              key={index}
                              id='items-collapse'
                              className={`items-collapse ${type.isActive ? 'active' : ''}`}
                              onClick={() => {
                                filterResultType(type.nombre);
                                setTypes(prevState => prevState.map(typ => (
                                  typ.nombre === type.nombre
                                    ? { ...typ, isActive: !typ.isActive }
                                    : (typ.nombre !== type.nombre && typ.isActive)
                                      ? { ...typ, isActive: false }
                                      : typ
                                )))
                              }}
                            >
                              {type.nombre}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    <p className="filter-separator"></p>

                    <div className='filter-btn-container' onClick={handleCategoryClick} data-bs-toggle="collapse" href="#collapseCategory" role="button" aria-expanded="false" aria-controls="collapseCategory">
                      <p className="filter-btn-name">
                        CATEGORÍAS
                      </p>
                      <p className="filter-btn">
                        {categorySign}
                      </p>
                    </div>
                    <div className="collapse" id="collapseCategory">
                      <div className="card-collapse">
                        {categories.map((category, index) => {
                          return (
                            <p
                              key={index}
                              id='items-collapse'
                              className={`items-collapse ${category.isActive ? 'active' : ''}`}
                              onClick={() => {
                                filterResultCategory(category.nombre);
                                setCategories(prevState => prevState.map(cat => (
                                  cat.nombre === category.nombre
                                    ? { ...cat, isActive: !cat.isActive }
                                    : (cat.nombre !== category.nombre && cat.isActive)
                                      ? { ...cat, isActive: false }
                                      : cat
                                )))
                              }}
                            >
                              {category.nombre}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    <p className="filter-separator"></p>

                    <div className='filter-btn-container' onClick={handleMaterialClick} data-bs-toggle="collapse" href="#collapseMaterial" role="button" aria-expanded="false" aria-controls="collapseMaterial">
                      <p className="filter-btn-name">
                        MATERIALES
                      </p>
                      <p className="filter-btn">
                        {materialSign}
                      </p>
                    </div>

                    <div className="collapse" id="collapseMaterial">
                      <div className="card-collapse">
                        {materials.map((material, index) => {
                          return (
                            <p
                              key={index}
                              id='items-collapse'
                              className={`items-collapse ${material.isActive ? 'active' : ''}`}
                              onClick={() => {
                                filterResultMaterial(material.nombre);
                                setMaterials(prevState => prevState.map(mat => (
                                  mat.nombre === material.nombre
                                    ? { ...mat, isActive: !mat.isActive }
                                    : (mat.nombre !== material.nombre && mat.isActive)
                                      ? { ...mat, isActive: false }
                                      : mat
                                )))
                              }}
                            >
                              {material.nombre}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    <p className="filter-separator"></p>

                    <div className='filter-btn-container'>
                      <p className="filter-btn-name">
                        EN DESCUENTO
                      </p>
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


                  </div>
                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-secondary"
                    onClick={CloseFilterModal}>
                    <div className="btn-save-update-close">
                      <Close className="close-btn" />
                      <p className="p-save-update-close">Cerrar</p>
                    </div>
                  </button>


                  <button type="button" className="btn-close-modal" id="btn-close-modal-filters" data-bs-dismiss="modal"></button>

                </div>
              </div>
            </div>
          </div>


          <div className='filters-left2'>

            <div className="pagination-count3">
              <div className='search-container'>
                <div className="form-group-input-search2">
                  <span className="input-group-text2"><Lupa className="input-group-svg" /></span>
                  <input
                    className="search-input2"
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyUp={search}
                    placeholder="Buscar..."
                  />
                </div>
              </div>
            </div>

            <div className="pagination-count-filter">
              <button className="btn btn-secondary btn-filters" data-bs-toggle="modal" data-bs-target="#modal-filters">
                <div className='filter-btn-title-container-2' id='filter-btn-title-container'>
                  <p className="filter-btn">
                    <Filter className='filter-svg2' />
                  </p>
                  <p className="filter-title2">
                    Filtros
                  </p>
                </div>
              </button>

              <button id='clear-filter' className='clear-filter2' onClick={ClearFilter}>
                <Close className='close-svg2' />
                <p className='clear-filter-p'>{filterName}</p>
              </button>
            </div>

            <div className="header-excel">
              <button onClick={onDownload} type="button" className="btn btn-success btn-excel">
                <div className="btn-add-content">
                  <Excel className="excel" />
                  <p className="p-add">Descargar</p>
                </div>
              </button>
            </div>
          </div>


          {/* tabla de muebles */}
          <table className="table table-dark table-list" align="center">
            <thead>
              <tr className="table-header">
                <th className="table-title" scope="col">#</th>
                <th className="table-title" scope="col">ID</th>
                <th className="table-title" scope="col">Nombre</th>
                <th className="table-title" scope="col">Frente</th>
                <th className="table-title" scope="col">Alto</th>
                <th className="table-title" scope="col">Profundidad</th>
                <th className="table-title" scope="col">En descuento?</th>
                <th className="table-title" scope="col">Stock</th>
                <th className="table-title" scope="col">Tipo</th>
                <th className="table-title" scope="col">Categoría</th>
                <th className="table-title" scope="col">Material</th>
                <th className="table-title" scope="col">Imagen</th>
                <th className="table-title" scope="col">Acciones</th>
              </tr>
            </thead>


            {products.length > 0 ? (
              productsTable.map(function fn(product, index) {
                return (
                  <tbody key={1 + product.idProducto}>
                    <tr>
                      <th scope="row" className="table-name">{(index + 1)}</th>
                      <td className="table-name">{product.idProducto} </td>
                      <td className="table-name">{product.nombre}</td>
                      <td className="table-name">{product.frente}</td>
                      <td className="table-name">{product.alto}</td>
                      <td className="table-name">{product.profundidad}</td>
                      {product.enDescuento ? (
                        <td className="table-name">Si</td>
                      ) : (
                        <td className="table-name">No</td>
                      )}
                      <td className="table-name">{product.stock}</td>
                      <td className="table-name">{product.nombreTipo}</td>
                      <td className="table-name">{product.nombreCategoria}</td>
                      <td className="table-name">{product.nombreMaterial}</td>
                      <td className="table-name">
                        <img src={product.urlImagen} onClick={() => Swal.fire({
                          title: product.nombre,
                          imageUrl: `${product.urlImagen}`,
                          imageWidth: 400,
                          imageHeight: 400,
                          imageAlt: 'Vista Mueble',
                          confirmButtonColor: '#6c757d',
                          confirmButtonText: 'Cerrar',
                          focusConfirm: true
                        })} className="list-img" alt="Mueble" />
                      </td>

                      <td className="table-name">
                        <button type="button" className="btn btn-warning btn-edit" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { RetrieveProductInputs(product); setModalTitle("Actualizar Mueble") }}>
                          <Edit className="edit" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-delete"
                          onClick={() => Swal.fire({
                            title: 'Esta seguro de que desea eliminar el siguiente mueble: ' + (product.nombre) + '?',
                            imageUrl: `${product.urlImagen}`,
                            imageWidth: 200,
                            imageHeight: 200,
                            imageAlt: 'Producto a eliminar',
                            text: "Una vez eliminado, no se podra recuperar",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#F8BB86',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Aceptar',
                            cancelButtonText: 'Cancelar',
                            focusCancel: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                              DeleteProduct(product.idProducto)
                            }
                          })
                          }
                        >
                          <Delete className="delete" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <tbody>
                <tr className="tr-name1">
                  <td className="table-name table-name1" colSpan={13}>Sin registros</td>
                </tr>
              </tbody>

            )}
          </table>


          {/* tabla de muebles */}
          <table ref={tableRef} className="table table-dark table-list-none" align="center">
            <thead>
              <tr className="table-header">
                <th className="table-title" scope="col">ID</th>
                <th className="table-title" scope="col">Nombre</th>
                <th className="table-title" scope="col">Frente</th>
                <th className="table-title" scope="col">Alto</th>
                <th className="table-title" scope="col">Profundidad</th>
                <th className="table-title" scope="col">En descuento?</th>
                <th className="table-title" scope="col">Stock</th>
                <th className="table-title" scope="col">Tipo</th>
                <th className="table-title" scope="col">Categoría</th>
                <th className="table-title" scope="col">Material</th>
              </tr>
            </thead>


            {products.length > 0 ? (
              products.map(function fn(product) {
                return (
                  <tbody key={1 + product.idProducto}>
                    <tr>
                      <td className="table-name">{product.idProducto} </td>
                      <td className="table-name">{product.nombre}</td>
                      <td className="table-name">{product.frente}</td>
                      <td className="table-name">{product.alto}</td>
                      <td className="table-name">{product.profundidad}</td>
                      {product.enDescuento ? (
                        <td className="table-name">Si</td>
                      ) : (
                        <td className="table-name">No</td>
                      )}
                      <td className="table-name">{product.stock}</td>
                      <td className="table-name">{product.nombreTipo}</td>
                      <td className="table-name">{product.nombreCategoria}</td>
                      <td className="table-name">{product.nombreMaterial}</td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <tbody>
                <tr>
                  <td className="table-name" colSpan={10}>Sin registros</td>
                </tr>
              </tbody>

            )}

          </table>


          <div className="pagination-count-container2">

            <div className="pagination-count">
              {products.length > 0 ? (
                products.length === 1 ? (
                  <p className="total">Mueble {firstIndex + 1} de {products.length}</p>
                ) : (
                  <p className="total">Muebles {firstIndex + 1} a {productsTable.length + firstIndex} de {products.length}</p>
                )
              ) : (
                <></>
              )}
            </div>

            {products.length > 0 ? (
              <ul className="pagination-manager">

                <div className="page-item">
                  <div className="page-link" onClick={prePage}>{'<'}</div>
                </div>

                <div className="numbers">
                  {numbers.map((n, i) => {
                    if (n === currentPage) {
                      // Render the current page number without a link
                      return (
                        <ul className='page-item-container'>
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

                </div>

                <div className="page-item">
                  <div className="page-link" onClick={nextPage}>{'>'}</div>
                </div>

              </ul>
            ) : (
              <></>
            )}


            <div className="pagination-count">
            </div>

          </div>


        </div>
      </section >

    </div >
  )
  //#endregion
}

export default ProductManager