import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";
import Payment from "./Payment";

export default function ProceedOrder(props) {

    const [userName, setUserName] = useState("");
    const [deliveryAmount, setDeliveryAmount] = useState(200.00);
    const [deliveryCharge, setDeliveryCharge] = useState("200.00");
    const [cartItemList, setCartItemList] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getCartItems();
    }, [])

    function getCartItems() {
        const user = AuthService.getCurrentUser();
        let uname = "user";
        if(user != null) {
            uname = user.username;
        }
        axios.get("https://shopping-backend-api.herokuapp.com/cart/username/"+uname).then((res) => {
            console.log(res.data);
            setCartItemList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        getCurrentUserName();
    }, null)

    function getCurrentUserName() {
        const user = AuthService.getCurrentUser();
        let userName = "user";
        if(user != null) {
            userName = user.username;
        }
        setUserName(userName);
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    function getUserDetails() {
        const user = AuthService.getCurrentUser();
        let uname = "user";
        if(user != null) {
            uname = user.username;
        }
        axios.get("https://shopping-backend-api.herokuapp.com/auth/buyer/"+uname).then((res) => {
            console.log(res.data);
            setUserDetails(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(cartItemList.length > 0) {
            setOrdersList();
        }
    }, [cartItemList])

    function setOrdersList() {
        const gotOrders = cartItemList.map((cart, index) => ({
            itemId: cart.items.id,
            quantity: cart.quantity
        }))
        setOrders(gotOrders)
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            userName,
            deliveryCharge,
            orders
        }
        axios.post("https://shopping-backend-api.herokuapp.com/orders/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert('Order Saved Successfully.');
        }).catch((err) => {
            if(err.response.data.userName !== undefined) {
                alert(err.response.data.userName);
            } else if(err.response.data.deliveryCharge !== undefined) {
                alert(err.response.data.deliveryCharge);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <Payment/>
                    <div className="row justify-content-center">
                        <form>
                            <div className="col-auto">
                                <div className="card bg-dark fr-track-card">
                                    <h3 style={{textAlign: 'justify'}}>Order Summary</h3><br/>
                                    <div className="row">
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Item</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Name</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Unit Price</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Discount</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Quantity</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Sub Total</b></p>
                                        </div>
                                    </div>
                                    {
                                        cartItemList.length === 0 ?
                                            <div className="col-auto">
                                                <p className="home-h1">No Items.</p>
                                            </div>
                                            :
                                            cartItemList.map((cartItem, index) => (
                                                <div className="row">
                                                    <div className="col">
                                                        <img style={{textAlign: 'justify'}} className="card-img-top ord-img" src={cartItem.items.imageURL1} alt="No image" /><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p style={{textAlign: 'justify'}}>{cartItem.items.name}</p><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p style={{textAlign: 'justify'}}>Rs. {(Math.round(cartItem.items.price * 100) / 100).toFixed(2)}</p><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p style={{textAlign: 'justify'}}>Rs. {(Math.round(cartItem.items.discount * 100) / 100).toFixed(2)}</p><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p>{cartItem.quantity}</p><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p style={{textAlign: 'justify'}}>Rs. {(Math.round(cartItem.subTotal * 100) / 100).toFixed(2)}</p><br/>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                    <div className="row">
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Delivery</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}>Rs. {(Math.round(deliveryAmount * 100) / 100).toFixed(2)}</p>
                                        </div>
                                    </div><br/>
                                    <div className="row">
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Total</b></p>
                                        </div>
                                        <div className="col">
                                            {
                                                cartItemList.length === 0 ?
                                                    <p style={{textAlign: 'justify'}}><b>Rs. 0.00</b></p>
                                                    :
                                                    <p style={{textAlign: 'justify'}}><b>Rs. {(Math.round(((cartItemList.reduce((a,v) =>  a = a + v.subTotal, 0) + deliveryAmount)  * 100) / 100).toFixed(2))}</b></p>
                                            }
                                        </div>
                                    </div><br/>
                                    <h6 style={{textAlign: 'justify'}}>Shipping & Billing</h6><br/>
                                    <div className="row" style={{marginTop: '20px'}}>
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b><i className="fa fa-user-circle-o" aria-hidden="true"></i> {userDetails.firstName + ' ' + userDetails.lastName}</b></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b><i className="fa fa-map-marker" aria-hidden="true"></i></b> {userDetails.addressLine1 + ', ' + userDetails.addressLine2 + ', ' + userDetails.addressLine3}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b><i className="fa fa-phone-square" aria-hidden="true"></i></b> {userDetails.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b><i className="fa fa-envelope" aria-hidden="true"></i></b> {userDetails.email}</p>
                                        </div>
                                        <div className="col">
                                        </div>
                                        <div className="col">
                                            <button data-toggle="modal" data-target="#staticBackdrop" className="nav-link" type="submit" className="btn btn-lg btn-success" onClick={(e) => submit(e)}><b>Proceed to Payment</b></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
