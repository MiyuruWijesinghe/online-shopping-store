import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import "../../styles/payment.css";
import AuthService from "../../services/auth.service";
import Invoice from "../Reports/Invoice";

export default function Payment(props) {

    const [orderRefCode, setOrderRefCode] = useState("REF0001");
    const [cardNumber, setCardNumber] = useState("");
    const [cvCode, setCvCode] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [amount, setAmount] = useState("50000.00");
    const [cartItemList, setCartItemList] = useState([]);

    function generateInvoice() {
        if (cartItemList.length === 0) {
            alert('There are no items to generate invoice.');
        } else {
            Invoice(cartItemList);
        }
    }

    useEffect(() => {
        getCartItems();
    }, [])

    function getCartItems() {
        const user = AuthService.getCurrentUser();
        let uname = "user";
        if (user != null) {
            uname = user.username;
        }
        axios.get("https://shopping-backend-api.herokuapp.com/cart/username/" + uname).then((res) => {
            console.log(res.data);
            setCartItemList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            orderRefCode,
            cardNumber,
            cvCode,
            year,
            month,
            amount
        }
        axios.post("https://shopping-backend-api.herokuapp.com/payment/pay", dataObject, { headers: authHeader() }).then((res) => {
            console.log(dataObject);
            alert(res.data.message + " " + res.data.refrenceNo);
            generateInvoice();
            props.history.push("/");
        }).catch((err) => {
            if (err.response.data.orderRefCode !== undefined) {
                alert(err.response.data.orderRefCode);
            } else if (err.response.data.cardNumber !== undefined) {
                alert(err.response.data.cardNumber);
            } else if (err.response.data.cvCode !== undefined) {
                alert(err.response.data.cvCode);
            } else if (err.response.data.year !== undefined) {
                alert(err.response.data.year);
            } else if (err.response.data.month !== undefined) {
                alert(err.response.data.month);
            } else if (err.response.data.amount !== undefined) {
                alert(err.response.data.amount);
            } else if (err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    return (
        <div className="main">
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-right"> <i className="fa fa-close close" data-dismiss="modal" /> </div>
                            <div className="tabs mt-3">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation"> <a className="nav-link active" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="true"> <img src="https://i.imgur.com/sB4jftM.png" width={80} /> </a> </li>
                                    <li className="nav-item" role="presentation"> <a className="nav-link" id="paypal-tab" data-toggle="tab" href="#paypal" role="tab" aria-controls="paypal" aria-selected="false"> <img src="https://i.imgur.com/yK7EDD1.png" width={80} /> </a> </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="visa" role="tabpanel" aria-labelledby="visa-tab">
                                        <div className="mt-4 mx-4">
                                            <div className="text-center">
                                                <h5>Credit Card</h5>
                                            </div>
                                            <div className="form mt-3">
                                                <div className="inputbox"> <input type="text" name="name" className="form-control" required="required" /> <span>Cardholder Name</span> </div>
                                                <div className="inputbox"> <input type="text" id="cardNumber" onChange={(e) => setCardNumber(e.target.value)} name="name" min={16} max={16} className="form-control" required="required" /> <span>Card Number</span>  </div>
                                                <div className="d-flex flex-row">
                                                    <div className="inputbox"> <input type="text" onChange={(e) => setYear(e.target.value)} name="name" min={4} max={4} className="form-control" required="required" /> <span>Ex Year</span> </div>
                                                    <div className="inputbox"> <input type="text" onChange={(e) => setMonth(e.target.value)} name="name" min={2} max={2} className="form-control" required="required" /> <span>Ex Month</span> </div>
                                                    <div className="inputbox"> <input type="text" onChange={(e) => setCvCode(e.target.value)} name="name" min={3} max={3} className="form-control" required="required" /> <span>CVV</span> </div>
                                                </div>
                                                <div className="px-5 pay">
                                                    <button className="btn btn-success btn-block" type="submit" onClick={(e) => submit(e)}>Pay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="paypal" role="tabpanel" aria-labelledby="paypal-tab">
                                        <div className="px-5 mt-5">
                                            <div className="inputbox"> <input type="text" name="name" className="form-control" required="required" /> <span>Paypal Email Address</span> </div>
                                            <div className="pay px-5"> <button className="btn btn-primary btn-block">Add paypal</button> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
