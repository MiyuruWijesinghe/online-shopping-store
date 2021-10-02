import React, {useState, useEffect} from "react";
import axios from "axios";
import SellerSideNav from "../Navbar/SellerSideNav";

export default function SellerDashboard(props) {

    const [data, setData] = useState({
        totalItems: "",
        totalCategories: "",
        totalBrands: "",
        totalAdmins: "",
        totalSellers: "",
        totalBuyers: "",
        totalOrders: ""
    })

    useEffect(() => {
        getDashboard();
    }, [])

    function getDashboard() {
        axios.get("https://shopping-backend-api.herokuapp.com/dashboard/admin").then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="main">
            <SellerSideNav/>
            <div className="container mt-3 dark-table-main">
                <header>
                    <br/>
                    <div className="container dark-table-container">
                        <br/>
                        <h3 className="col-sm-3" style={{color : 'white'}}>Seller Dashboard</h3><br/>
                        <div className="container dark-boots-table">
                            <div className="row ">
                                <div className="col-md-3">
                                    <div className="card-counter conf">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span className="count-numbers"><h1>{data.totalItems}</h1></span>
                                        <span className="count-name">Items</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-counter conf-det">
                                        <i className="fa fa-th-list"></i>
                                        <span className="count-numbers"><h1>{data.totalCategories}</h1></span>
                                        <span className="count-name">Categories</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-counter tracks">
                                        <i className="fa fa-gift"></i>
                                        <span className="count-numbers"><h1>{data.totalBrands}</h1></span>
                                        <span className="count-name">Brands</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-counter browns">
                                        <i className="fa fa-handshake-o"></i>
                                        <span className="count-numbers"><h1>{data.totalSellers}</h1></span>
                                        <span className="count-name">Sellers</span>
                                    </div>
                                </div>
                            </div><br/>
                            <div className="row ">
                                <div className="col-md-3">
                                    <div className="card-counter buyers">
                                        <i className="fa fa-users"></i>
                                        <span className="count-numbers"><h1>{data.totalBuyers}</h1></span>
                                        <span className="count-name">Buyers</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-counter orders">
                                        <i className="fa fa-money"></i>
                                        <span className="count-numbers"><h1>{data.totalOrders}</h1></span>
                                        <span className="count-name">Orders</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-counter users">
                                        <i className="fa fa-users"></i>
                                        <span className="count-numbers"><h1>{data.totalAdmins}</h1></span>
                                        <span className="count-name">Admins</span>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-counter blacks">
                                        <i className="fa fa-sliders"></i>
                                        <span className="count-numbers"><h1>{data.totalAdmins}</h1></span>
                                        <span className="count-name">Roles</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
