import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

export default function Cart(props) {

    const [cartItemList, setCartItemList] = useState([]);
    let history = useHistory();

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

    function deleteCartItem(cartItemId) {
        if (window.confirm("Do you want to remove this item?")) {
            axios.delete("https://shopping-backend-api.herokuapp.com/cart/" + cartItemId).then((res) => {
                alert(res.data.messages);
                const currentData = cartItemList.filter(cartItem => cartItem.id !== cartItemId);
                setCartItemList(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Ok");
        }
    }

    function proceedCart() {
        history.push("/order");
        window.location.reload(false);
    }

    return (
        <div className="main">
            <div className="container">
                <br />
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content dark-model">
                            <div className="modal-header dark-card-header">
                                <h4 className="modal-title">Your Shopping Cart ({cartItemList.length} Items)</h4>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">X</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={proceedCart}>
                                    <div className="row">
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Item</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Name</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Unit Price</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Discount</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Quantity</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Sub Total</b></p>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: 'justify' }}><b>Remove</b></p>
                                        </div>
                                    </div>
                                    {
                                        cartItemList.length === 0 ?
                                            <div className="col-auto">
                                                <p className="home-h1">Cart is Empty.</p>
                                            </div>
                                            :
                                            cartItemList.map((cartItem, index) => (
                                                <div className="row">
                                                    <div className="col">
                                                        <img style={{ textAlign: 'justify' }} className="card-img-top ord-img" src={cartItem.items.imageURL1} alt="No image" /><br />
                                                    </div>
                                                    <div className="col">
                                                        <p style={{ textAlign: 'justify' }}>{cartItem.items.name}</p><br />
                                                    </div>
                                                    <div className="col">
                                                        <p style={{ textAlign: 'justify' }}>Rs. {(Math.round(cartItem.items.price * 100) / 100).toFixed(2)}</p><br />
                                                    </div>
                                                    <div className="col">
                                                        <p style={{ textAlign: 'justify' }}>Rs. {(Math.round(cartItem.items.discount * 100) / 100).toFixed(2)}</p><br />
                                                    </div>
                                                    <div className="col">
                                                        <p style={{ textAlign: 'justify' }}>{cartItem.quantity}</p><br />
                                                    </div>
                                                    <div className="col">
                                                        <p style={{ textAlign: 'justify' }}>Rs. {(Math.round(cartItem.subTotal * 100) / 100).toFixed(2)}</p><br />
                                                    </div>
                                                    <div className="col">
                                                        <p style={{ textAlign: 'justify' }}><button type="button" className="btn btn-sm btn-danger" onClick={() => deleteCartItem(cartItem.id)}>X</button></p><br />
                                                    </div>
                                                </div>
                                            ))
                                    }
                                    <br />
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
                                            <p style={{ textAlign: 'justify' }}><b>Total</b></p>
                                        </div>
                                        <div className="col">
                                            {
                                                cartItemList.length === 0 ?
                                                    <p style={{ textAlign: 'justify' }}><b>Rs. 0.00</b></p>
                                                    :
                                                    <p style={{ textAlign: 'justify' }}><b>Rs. {(Math.round((cartItemList.reduce((a, v) => a = a + v.subTotal, 0) * 100) / 100).toFixed(2))}</b></p>
                                            }
                                        </div>
                                    </div><br />
                                    <button type="submit" className="btn btn-success">Proceed to Checkout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
