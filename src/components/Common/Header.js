import { Link } from "react-router-dom";
import React from "react";

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
                <div className="navbar-nav">
                    <li className="nav-item nav-item-pad">
                        <Link to={"/"} className="nav-link" >Home</Link>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-categories"} className="nav-link" >Categories</Link>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-news"} className="nav-link" >Customer Care</Link>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-news"} className="nav-link" >About Us</Link>
                    </li>
                </div>
            </nav>
        </div>
    )
}