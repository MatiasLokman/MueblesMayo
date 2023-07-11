import React from "react";
import "./Slider.css";
import leftArrow from "../../assets/svgs/left-arrow.svg";
import rightArrow from "../../assets/svgs/right-arrow.svg";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} alt="flecha" />
    </button>
  );
}
