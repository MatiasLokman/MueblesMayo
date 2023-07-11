import React from "react";

import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import "./Home.css";

import photo from "../../assets/images/photo.jpg";
import logos from "../../assets/images/logos.png";

import { ReactComponent as Payments } from "../../assets/svgs/payments.svg";
import { ReactComponent as Shops } from "../../assets/svgs/shops.svg";
import { ReactComponent as Flete } from "../../assets/svgs/flete.svg";

import Slider from '../../components/Slider/Slider';

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Muebles Mayo | Muebles y Decoración</title>
            </Helmet>
            <section id='home' className='home-container'>
                <div className='home-content'>
                    <div className='home-1'>
                        <div className='home-left'>
                            <h1 className='title'>Mueblería en Córdoba</h1>
                            <p className='text-2'>Somos Muebles Mayo, una empresa comercializadora de reconocida tradición y solidez. Ofrecemos soluciones innovadoras para el amoblamiento de tu hogar con altos estándares de calidad, servicio y respaldo.
                                <br />
                                <br />Tenemos un amplio catálogo de muebles para el hogar y para oficinas, elaborados con materiales de óptima calidad. Garantizamos a nuestros clientes un trabajo serio, profesional y responsable.
                                <br />
                                <br />Visítanos en Córdoba.
                            </p>
                        </div>
                        <div className='home-right'>
                            <img className='home-photo' src={photo} alt="Mapa Muebles Mayo" />
                            <img className='home-photo-logo' src={logos} alt="Mapa Muebles Mayo" />
                        </div>
                    </div>

                    <div className='home-2'>
                        <div className="feature">
                            <div className="icons">
                                <Flete />
                            </div>
                            <div className="feature-texts">
                                <p className="feature-title">ENVÍOS A TODO EL PAÍS</p>
                                <p className="feature-text">Enviamos el pedido a tu hogar</p>
                            </div>
                        </div>
                        <p className="separador-home"></p>
                        <div className="feature">
                            <div className="icons">
                                <Shops />
                            </div>
                            <div className="feature-texts">
                                <p className="feature-title">RETIRO EN TIENDAS</p>
                                <p className="feature-text">Visita nuestras sucursales</p>
                            </div>
                        </div>
                        <p className="separador-home"></p>
                        <div className="feature">
                            <div className="icons">
                                <Payments />
                            </div>
                            <div className="feature-texts">
                                <p className="feature-title">TARJETAS O EFECTIVO</p>
                                <p className="feature-text">Averigua tu mejor opción</p>
                            </div>
                        </div>
                    </div>

                    <div className='home-3'>
                        <Slider />
                    </div>

                    <div className='home-4'>
                        <h1 className='title categories-title'>Encontra los muebles que buscas</h1>
                        <div className="categorias-container">
                            <Link to="/muebles/categoria/Cocina" className="categoria-container cocina">
                                <div className="hover-category">
                                    <p className="categoria-title">Cocina</p>
                                </div>
                            </Link>

                            <Link to="/muebles/categoria/Comedor" className="categoria-container comedor">
                                <div className="hover-category">
                                    <p className="categoria-title">Comedor</p>
                                </div>
                            </Link>

                            <Link to="/muebles/categoria/Dormitorio" className="categoria-container dormitorio">
                                <div className="hover-category">
                                    <p className="categoria-title">Dormitorio</p>
                                </div>
                            </Link>

                            <Link to="/muebles/categoria/Infantil" className="categoria-container infantil">
                                <div className="hover-category">
                                    <p className="categoria-title">Infantil</p>
                                </div>
                            </Link>

                            <Link to="/muebles/categoria/Living" className="categoria-container living">
                                <div className="hover-category">
                                    <p className="categoria-title">Living</p>
                                </div>
                            </Link>

                            <Link to="/muebles/categoria/Oficina" className="categoria-container oficina">
                                <div className="hover-category">
                                    <p className="categoria-title">Oficina</p>
                                </div>
                            </Link>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Home