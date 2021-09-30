import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";

export default function BuyerDashboard(props) {

    return(
        <div className="main">
            <BuyerSideNav/>
            <div className="container mt-3 dark-table-main">
                <header>
                    <br/>
                    <div className="container dark-table-container">
                        <br/>
                        <div className="row">
                            <div className="col-sm-3">
                                <div><i class="fa fa-user-circle-o" aria-hidden="true"></i></div>
                            </div>
                            <div className="col">
                                <h3 className="col" style={{color : 'white'}}>User Name</h3>
                            </div>
                        </div>
                        <div className="container dark-boots-table">
                            <div className="row">
                                <div className="col-md-3">
                                    <a href="/buyer-profile">
                                        <div className="card-counter conf">
                                            <i className="fa fa-user-circle-o"></i>
                                            <span className="count-name">Profile</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/profile">
                                        <div className="card-counter conf">
                                            <i className="fa fa-gift"></i>
                                            <div className="card-body"><span className="count-name">Orders</span></div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/profile">
                                        <div className="card-counter conf">
                                            <i className="fa fa-shopping-cart"></i>
                                            <div className="card-body"><span className="count-name">Cart</span></div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/profile">
                                        <div className="card-counter conf">
                                            <i className="fa fa-gift"></i>
                                            <div className="card-body"><span className="count-name">Wishlist</span></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}