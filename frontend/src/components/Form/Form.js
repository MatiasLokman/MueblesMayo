import React from 'react';

import emailjs from 'emailjs-com';

import "./Form.css";

function Form() {
    function sendEmail(e) {


        e.preventDefault();

        emailjs.sendForm(`${process.env.REACT_APP_SERVICE_ID}`, `${process.env.REACT_APP_TEMPLATE_ID}`, e.target, `${process.env.REACT_APP_PUBLIC_KEY}`)
            .then((result) => {
            }, (error) => {
            });
        e.target.reset();
    }

    return (
        <form className='form' onSubmit={sendEmail}>
            <div className="contact-fields">
                <div className="contact-field-name">
                    <input className='contact-input' type="text" placeholder="Nombre" name='name' required />
                </div>
                <div className="contact-field-phone">
                    <input className='contact-input' type="phone" placeholder="Télefono" name='phone' required />
                </div>
            </div>
            <div className="contact-field-email">
                <input className='contact-input' type="email" placeholder="Email" name='email' required />
            </div>
            <div className="contact-field-subject">
                <input className='contact-input' type="text" placeholder="Asunto" name='subject' required />
            </div>
            <div className="contact-field-textarea">
                <textarea className='contact-textarea' cols="30" rows="10" placeholder="Describir mensaje..." name='message' required></textarea>
            </div>
            <div className="contact-send-button">
                <button className='contact-button' type="submit">Enviar mensaje</button>
            </div>
        </form>
    )
}

export default Form;