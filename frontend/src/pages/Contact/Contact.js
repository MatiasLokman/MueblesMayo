import React from 'react'

import { Helmet } from 'react-helmet';

import "./Contact.css";

import { ReactComponent as Location } from "../../assets/svgs/location.svg";
import { ReactComponent as Envelope } from "../../assets/svgs/envelope.svg";
import { ReactComponent as Phone } from "../../assets/svgs/phone.svg";
import { ReactComponent as Times } from "../../assets/svgs/clock.svg";

import Form from '../../components/Form/Form';

function Contact() {

    return (
        <div>
            <Helmet>
                <title>Muebles Mayo | Contacto</title>
            </Helmet>
            <section id='contact' className='contact-container'>
                <div className="contact-content-cont">
                    <h2 className="title">Contacto</h2>
                    <div className="contact-content">


                        <div className="contact-column-right">
                            <div className="contact-row">
                                <a className='logo' href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                    <Location className='logo' />
                                </a>
                                <div className="contact-info">
                                    <a href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                        <div className="contact-head">Dirección</div>
                                    </a>
                                    <a href="https://www.google.es/maps/place/Muebles+Mayo/@-31.4116634,-64.1832646,17z/data=!3m1!4b1!4m5!3m4!1s0x94329877d8d98959:0xa32e37a712e5d67f!8m2!3d-31.411668!4d-64.1810759?hl=es" target="_blank" rel="noopener noreferrer">
                                        <div className="contact-sub-title">Catamarca 73, Córdoba, Argentina</div>
                                    </a>
                                </div>
                            </div>
                            <div className="contact-row">
                                <a href="mailto:mueblesmayocba@gmail.com" target="_blank" rel="noopener noreferrer"><Envelope className='logo' /></a>
                                <div className="contact-info">
                                    <a href="mailto:mueblesmayocba@gmail.com" target="_blank" rel="noopener noreferrer">
                                        <div className="contact-head">Email</div>
                                    </a>
                                    <a href="mailto:mueblesmayocba@gmail.com" target="_blank" rel="noopener noreferrer">
                                        <div className="contact-sub-title">mueblesmayocba@gmail.com</div>
                                    </a>
                                </div>
                            </div>
                            <div className="contact-row">
                                <a href="tel:03514212269"><Phone className='logo' /></a>
                                <div className="contact-info">
                                    <a href="tel:03514212269">
                                        <div className="contact-head">Télefono</div>
                                    </a>
                                    <a href="tel:03514212269">
                                        <div className="contact-sub-title">(0351) 4212269</div>
                                    </a>
                                </div>
                            </div>
                            <div className="contact-row clock">
                                <Times className='logo' />
                                <div className="contact-info">
                                    <div className="contact-head">Horario de atención</div>
                                    <div className="contact-sub-title"><span className='dias'>Lunes a viernes</span> de 09:30 a 13:30 hs <br />y de 14:30 a 18:00 hs.
                                        <br />
                                        <span className='dias'>Sábados</span> de 09:00 a 13:30 hs.</div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-column-right">
                            <Form />
                        </div>
                    </div>
                </div>
            </section >
        </div>
    )
}

export default Contact