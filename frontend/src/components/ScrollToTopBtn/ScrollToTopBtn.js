import React from 'react';
import { useEffect, useState } from 'react';

import "./ScrollToTopBtn.css";

import { ReactComponent as Scrolluparrow } from "../../assets/svgs/scrolltotop.svg";

function ScrollToTopBtn() {

    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        (<>
            {(
                <button className={backToTopButton ? "scrolltotop-btn-0  scrolltotop-btn" : "scrolltotop-btn-0"} onClick={scrollUp} aria-label="Scroll up">
                    <Scrolluparrow className='scroll-svg' />
                </button>
            )}</>)
    )
}

export default ScrollToTopBtn;