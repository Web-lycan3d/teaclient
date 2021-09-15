import React from 'react'
import {Carousel} from 'react-responsive-carousel'

const ReactCarousel = ({img1 , img2 , img3}) => {
    return (
        <Carousel autoPlay>
            <div className="img-div">
                <img src={img1} alt="TeaInBox" />
            </div>
            <div className="img-div">
                <img src={img2} alt="TeaInBox" />
            </div>
            <div className="img-div">
                <img src={img3} alt="TeaInBox" />
            </div>
        </Carousel>
    )
}

export default ReactCarousel
