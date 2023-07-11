import React from 'react';

import { Helmet } from 'react-helmet';

import "./DeliveryCosts.css";

import sillas from "../../assets/images/sillas.png";
import flete from "../../assets/images/flete.png";

function DeliveryCosts() {
  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | Tiempos y Costos de entrega</title>
      </Helmet>
      <section id='deliverycosts' className='deliverycosts-container'>
        <div className="deliverycosts-content">
          <div className="deliverycosts-column-left">
            <h2 className="title">Tiempos y costos de entrega</h2>
            <div className='columnas'>
              <div className='sub-columnas'>
                <h3 className="sub-title">Tiempo de preparación de un pedido</h3>
                <p className='p'>El tiempo de entrega es aproximado y se calcula en base a los tiempos de entrega de cada fabricante. Si el mueble ya se encuentra en nuestros locales y el cliente lo desea comprar en estado natural, el envío será inmediato. Si el cliente desea una terminación especifica del mueble (ya sea color, laqueado, lustrado o mueble a medida) el tiempo será de entre 2 y 5 días desde la confirmación del pago.</p>
              </div>
              <img className='deliverycosts-photo' src={sillas} alt="Transformacion" />
            </div>
            <div className='columnas'>
              <div className='sub-columnas'>
                <h3 className="sub-title">Costos y medios de envíos</h3>
                <p className='p'>Contamos con servicios de fletes de confianza para el envío de nuestros muebles a toda la ciudad y provincia de Córdoba y al resto del país. El costo del envío corre por cuenta del cliente.</p>
              </div>
              <img className='deliverycosts-photo' src={flete} alt="Flete" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DeliveryCosts