import React from 'react'
import ReactCarousel from './react-carousel.coponent'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './main-component.styles.scss'

const MainComponent = () => {
    return (
        <div className="single-left-img">
            <ReactCarousel />
        </div>
    )
}

export default MainComponent
