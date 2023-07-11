import { useState, useEffect } from 'react'

import Swal from "sweetalert2";
import $ from "jquery";

import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom"

import { Helmet } from 'react-helmet';

import { ReactComponent as Panel } from "../../assets/svgs/manager.svg";

import "./Login.css";

import { ReactComponent as Show } from "../../assets/svgs/visible.svg";
import { ReactComponent as Hide } from "../../assets/svgs/invisible.svg";

import { LoginUserFunction } from '../../functions/functions';

function Login() {
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

  // const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Funcion para limpiar todos los valores de los inputs del formulario del login
  function ClearLoginInputs() {
    setUserName("");
    setPassword("");
  }

  // Funcion para verificar si los valor ingresados a traves de los input son correctos
  function IsValid() {
    if (username === "") {
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar un usuario',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#username').focus(); }, 500);
      });
      return false
    } else if (password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar una contraseña',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }
      ).then(function () {
        setTimeout(function () { $('#password').focus(); }, 500);
      });
      return false
    }
    return true
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (IsValid() === true) {
      try {
        await LoginUserFunction(username, password);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso!',
          showConfirmButton: false,
          timer: 2000
        })
        ClearLoginInputs()
        navigate("/panel-de-administrador")
      } catch (err) {
        Swal.fire({
          title: 'Usuario o contraseña incorrecta',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        })
        // console.log(err)
        // console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
        // console.log(err.request);
        // console.log('Error', err.message);
        // console.log(err.config);
      }
    }
  }


  // console.log(fechaExpiracion)
  // console.log(fechaActual)

  // if(fechaExpiracion >= fechaActual){
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // }


  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'warning',
      title: 'Cerrando sesión',
      text: "Te estamos redirigiendo a la página de autenticación...",
      timer: 4500,
      timerProgressBar: true,
      showConfirmButton: false
    }).then(navigate('/login'));
  }

  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | Login</title>
      </Helmet>



      {token === null || token === "" ? (
        <div className="products-container">
          <div className="notfound-content">
            <h2 className="title-login">Iniciar sesión</h2>
            <div className="products-content">
              <div className="login-column">

                <form>

                  <div className="contact-field-email">
                    <input
                      className='contact-input'
                      type="text"
                      id='username'
                      value={username}
                      placeholder="Usuario"
                      name='username'
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />
                  </div>

                  <div className="login-field-subject">
                    <input
                      className='contact-input-psw'
                      type={showPassword ? "text" : "password"}
                      id='password'
                      value={password}
                      placeholder="Contraseña"
                      name='password'
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />

                    <div className='visibility' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Show className="show-btn" /> : <Hide className="hide-btn" />}
                    </div>
                  </div>

                  <div className="contact-send-button">
                    <button className='contact-button' onClick={handleLogin}>Acceder</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="products-container">
          <div className="notfound-content">
            <h2 className="title-login">Usted se encuentra logueado con el usuario: {(JSON.parse(atob(token.split('.')[1]))).unique_name[0]}</h2>

            <Link to="/panel-de-administrador" className='btn btn-dark category-btn'>
              <Panel className='category-svg' />
              <p className='category-title'>Dashboard</p>
            </Link>

            <button className='login-button' onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>)}
    </div>
  )
}

export default Login