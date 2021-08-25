import React from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function SlideShow() {

    return (
            <div className="slide-container" style={{width : '700px'}}>
                <Slide>
                    <div className="each-slide">
                        <div className="slide-image1">
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="slide-image2">
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="slide-image3">
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="slide-image4">
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="slide-image5">
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="slide-image6">
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="slide-image7">
                        </div>
                    </div>
                </Slide>
            </div>
    )
}