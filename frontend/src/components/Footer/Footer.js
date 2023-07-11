import React from 'react';
import { Link } from 'react-router-dom';

import "./Footer.css";

import Visa from "../../assets/images/visa.png";
import Mastercard from "../../assets/images/mastercard.png";
import Amex from "../../assets/images/amex.png";
import Cabal from "../../assets/images/cabal.png";
import Naranja from "../../assets/images/naranja.png";
import Maestro from "../../assets/images/maestro.png";
import VisaDebito from "../../assets/images/visadebito.png";
import MastercardDebito from "../../assets/images/mastercarddebit.png";
import Cordobesa from "../../assets/images/cordobesa.png";
import Argencard from "../../assets/images/argencard.png";
import Nativa from "../../assets/images/nativa.png";
import Sol from "../../assets/images/sol.png";
import Doncredito from "../../assets/images/doncredito.png";

import Facebook from "../../assets/images/facebook.png";
import Instagram from "../../assets/images/instagram.png";

let today = new Date();
let year = today.getFullYear();

function Footer() {

    return (
        <footer className='footer'>
            <div className="footer-content">

                <div className="footer-content-section-global">
                    <div className="footer-pagos">
                        <p className="formas-pago">FORMAS DE PAGO</p>
                        <div className="footer-content-pagos">
                            <img src={Visa} alt="Visa" width={50} className="footer-fotos" />
                            <img src={Mastercard} alt="Mastercard" width={50} className="footer-fotos" />
                            <img src={Amex} alt="American Express" width={50} className="footer-fotos" />
                            <img src={Cabal} alt="Cabal" width={50} className="footer-fotos" />
                            <img src={Naranja} alt="Naranja X" width={50} className="footer-fotos" />
                            <img src={Maestro} alt="Maestro" width={50} className="footer-fotos" />
                            <img src={VisaDebito} alt="Visa Debito" width={50} className="footer-fotos" />
                            <img src={MastercardDebito} alt="Mastercard Debito" width={50} className="footer-fotos" />
                            <img src={Cordobesa} alt="Cordobesa" width={50} className="footer-fotos" />
                            <img src={Argencard} alt="Argencard" width={50} className="footer-fotos" />
                            <img src={Nativa} alt="Nativa" width={50} className="footer-fotos" />
                            <img src={Sol} alt="Sol" width={50} className="footer-fotos" />
                            <img src={Doncredito} alt="Don Credito" width={50} className="footer-fotos" />
                        </div>
                    </div>

                    <p className="separador"></p>

                    <div className="footer-content-section">
                        <p className="footer-content-section-info">La venta de cualquiera de los muebles publicados está sujeta a la verificación de stock. Las imágenes publicadas son a modo ilustrativo.</p>
                    </div>

                    <p className="separador"></p>

                    <div className="footer-content-section">
                        <div className="footer-content-section-left">
                            <div className='social-media'>
                                <div className="footer-content-section-left-social">
                                    <a href="https://www.facebook.com/mayomuebles" target="_blank" rel="noopener noreferrer"><img src={Facebook} alt="Facebook" className="social-photo" /></a>
                                    <p className='social-title facebook'><a className='social-title' href="https://www.facebook.com/mayomuebles" target="_blank" rel="noopener noreferrer">Muebles Mayo</a></p>
                                </div>
                                <div className="footer-content-section-left-social">
                                    <a className='social-title' href="https://www.instagram.com/mueblesmayo/?hl=es" target="_blank" rel="noopener noreferrer"><img src={Instagram} alt="Instagram" className="social-photo" /></a>
                                    <p className='social-title instagram'><a className='social-title' href="https://www.instagram.com/mueblesmayo/?hl=es" target="_blank" rel="noopener noreferrer">mueblesmayo</a></p>
                                </div>
                            </div>
                            <div className='footer-nores'>
                                <p className='info-text'><a className='address' href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                    Catamarca 73, Córdoba, Argentina</a> -  <a className='address' href="tel:03514212269">(0351) 421 2269</a></p>
                            </div>
                            <div className='footer-res'>
                                <p className='info-text'><a className='address' href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                    Catamarca 73, Córdoba, Argentina</a></p>
                                <p className='info-text'><a className='address' href="tel:03514212269">(0351) 421 2269</a></p>
                            </div>
                        </div>
                        <div className="footer-content-section-right">
                            <div className="footer-content-section-right-top">
                                <Link className='footer-href-page' to="/atencion-al-cliente/">Atención al Cliente</Link>
                                <Link className='footer-href-page' to="/locales">Nuestros locales</Link>
                                <Link className='footer-href-page' to="/tiempos-y-costos-de-entrega">Tiempos y Costos de entrega</Link>
                            </div>
                            <p className="separador"></p>
                            <p className='footer-text'>Copyright <Link className='footer-href' to="/">Muebles Mayo</Link> | © {year} Todos los derechos reservados.</p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer