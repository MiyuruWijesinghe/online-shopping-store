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
                        <Link to={"/common-tracks"} className="nav-link" >Tracks</Link>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-keynotes"} className="nav-link" >Keynotes</Link>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-researches"} className="nav-link" >Researches</Link>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-workshops"} className="nav-link" >Workshops</Link>
                    </li>
                    <li className="nav-item dropdown nav-item-pad">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Registrations
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                            <div className="dropdown-divider"></div>
                            <Link to={"/register/ROLE_ATTENDEE"} className="dropdown-item d-item" >Conference</Link>
                            <div className="dropdown-divider"></div>
                            <Link to={"/register/ROLE_RESEARCHER"} className="dropdown-item d-item" >Research</Link>
                            <div className="dropdown-divider"></div>
                            <Link to={"/register/ROLE_WORKSHOP_CONDUCTOR"} className="dropdown-item d-item" >Workshop</Link>
                        </div>
                    </li>
                    <li className="nav-item nav-item-pad">
                        <Link to={"/common-news"} className="nav-link" >Latest News</Link>
                    </li>
                    <li className="nav-item dropdown nav-item-pad">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Downloads
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                            <div className="dropdown-divider"></div>
                            <Link to={"/research-downloads"} className="dropdown-item d-item" >Researches</Link>
                            <div className="dropdown-divider"></div>
                            <Link to={"/workshop-downloads"} className="dropdown-item d-item" >Workshops</Link>
                        </div>
                    </li>
                </div>
            </nav>
        </div>
    )
}