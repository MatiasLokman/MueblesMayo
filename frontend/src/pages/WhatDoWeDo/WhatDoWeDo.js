import React from "react";

import { Helmet } from 'react-helmet';

import "./WhatDoWeDo.css";

import RotatingTextP from '../../components/RotatingTextP/RotatingTextP';

import whatdowedo from "../../assets/images/whatdowedo.png";

function WhatDoWeDo() {
    return (
        <div>
            <Helmet>
                <title>Muebles Mayo | Qué Hacemos</title>
            </Helmet>
            <section id='whatdowedo' className='whatdowedo-container'>
                <div className="whatdowedo-content">
                    <div className="whatdowedo-column-left">
                        <h2 className="title">Fabricación de muebles en Córdoba</h2>
                        <h3 className="sub-title">Qué hacemos</h3>
                        <p className='p'>En Muebles Mayo nos mantenemos siempre a la vanguardia en fabricación de muebles, creando nuevas líneas de muebles que satisfagan aún más tus gustos y necesidades.
                            <br />
                            <br />
                            Somos especialistas en:
                            <br />
                            <br />
                            <RotatingTextP />
                            <br />
                            Contamos con profesionales altamente calificados y especialmente seleccionados.
                            <br />
                            <br />
                            ¡Esperamos tu visita!
                        </p>
                    </div>
                    <div className="whatdowedo-column-right">
                        <img className='whatdowedo-photo' src={whatdowedo} alt="Qué Hacemos" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WhatDoWeDo