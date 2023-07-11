import React from 'react';

import { Helmet } from 'react-helmet';

import "./NotFound.css";

import { ReactComponent as Warning } from "../../assets/svgs/warning.svg";

function NotFound() {
  return (
    <div>
      <Helmet>
        <title>Muebles Mayo | Error 404</title>
      </Helmet>
      <section id='notfound' className='notfound-container'>
        <div className="notfound-content">
          <div className='error-title'>
            <div className='warning'>
            <Warning />
            </div>
            <h2 className='error'>¡ERROR 404!</h2>
          </div>
          <h2 className="title-error">La página que busca no se ha encontrado.</h2>
          <p className='title-no'>Lamentamos las molestias.</p>
        </div>
      </section>
    </div>
  )
}

export default NotFound