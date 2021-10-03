import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideNav from "../Navbar/AdminSideNav";
import PaymentHistoryReport from "../Reports/PaymentHistory"
import ItemsReport from "../Reports/ItemsReport"

export default function AdminDashboard(props) {

    const [data, setData] = useState({})

    // useEffect(() => {
    //     getDashboard();
    // }, [])

    function getPaymentHistory() {
        axios.get("https://shopping-backend-api.herokuapp.com/payment/all").then((res) => {
            //setData(res.data);
            PaymentHistoryReport(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function getItems() {
        axios.get("https://shopping-backend-api.herokuapp.com/item/all").then((res) => {
            ItemsReport(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div className="main">
            <AdminSideNav />
            <div className="container mt-3 dark-table-main">
                <header>
                    <br />
                    <div className="container dark-table-container">
                        <br />
                        <h3 className="col-sm-3" style={{ color: 'white' }}>Reports</h3><br />
                        <div className="container dark-boots-table">
                            <div className="row ">
                                <div className="col-md-4">
                                    <div className="card-count conf">
                                        <span className="count-name">Payment History</span>
                                        <center>
                                            <button onClick={() => getPaymentHistory()} className="btn btn-primary">Generate Report</button>
                                        </center>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card-count conf">
                                        <span className="count-name">All Items Report</span>
                                        <center>
                                            <button onClick={() => getItems()} className="btn btn-success">Generate Report</button>
                                        </center>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card-count conf">
                                        <span className="count-name"></span>
                                        <center>
                                            <button className="btn btn-danger">Generate Report</button>
                                        </center>
                                    </div>
                                </div>


                            </div><br />
                            <div className="row ">
                                <div className="col-md-4">
                                    <div className="card-count conf">
                                        <span className="count-name"></span>
                                        <center>
                                            <button className="btn btn-warning">Generate Report</button>
                                        </center>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card-count conf">
                                        <span className="count-name"></span>
                                        <center>
                                            <button className="btn btn-info">Generate Report</button>
                                        </center>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card-count conf">
                                        <span className="count-name"></span>
                                        <center>
                                            <button className="btn btn-secondary">Generate Report</button>
                                        </center>
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