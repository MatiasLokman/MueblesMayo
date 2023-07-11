import React from 'react';

import { Helmet } from 'react-helmet';

import "./Business.css";

import business from "../../assets/images/business.png";

function Business() {
  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | Empresa</title>
      </Helmet>
      <section id='business' className='business-container'>
        <div className="business-content">
          <div className="business-column-left">
            <h2 className="title">Comercializadora de muebles en Córdoba</h2>
            <h3 className="sub-title">Empresa</h3>
            <p className='p'>En Muebles Mayo ofrecemos a nuestros clientes y visitantes una atención profesional, cálida y adecuada a sus necesidades. Trabajamos a diario para lograr su satisfacción y mantenernos como la primera opción en el rubro.
              <br />
              <br />
              En nuestra empresa encontrará todo tipo de muebles, desde hogareños hasta muebles de oficina, fabricados por profesionales con materiales de la mejor calidad.
              <br />
              <br />
              Somos una empresa ampliamente reconocida en la zona y un referente importante en muebles.
            </p>
          </div>
          <div className="business-column-right">
            <img className='business-photo' src={business} alt="Empresa" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Business