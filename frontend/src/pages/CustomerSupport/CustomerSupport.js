import React from 'react'

import { Helmet } from 'react-helmet';

import "./CustomerSupport.css";

import Form from '../../components/Form/Form';

function Contact() {

    return (
        <div>
            <Helmet>
                <title>Muebles Mayo | Atención al Cliente</title>
            </Helmet>
            <section id='customer' className='customer-container'>
                <div className="customer-content">
                    <h2 className="title">Atención al cliente</h2>

                    {/* <div className="customer-content"> */}

                    <div className="customer-column-right">
                        <p>Utilice el siguiente formulario para preguntas referidas a un pedido, para solicitar información sobre nuestros muebles o para cualquier duda o comentarios que quiera hacernos llegar.<br /> Nos pondremos en contacto a la brevedad.</p>
                        <Form />
                    </div>
                    {/* </div> */}
                </div>
            </section >
        </div>
    )
}

export default Contact