import {Link} from "react-router-dom";
import React from "react";

export default function Footer() {
    return(
        <div className="container-fluid justify-content-center px-0 ">
            <footer>
                <div className="row justify-content-around mb-0 pt-5 mx-4">
                    <div className="col-xl-2 col-md-4 order-xl-1 order-4 mr-xl-0 my-auto">
                        <ul className="list-unstyled mt-md-3 mt-5">
                            <li className="footer-li">Find us on</li>
                            <li className="social footer-li"> <span> <i className="fa fa-facebook" aria-hidden="true" /></span> <span> <i className="fa fa-instagram" aria-hidden="true" /> </span> <span> <i className="fa fa-twitter" aria-hidden="true" /> </span> </li>
                        </ul>
                        <ul className="list-unstyled my-xl-4 my-md-3">
                            <li className="footer-li">Copyright</li>
                            <li className="footer-li">Ⓒ Group 2021S1_REG_WE_4</li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-md-3 pt-4 order-1">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4 footer-li">About Us</li>
                            <li className="footer-li">3rd Year SE Students </li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-md-3 pt-4 order-2">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4 footer-li">Contact Us</li>
                            <li className="footer-li">johndoe@gmail.com </li>
                        </ul>
                    </div>
                    <div className="col-xl-auto col-md-3 pt-4 my-sm-0 order-md-3 order-sm-1 ">
                        <ul className="list-unstyled">
                            <li className="mt-md-0 mt-4 footer-li">Admin Contact</li>
                            <li className="footer-li">0112729729</li>
                            <li className="footer-li">+947032163</li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center px-3 py-3 pt-5">
                    <div className="col text-center">
                        <p className="mb-0">This site is developed for SPM Group Project</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}