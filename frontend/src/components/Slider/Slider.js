import React, { useEffect, useState } from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'

export default function Slider() {


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    });

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === dataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <>
            <div className="container-slider">
                {dataSlider.map((obj, index) => {
                    return (
                        <div
                            key={index}
                            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        >
                            <img
                                src={process.env.PUBLIC_URL + `/Images/img${index + 1}.jpg`}
                                alt="Imagenes" />
                        </div>
                    )
                })}
                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"} />

                <div className="container-dots">
                    {Array.from({ length: 5 }).map((item, index) => (
                        <div
                            key={index}
                            onClick={() => moveDot(index + 1)}
                            className={slideIndex === index + 1 ? "dot active" : "dot"}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="container-slider2">
                {dataSlider.map((obj, index) => {
                    return (
                        <div
                            key={index}
                            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        >
                            <img
                                src={process.env.PUBLIC_URL + `/Images/imgres${index + 1}.jpg`}
                                alt="Imagenes" />
                        </div>
                    )
                })}
                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"} />

                <div className="container-dots">
                    {Array.from({ length: 5 }).map((item, index) => (
                        <div
                            key={index}
                            onClick={() => moveDot(index + 1)}
                            className={slideIndex === index + 1 ? "dot active" : "dot"}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    )
}
