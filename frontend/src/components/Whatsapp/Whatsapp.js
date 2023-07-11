import React from 'react';

import "../Whatsapp/Whatsapp.css";

import { ReactComponent as Whatsapplogo } from "../../assets/svgs/whatsapp.svg";

function WhatsApp() {

    return (
      <a href="https://wa.me/5493512451516" target="_blank" rel="noreferrer" className="js-btn-fixed-bottom btn-whatsapp"
      aria-label="Comunicate por WhatsApp"> <Whatsapplogo />
       </a>
    )
}

export default WhatsApp;

