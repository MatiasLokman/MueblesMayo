import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { GetTypes, GetCategories, GetMaterials } from '../../functions/functions';

import "./Header.css";

import logo from "../../assets/images/logo.png";

import { ReactComponent as Menu } from "../../assets/svgs/menu.svg";
import { ReactComponent as Close } from "../../assets/svgs/close.svg";
import { ReactComponent as Login } from "../../assets/svgs/user.svg";

function Header() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const [color, setColor] = useState(false);
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

    window.addEventListener("scroll", changeColor);

    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        (async () => [await GetTypes(setTypes), GetCategories(setCategories), GetMaterials(setMaterials)])();
    }, []);

    return (

        <nav className={color ? "header-nav header-nav-bg" : "header-nav"}>
            <Link to="/" className={color ? "header-a-logo  header-a-logo-bg " : "header-a-logo"}>
                <img className={color ? "header-logo  header-logo-bg " : "header-logo"} width={140} src={logo} alt="logo" /></Link>
            <div className={click ? "header-menu active" : "header-menu"}>
                <ul className={color ? "header-menu-container header-menu-container-bg" : "header-menu-container"}>
                    <li className='navbar-li'><NavLink to="/" onClick={handleClick} aria-label="Inicio" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ color: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '0px 10px' : '', borderRadius: isActive ? '50px' : '' })}>Inicio</NavLink></li>
                    <li className='navbar-li'><NavLink to="/empresa" onClick={handleClick} aria-label="Empresa" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ color: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '0px 10px' : '', borderRadius: isActive ? '50px' : '' })}>Empresa</NavLink></li>
                    <li className='navbar-li'><NavLink to="/que-hacemos" onClick={handleClick} aria-label="Qué Hacemos" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ color: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '0px 10px' : '', borderRadius: isActive ? '50px' : '' })}>Qué Hacemos</NavLink></li>

                    <li className='navbar-li'>
                        <div className="dropdown">
                            <NavLink to="/muebles" onClick={handleClick} aria-label="Muebles" aria-expanded="false" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ color: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '0px 10px' : '', borderRadius: isActive ? '50px' : '' })}>Muebles</NavLink>
                            <ul className="dropdown-menu">

                                <li>
                                    <p className="dropdown-item no-pointer">Tipos de Mueble &raquo;</p>
                                    <ul className='dropdown-menu submenu'>
                                        {types?.map((type, index) => {
                                            return (
                                                <Link to={`/muebles/tipo/${type.nombre}`} onClick={handleClick} aria-label="Tipos de mueble" className="dropdown-item-type" key={index}>
                                                    <p className="dropdown-item">{type.nombre}</p>
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </li>


                                <li>
                                    <p className="dropdown-item no-pointer">Categorías &raquo;</p>
                                    <ul className='dropdown-menu submenu2'>
                                        {categories?.map((category, index) => {
                                            return (
                                                <Link to={`/muebles/categoria/${category.nombre}`} onClick={handleClick} aria-label="Categorías" className="dropdown-item-type" key={index}>
                                                    <p className="dropdown-item">{category.nombre}</p>
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </li>

                                <li>
                                    <p className="dropdown-item no-pointer">Materiales &raquo;</p>
                                    <ul className='dropdown-menu submenu3'>
                                        {materials?.map((material, index) => {
                                            return (
                                                <Link to={`/muebles/material/${material.nombre}`} onClick={handleClick} aria-label="Materiales" className="dropdown-item-type" key={index}>
                                                    <p className="dropdown-item">{material.nombre}</p>
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </li>

                                <li>
                                    <Link to={`/muebles/sale`} onClick={handleClick} aria-label="SALE" className="dropdown-item-type">
                                        <p className="dropdown-item sale">SALE</p>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    <li className='navbar-li'><NavLink to="/locales" onClick={handleClick} aria-label="Locales" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ color: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '0px 10px' : '', borderRadius: isActive ? '50px' : '' })}>Locales</NavLink></li>
                    <li className='navbar-li'><NavLink to="/contacto" onClick={handleClick} aria-label="Contacto" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ color: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '0px 10px' : '', borderRadius: isActive ? '50px' : '' })}>Contacto</NavLink></li>
                    <li className='navbar-li'><NavLink to="/login" onClick={handleClick} aria-label="Login" className={color ? "header-menu-btn header-menu-btn-bg" : "header-menu-btn"} style={({ isActive }) => ({ fill: isActive ? '#ffffff' : '', backgroundColor: isActive ? '#633E1B' : '', padding: isActive ? '5px 5px' : '', borderRadius: isActive ? '50px' : '' })}><Login className='login-logo' /></NavLink></li>
                </ul>
            </div>


            <div className="header-burger-menu-container" onClick={handleClick}>
                {click ? (<Close className={color ? "header-close-menu header-close-menu-bg" : "header-close-menu"} />) : (<Menu className={color ? "header-burger-menu header-burger-menu-bg" : "header-burger-menu"} />)}
            </div>

        </nav >
    )
}

export default Header