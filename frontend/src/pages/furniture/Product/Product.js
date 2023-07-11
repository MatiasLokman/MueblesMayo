import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Loader from '../../../components/Loaders/LoaderCircle';

import ReactImageMagnify from 'react-image-magnify';

import "./Product.css";

import { ReactComponent as NoProductSvg } from "../../../assets/svgs/noproducts.svg";
import { ReactComponent as Whatsapplogo } from "../../../assets/svgs/whatsapp.svg";

import { GetProductById } from '../../../functions/functions';

function Product() {
  const params = useParams()
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await GetProductById(params.id, setProduct);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Establece isLoading en false cuando se completa la carga del producto
      }
    })();
  }, [params.id]);

  if (isLoading === true) {
    return <div className='loading-single-furniture'><Loader /><p>Cargando mueble...</p></div>;
  }

  else if (product.nombre !== undefined) {
    return (
      <div>
        <Helmet>
          <title>Muebles Mayo | {product.nombre}</title>
        </Helmet>
        <section id='product' className='product-container'>
          <div className="product-content">

            <div className='product-all'>

              <div className='product-info'>
                <Link to='/muebles'>Muebles</Link>
                <p className='separator'> / </p>
                <Link to={`/muebles/categoria/${product.nombreCategoria}`}>{product.nombreCategoria}</Link>
                <p className='separator'> / </p>
                <Link to={`/muebles/tipo/${product.nombreTipo}`}>{product.nombreTipo}</Link>
                <p className='separator'> / </p>
                <p className='selected'>{product.nombre}</p>
              </div>

              <div className='info-photo'>
                <div className='product-left'>

                  <ReactImageMagnify className='magnify' {...{
                    smallImage: {
                      alt: 'Mueble',
                      width: 500,
                      height: 500,
                      src: product.urlImagen
                    },
                    largeImage: {
                      src: product.urlImagen,
                      width: 1700,
                      height: 1700
                    }
                  }} />

                  <ReactImageMagnify className='magnify2' {...{
                    smallImage: {
                      alt: 'Mueble',
                      width: 350,
                      height: 350,
                      src: product.urlImagen
                    },
                    largeImage: {
                      src: product.urlImagen,
                      width: 1800,
                      height: 1800
                    }
                  }} />

                  {/* <img className='product-image' src={product.urlImagen} alt="Mueble"></img> */}
                </div>

                <div className='product-right'>
                  <h2 className='product-title'>{product.nombre}</h2>
                  <div className='product'>
                    <p>
                      <Link to={`/muebles/material/${product.nombreMaterial}`}>{product.nombreMaterial}</Link>
                    </p>

                    {product.enDescuento === true ? (
                      <p>
                        <Link to={`/muebles/sale`}><span className='sale-tag'>SALE</span></Link>
                      </p>
                    ) : <></>}

                    <p className='p-medidas'>
                      Medidas:
                    </p>

                    <p className='p-medidas'>
                      {product.frente} m - Frente
                    </p>

                    <p className='p-medidas'>
                      {product.alto} m - Alto
                    </p>

                    <p>
                      {product.profundidad} m - Profundiad
                    </p>

                    <button className='product-wpp-btn'>
                      <a className='btn-wpp' href={`https://wa.me/5493512451516/?text=Hola%21%20Tengo%20una%20consulta%20sobre%20${product.nombre}, de ${product.nombreMaterial} y con medidas de Frente: ${product.frente} m, Alto: ${product.alto} m y Profundidad: ${product.profundidad} m. (${product.urlImagen})`} target="_blank" rel="noopener noreferrer">
                        <Whatsapplogo className='svg-wpp' />
                        Consultar por Whatsapp
                      </a>
                    </button>

                  </div>
                </div>
              </div>

            </div>



          </div>
        </section>
      </div>
    )
  } else {
    return (
      <div>
        <Helmet>
          <title>Muebles Mayo | Mueble no encontrado</title>
        </Helmet>
        <section id='products' className='products-container2'>
          <div className="products-content">
            <div className='product-svg'>
              <NoProductSvg />
            </div>
            <h2 className="title-no">No se ha encontrado el mueble que busca.</h2>
          </div>
        </section>
      </div>
    )
  }
}

export default Product
