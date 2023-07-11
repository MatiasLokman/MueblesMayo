import Swal from "sweetalert2";
import $ from "jquery";
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import "./ModelManager.css";

//#region SVG'S Imports
import { ReactComponent as Edit } from "../../../assets/svgs/edit.svg";
import { ReactComponent as Delete } from "../../../assets/svgs/delete.svg";
import { ReactComponent as Add } from "../../../assets/svgs/add.svg";
import { ReactComponent as Save } from "../../../assets/svgs/save.svg";
import { ReactComponent as Update } from "../../../assets/svgs/update.svg";
import { ReactComponent as Close } from "../../../assets/svgs/closebtn.svg";
import { ReactComponent as Back } from "../../../assets/svgs/back.svg";

import { ReactComponent as TypeInput } from "../../../assets/svgs/type.svg";
import { ReactComponent as CategoryInput } from "../../../assets/svgs/category.svg";
import { ReactComponent as MaterialInput } from "../../../assets/svgs/material.svg";
//#endregion

import { DeleteTypes, GetTypes, SaveTypes, UpdateTypes, DeleteCategories, GetCategories, SaveCategories, UpdateCategories, DeleteMaterials, GetMaterials, SaveMaterials, UpdateMaterials } from '../../../functions/functions';


function ModelManager(managerType) {

  //#region Constantes
  // Constantes inicializadas como vacias a las cuales se les dara un valor luego y el mismo sera capturado por el "useState()"
  const [id, setId] = useState("");

  const [nombre, setNombre] = useState("");
  const [prevNombre, setPrevNombre] = useState("");

  const [modalTitle, setModalTitle] = useState("");

  // Constantes inicializadas como arrays vacios
  const [data, setData] = useState([]);

  const token = localStorage.getItem('token'); // Obtener el token del localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Agregar el encabezado Authorization con el valor del token
  };

  const navigate = useNavigate();
  //#endregion

  //#region Constantes de la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(20);
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const dataTable = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / dataPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const [maxPageNumbersToShow, setMaxPageNumbersToShow] = useState(9);
  const minPageNumbersToShow = 0;
  //#endregion

  //#region Funciones que se ejecutaran automaticamente cuando se renderize el componente
  useEffect(() => {
    const fetchData = async () => {
      if (managerType === "type") {
        await GetTypes(setData);

      } else if (managerType === "category") {
        await GetCategories(setData);

      } else if (managerType === "material") {
        await GetMaterials(setData);

      }
    };

    fetchData();

    if (window.matchMedia("(max-width: 500px)").matches) {
      setDataPerPage(1);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 600px)").matches) {
      setDataPerPage(2);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 700px)").matches) {
      setDataPerPage(3);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 800px)").matches) {
      setDataPerPage(4);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 900px)").matches) {
      setDataPerPage(5);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 1000px)").matches) {
      setDataPerPage(6);
      setMaxPageNumbersToShow(1)
    }
    else if (window.matchMedia("(max-width: 1140px)").matches) {
      setDataPerPage(7);
      setMaxPageNumbersToShow(1)
    }
    else {
      setDataPerPage(10);
      setMaxPageNumbersToShow(9)
    };

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

  }, [managerType, navigate]);
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
  function ClearDataInputs() {
    setId("");
    setNombre("");
  }
  //#endregion

  //#region Funcion para traer los valores almacenados de una tipo de mueble/categoría/material y cargar cada uno de ellos en su input correspondiente
  function RetrieveDataInputs(data) {
    if (managerType === "type") {
      setId(data.idTipo)
    } else if (managerType === "category") {
      setId(data.idCategoria);
    } else if (managerType === "material") {
      setId(data.idMaterial)
    }

    setNombre(data.nombre);

    setPrevNombre(data.nombre);
  }
  //#endregion

  //#region Funcion para volver el formulario a su estado inicial, borrando los valores de los inputs y refrezcando la lista de muebles
  function InitialState() {
    ClearDataInputs();
    if (managerType === "type") {
      GetTypes(setData);
    } else if (managerType === "category") {
      GetCategories(setData);
    } else if (managerType === "material") {
      GetMaterials(setData);
    }
  }
  //#endregion

  //#region Funcion para cerrar el modal a mano mediante el codigo
  function CloseModal() {
    $(document).ready(function () {
      $("#btn-close-modal").click();
    });
  }
  //#endregion

  //#region Funcion para verificar si el valor ingresado a traves del input es correcto
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
      return false
    }
    return true
  }
  //#endregion

  //#region Funcion para verificar si el valor ingresado a traves del input no esta repetido
  function IsRepeated() {
    for (let i = 0; i < data.length; i++) {
      if (nombre.toLowerCase() === data[i].nombre.toLowerCase()) {
        Swal.fire({
          icon: 'error',
          title: 'El nombre ingresado ya se encuentra registrado',
          text: 'Modifique el campo',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        }).then(function () {
          setTimeout(function () { $('#nombre').focus(); }, 500);
        });
        return true;
      }
    }
    return false
  }
  //#endregion

  //#region Funcion para verificar si el valor del input esta vacio
  function IsEmpty() {
    if (nombre === "") {
      return true
    }
    return false
  }
  //#endregion

  //#region Funcion para verificar si se actualizo el valor del input
  function IsUpdated() {
    if (prevNombre.toLowerCase() === nombre.toLowerCase() || prevNombre === "") {
      return false
    }
    return true
  }
  //#endregion

  //#region Funcion para insertar un tipo de mueble/categoría/material a la base de datos
  async function SaveData(event) {
    event.preventDefault();
    IsValid();
    IsRepeated();
    if (IsValid() === true && IsRepeated() === false) {
      try {
        let swalTitleSave;
        if (managerType === "type") {
          await SaveTypes(nombre, headers);
          swalTitleSave = 'Tipo de mueble registrado exitosamente!';
        } else if (managerType === "category") {
          await SaveCategories(nombre, headers);
          swalTitleSave = 'Categoría registrada exitosamente!';
        } else if (managerType === "material") {
          await SaveMaterials(nombre, headers);
          swalTitleSave = 'Material registrado exitosamente!';
        }

        Swal.fire({
          icon: 'success',
          title: swalTitleSave,
          showConfirmButton: false,
          timer: 2000
        });

        CloseModal()
        InitialState();
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

  //#region Funcion para actualizar un tipo de mueble/categoría/material ya existente en la base de datos
  async function UpdateData(event) {
    event.preventDefault();
    if (IsUpdated() === false) {
      let swalTitleUpdateFalse;
      let swalTextUpdateFalse;
      if (managerType === "type") {
        swalTitleUpdateFalse = 'No puede actualizar el tipo de mueble sin modificar el campo';
        swalTextUpdateFalse = 'Modifique el campo para poder actualizarlo';
      } else if (managerType === "category") {
        swalTitleUpdateFalse = 'No puede actualizar la categoría sin modificar el campo';
        swalTextUpdateFalse = 'Modifique el campo para poder actualizarla';
      } else if (managerType === "material") {
        swalTitleUpdateFalse = 'No puede actualizar el material sin modificar el campo';
        swalTextUpdateFalse = 'Modifique el campo para poder actualizarlo';
      }

      Swal.fire({
        icon: 'error',
        title: swalTitleUpdateFalse,
        text: swalTextUpdateFalse,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#F27474',
      });
    }
    else if ((IsValid() === true) && (IsUpdated() === true) && (IsRepeated() === false)) {
      try {

        let swalTitleUpdateTrue;
        if (managerType === "type") {
          await UpdateTypes(id, nombre, headers);
          swalTitleUpdateTrue = 'Tipo de mueble actualizado exitosamente!';
        } else if (managerType === "category") {
          await UpdateCategories(id, nombre, headers);
          swalTitleUpdateTrue = 'Categoría actualizada exitosamente!';
        } else if (managerType === "material") {
          await UpdateMaterials(id, nombre, headers);
          swalTitleUpdateTrue = 'Material actualizado exitosamente!';
        }

        Swal.fire({
          icon: 'success',
          title: swalTitleUpdateTrue,
          showConfirmButton: false,
          timer: 2000
        });

        CloseModal();
        InitialState();
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

  //#region Funcion para eliminar un tipo de mueble/categoría/material existente en la base de datos
  async function DeleteData(id) {
    try {

      let swalTitleDeleteTrue;
      if (managerType === "type") {
        await DeleteTypes(id, headers);
        swalTitleDeleteTrue = 'Tipo de mueble eliminado exitosamente!';
      } else if (managerType === "category") {
        await DeleteCategories(id, headers);
        swalTitleDeleteTrue = 'Categoría eliminada exitosamente!';
      } else if (managerType === "material") {
        await DeleteMaterials(id, headers);
        swalTitleDeleteTrue = 'Material eliminado exitosamente!';
      }

      Swal.fire({
        icon: 'success',
        title: swalTitleDeleteTrue,
        showConfirmButton: false,
        timer: 2000
      });

      InitialState();
    } catch {

      let swalTitleDeleteFalse;
      let swalTextDeleteFalse;
      if (managerType === "type") {
        swalTitleDeleteFalse = 'No puede eliminar este tipo de mueble ya que el mismo se encuentra seleccionado dentro de uno o mas muebles';
        swalTextDeleteFalse = 'Primero debera eliminar el/los muebles que contienen el tipo de mueble que desea eliminar o cambiarle/s su tipo de mueble';
      } else if (managerType === "category") {
        swalTitleDeleteFalse = 'No puede eliminar esta categoría ya que la misma se encuentra seleccionada dentro de uno o mas muebles';
        swalTextDeleteFalse = 'Primero debera eliminar el/los muebles que contienen la categoría que desea eliminar o cambiarle/s su categoría';
      } else if (managerType === "material") {
        swalTitleDeleteFalse = 'No puede eliminar este material ya que el mismo se encuentra seleccionado dentro de uno o mas muebles';
        swalTextDeleteFalse = 'Primero debera eliminar el/los muebles que contienen el material que desea eliminar o cambiarle/s su material';
      }

      Swal.fire({
        icon: 'error',
        title: swalTitleDeleteFalse,
        text: swalTextDeleteFalse,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Aceptar',
      });

    }
  }
  //#endregion


  //#region Lo que retornara el componente
  return (
    <div>
      <Helmet>
        {managerType === "type" ? (
          <title>Muebles Mayo | Administrar Tipos de Mueble</title>
        ) : managerType === "category" ? (
          <title>Muebles Mayo | Administrar Categorías</title>
        ) : (
          <title>Muebles Mayo | Administrar Materiales</title>
        )}
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

              <h2 className="title title-product">
                {managerType === "type" ? (
                  "Detalle de los Tipos de Mueble"
                ) : managerType === "category" ? (
                  "Detalle de las Categorías"
                ) : (
                  "Detalle de los Materiales"
                )}
              </h2>

              <button type="button" className="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { ClearDataInputs(); managerType === "type" ? setModalTitle("Registrar Tipo de Mueble") : managerType === "category" ? setModalTitle("Registrar Categoría") : setModalTitle("Registrar Material"); setTimeout(function () { $('#nombre').focus(); }, 500); }}>
                <div className="btn-add-content">
                  <Add className="add" />
                  <p className="p-add">Añadir</p>
                </div>
              </button>
            </div>


            {data.length > 1 || data.length === 0 ? (
              <p className="total">Hay {data.length} {managerType === "type" ? 'tipos de muebles' : managerType === "category" ? 'categorías' : 'materiales'}.</p>
            ) : (
              <p className="total">Hay {data.length} {managerType === "type" ? 'tipo de mueble' : managerType === "category" ? 'categoría' : 'material'}.</p>
            )}

          </div>

          {/* modal con el formulario para registrar un tipo de mueble/categoría/material */}
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
                          id="id"
                          hidden
                          value={id}
                          onChange={(event) => {
                            setId(event.target.value);
                          }}
                        />

                        <label className="label">Nombre:</label>
                        <div className="form-group-input">
                          <span className="input-group-text">
                            {managerType === "type" ? (
                              <TypeInput className="input-group-svg" />
                            ) : managerType === "category" ? (
                              <CategoryInput className="input-group-svg" />
                            ) : (
                              <MaterialInput className="input-group-svg" />
                            )}

                          </span>
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

                      <div>
                        {modalTitle === "Registrar Tipo de Mueble" || modalTitle === "Registrar Categoría" || modalTitle === "Registrar Material" ? (
                          <button className="btn btn-success btnadd" onClick={SaveData}>
                            <div className="btn-save-update-close">
                              <Save className="save-btn" />
                              <p className="p-save-update-close">Guardar</p>
                            </div>
                          </button>
                        ) : (
                          <button className="btn btn-warning btn-edit-color" onClick={UpdateData}>
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
                      if (modalTitle === 'Registrar Tipo de Mueble' || modalTitle === 'Registrar Categoría' || modalTitle === 'Registrar Material') {
                        if (IsEmpty() === true) {
                          ClearDataInputs();
                          CloseModal()
                        } else {
                          Swal.fire({
                            icon: 'warning',
                            title: '¿Está seguro de que desea cerrar el formulario?',
                            text: "Se perderá el dato ingresado",
                            confirmButtonText: 'Aceptar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#f8bb86',
                            cancelButtonColor: '#6c757d',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              ClearDataInputs();
                              CloseModal();
                            }
                          })
                        }
                      } else if (modalTitle === 'Actualizar Tipo de Mueble' || modalTitle === 'Actualizar Categoría' || modalTitle === 'Actualizar Material') {
                        if (IsUpdated() === false) {
                          ClearDataInputs();
                          CloseModal();
                        } else {
                          Swal.fire({
                            icon: 'warning',
                            title: '¿Está seguro de que desea cerrar el formulario?',
                            text: "Se perderá el dato modificado",
                            confirmButtonText: 'Aceptar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#f8bb86',
                            cancelButtonColor: '#6c757d',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              ClearDataInputs();
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

          {/* tabla de tipos de mueble/categorías/materiales */}
          <table className="table table-dark table-list" align="center">
            <thead>
              <tr className="table-header">
                <th className="table-title" scope="col">#</th>
                <th className="table-title" scope="col">Nombre</th>
                <th className="table-title" scope="col">Acciones</th>
              </tr>
            </thead>


            {data.length > 0 ? (
              dataTable.map(function fn(data, index) {
                return (
                  <tbody key={1 + data.id}>
                    <tr>
                      <th scope="row" className="table-name">{(index + 1)}</th>
                      <td className="table-name">{data.nombre}</td>

                      <td className="table-name">
                        <button type="button" className="btn btn-warning btn-edit" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { RetrieveDataInputs(data); if (managerType === "type") { setModalTitle("Actualizar Tipo de Mueble"); } else if (managerType === "category") { setModalTitle("Actualizar Categoría"); } else if (managerType === "material") { setModalTitle("Actualizar Material"); } }}>
                          <Edit className="edit" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-delete"
                          onClick={() => Swal.fire({
                            title: `¿Está seguro de que desea eliminar ${managerType === "type" ? "el siguiente tipo de mueble" : managerType === "category" ? "la siguiente categoría" : "el siguiente material"}: ${data.nombre}?`,
                            text: `Una vez ${managerType === "type" ? "eliminado" : managerType === "category" ? "eliminada" : "eliminado"}, no se podra recuperar`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#F8BB86',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Aceptar',
                            cancelButtonText: 'Cancelar',
                            focusCancel: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                              if (managerType === "type") {
                                DeleteData(data.idTipo)
                              } else if (managerType === "category") {
                                DeleteData(data.idCategoria)
                              } else {
                                DeleteData(data.idMaterial)
                              }
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
                <tr>
                  <td className="table-name" colSpan={3}>Sin registros</td>
                </tr>
              </tbody>

            )}




          </table>

          <div className="pagination-count-container2">

            <div className="pagination-count">
              {data.length > 0 ? (
                data.length === 1 ? (
                  <p className="total">{managerType === "type" ? "Tipo de Mueble" : managerType === "category" ? "Categoría" : "Material"} {firstIndex + 1} de {data.length}</p>
                ) : (
                  <p className="total">{managerType === "type" ? "Tipos de Mueble" : managerType === "category" ? "Categorías" : "Materiales"} {firstIndex + 1} a {dataTable.length + firstIndex} de {data.length}</p>
                )
              ) : (
                <></>
              )}
            </div>



            {data.length > 0 ? (
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

export default ModelManager