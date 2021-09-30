import React from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function ItemSlideShow(props) {

    return (
        <div className="slide-container" style={{width : '300px'}}>
            <Slide>
                <div className="each-slide">
                    <div style={{
                        backgroundImage: `url(${props.itemImage1})`,
                        height: '400px',
                        width: '300px',
                        backgroundSize: 'cover'}}>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{
                        backgroundImage: `url(${props.itemImage2})`,
                        height: '400px',
                        width: '300px',
                        backgroundSize: 'cover'}}>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{
                        backgroundImage: `url(${props.itemImage3})`,
                        height: '400px',
                        width: '300px',
                        backgroundSize: 'cover'}}>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{
                        backgroundImage: `url(${props.itemImage4})`,
                        height: '400px',
                        width: '300px',
                        backgroundSize: 'cover'}}>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{
                        backgroundImage: `url(${props.itemImage5})`,
                        height: '400px',
                        width: '300px',
                        backgroundSize: 'cover'}}>
                    </div>
                </div>
            </Slide>
        </div>
    )
}
