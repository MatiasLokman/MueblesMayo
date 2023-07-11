import React from 'react'

import "./LoaderCircle.css";

const loaderCircle = () => {
    return (
        <div className="loading-container-circle">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default loaderCircle