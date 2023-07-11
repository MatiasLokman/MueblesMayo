import {  useEffect } from 'react'

import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom"

import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import "./AdminPanel.css";

import { ReactComponent as Products } from "../../assets/svgs/product.svg";
import { ReactComponent as Categories } from "../../assets/svgs/category.svg";
import { ReactComponent as Materials } from "../../assets/svgs/material.svg";
import { ReactComponent as Types } from "../../assets/svgs/type.svg";

function AdminPanel() {
  const navigate = useNavigate()

  useEffect(() => {
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

  const token = localStorage.getItem('token')

  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | Panel de administrador</title>
      </Helmet>
      <section id='notfound' className='adminpanel-container'>
        <div className="adminpanel-content">
          <h2 className='error'>¡Bienvenido {(JSON.parse(atob(token.split('.')[1]))).unique_name[1]}!</h2>
          <h2 className="title-error">Cliqué en la sección que desee administrar</h2>

          <div className='secciones'>
            <div className='seccion-dividida'>
              <Link to="/administrar-muebles" className='btn btn-dark category-btn'>
                <Products className='category-svg' />
                <p className='category-title'>Muebles</p>
              </Link>

              <Link to="/administrar-categorias" className='btn btn-dark category-btn'>
                <Categories className='category-svg' />
                <p className='category-title'>Categorías</p>
              </Link>
            </div>

            <div className='seccion-dividida'>

              <Link to="/administrar-materiales" className='btn btn-dark category-btn'>
                <Materials className='category-svg' />
                <p className='category-title'>Materiales</p>
              </Link>

              <Link to="/administrar-tipos-de-mueble" className='btn btn-dark category-btn'>
                <Types className='category-svg' />
                <p className='category-title'>Tipos</p>
              </Link>
            </div>


          </div>

        </div>
      </section>
    </div>
  )
}

export default AdminPanel