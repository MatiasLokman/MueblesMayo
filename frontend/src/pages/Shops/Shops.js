import React from "react";

import { Helmet } from 'react-helmet';

import "./Shops.css";

import mueblesmayo from "../../assets/images/logo.png";
import decohouse from "../../assets/images/logodeco.png";

import { ReactComponent as Location } from "../../assets/svgs/location.svg";
import { ReactComponent as City } from "../../assets/svgs/city.svg";
import { ReactComponent as Envelope } from "../../assets/svgs/envelope.svg";
import { ReactComponent as Phone } from "../../assets/svgs/phone.svg";
import { ReactComponent as Times } from "../../assets/svgs/clock.svg";

function Shops() {

    return (
        <div>
            <Helmet>
                <title>Muebles Mayo | Locales</title>
            </Helmet>
            <section id='shops' className='shops-container'>
                <div className="shops-content">
                    <div className="shops-column-left-shop">
                        <iframe className="mapa" title="mapa" src="https://www.google.com/maps/d/embed?mid=1Gf7nYsA_V-Dp-zZMdIMy0B1-A1rQcao&ehbc=2E312F"></iframe>
                    </div>

                    <div className="shops-column-right-shop">
                        <div className='columnas-shop'>
                            <div className='sub-columnas-shop'>
                                <img className='shops-photo' src={mueblesmayo} alt="Logo Muebles Mayo" />
                                <div className="shops-info-column-right">
                                    <div className="shops-info-row">
                                        <a className='logo' href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                            <Location className='logo' />
                                        </a>
                                        <div className="shops-info-info">
                                            <a href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-head">Dirección</div>
                                            </a>
                                            <a href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-sub-title">Catamarca 73</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row">
                                        <a className='logo' href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                            <City className='logo' />
                                        </a>
                                        <div className="shops-info-info">
                                            <a href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-head">Ciudad</div>
                                            </a>
                                            <a href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-sub-title">Córdoba Capital</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row">
                                        <a href="mailto:mueblesmayocba@gmail.com" target="_blank" rel="noopener noreferrer"><Envelope className='logo' /></a>
                                        <div className="shops-info-info">
                                            <a href="mailto:mueblesmayocba@gmail.com" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-head">Email</div>
                                            </a>
                                            <a href="mailto:mueblesmayocba@gmail.com" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-sub-title">mueblesmayocba@gmail.com</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row">
                                        <a href="tel:03514212269"><Phone className='logo' /></a>
                                        <div className="shops-info-info">
                                            <a href="tel:03514212269">
                                                <div className="shops-info-head">Télefono</div>
                                            </a>
                                            <a href="tel:03514212269">
                                                <div className="shops-info-sub-title">(0351) 4212269</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row clock">
                                        <Times className='logo' />
                                        <div className="shops-info-info">
                                            <div className="shops-info-head">Horario de atención</div>
                                            <div className="shops-info-sub-title"><span className='dias'>Lunes a viernes</span> de 09:30 a 13:30 hs <br />y de 14:30 a 18:00 hs.
                                                <br />
                                                <span className='dias'>Sábados</span> de 09:00 a 13:30 hs.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mapa-individual-div">
                                <iframe className="mapa-individual" title="Mapa Muebles Mayo" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0897872369687!2d-64.18328918433373!3d-31.41165220316723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329877d8d98959%3A0xa32e37a712e5d67f!2sMuebles%20Mayo!5e0!3m2!1ses-419!2sar!4v1669756499147!5m2!1ses-419!2sar" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>

                        <div className='columnas-shop'>
                            <div className='sub-columnas-shop'>
                                <img className='shops-photo' src={decohouse} alt="Logo Deco House" />
                                <div className="shops-info-column-right">
                                    <div className="shops-info-row">
                                        <a className='logo' href="https://www.google.com.ar/maps/place/Deco+House/@-31.4124013,-64.185582,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a29d6ff01c31:0x102a4398d82b8dbd!8m2!3d-31.4123985!4d-64.1811176" target="_blank" rel="noopener noreferrer">
                                            <Location className='logo' />
                                        </a>
                                        <div className="shops-info-info">
                                            <a href="https://www.google.com.ar/maps/place/Deco+House/@-31.4124013,-64.185582,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a29d6ff01c31:0x102a4398d82b8dbd!8m2!3d-31.4123985!4d-64.1811176" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-head">Dirección</div>
                                            </a>
                                            <a href="https://www.google.com.ar/maps/place/Deco+House/@-31.4124013,-64.185582,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a29d6ff01c31:0x102a4398d82b8dbd!8m2!3d-31.4123985!4d-64.1811176" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-sub-title">Rivadavia 353</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row">
                                        <a className='logo' href="https://www.google.com.ar/maps/place/Deco+House/@-31.4124013,-64.185582,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a29d6ff01c31:0x102a4398d82b8dbd!8m2!3d-31.4123985!4d-64.1811176" target="_blank" rel="noopener noreferrer">
                                            <City className='logo' />
                                        </a>
                                        <div className="shops-info-info">
                                            <a href="https://www.google.com.ar/maps/place/Deco+House/@-31.4124013,-64.185582,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a29d6ff01c31:0x102a4398d82b8dbd!8m2!3d-31.4123985!4d-64.1811176" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-head">Ciudad</div>
                                            </a>
                                            <a href="https://www.google.com.ar/maps/place/Deco+House/@-31.4124013,-64.185582,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a29d6ff01c31:0x102a4398d82b8dbd!8m2!3d-31.4123985!4d-64.1811176" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-sub-title">Córdoba Capital</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row">
                                        <a href="mailto:decohousecba@gmail.com" target="_blank" rel="noopener noreferrer"><Envelope className='logo' /></a>
                                        <div className="shops-info-info">
                                            <a href="mailto:decohousecba@gmail.com" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-head">Email</div>
                                            </a>
                                            <a href="mailto:decohousecba@gmail.com" target="_blank" rel="noopener noreferrer">
                                                <div className="shops-info-sub-title">decohousecba@gmail.com</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row">
                                        <a href="tel:03514251655"><Phone className='logo' /></a>
                                        <div className="shops-info-info">
                                            <a href="tel:03514251655">
                                                <div className="shops-info-head">Télefono</div>
                                            </a>
                                            <a href="tel:03514251655">
                                                <div className="shops-info-sub-title">(0351) 4251655</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="shops-info-row clock">
                                        <Times className='logo' />
                                        <div className="shops-info-info">
                                            <div className="shops-info-head">Horario de atención</div>
                                            <div className="shops-info-sub-title"><span className='dias'>Lunes a viernes</span> de 09:30 a 13:30 hs <br />y de 14:30 a 18:00 hs.
                                                <br />
                                                <span className='dias'>Sábados</span> de 09:00 a 13:30 hs.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mapa-individual-div">
                                <iframe className="mapa-individual" title="Mapa Deco House" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0625963520993!2d-64.18328598433375!3d-31.412401403203443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a29d6ff01c31%3A0x102a4398d82b8dbd!2sDeco%20House!5e0!3m2!1ses-419!2sar!4v1669757002147!5m2!1ses-419!2sar" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shops