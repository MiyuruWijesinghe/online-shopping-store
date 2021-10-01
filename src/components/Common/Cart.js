import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";

export default function Cart(props) {

    const [attributeValueList, setAttributeValueList] = useState([]);
    const [attributeValueOptionsList, setAttributeValueOptionsList] = useState([]);
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [attributeValueId, setAttributeValueId] = useState("");
    const [status, setStatus] = useState("INACTIVE");

    const [cartItemList, setCartItemList] = useState([]);

    useEffect(() => {
        getCartItems();
    }, [])

    function getCartItems() {
        const user = AuthService.getCurrentUser();
        let userName = "user";
        if(user != null) {
            userName = user.username;
        }
        axios.get("https://shopping-backend-api.herokuapp.com/cart/username/"+userName).then((res) => {
            console.log(res.data);
            setCartItemList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        getItem();
    }, [])

    function getItem() {
        //const itemId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item/"+1).then((res) => {
            console.log(res.data);
            setItemId(res.data.id);
            setItemName(res.data.name);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        getAttributeValues();
    }, [])

    function getAttributeValues() {
        axios.get("https://shopping-backend-api.herokuapp.com/attribute-value/status/ACTIVE").then((res) => {
            setAttributeValueList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(attributeValueList.length > 0) {
            setAttributeValueOptionValues();
        }
    }, [attributeValueList])

    function setAttributeValueOptionValues() {
        const gotOptions = attributeValueList.map((attributeValue, index) => ({
            value : attributeValue.id,
            label : attributeValue.name
        }))
        setAttributeValueOptionsList(gotOptions)
    }



    function submit(e) {
        e.preventDefault();
        const dataObject = {
            itemId,
            attributeValueId,
            status
        }
        axios.post("https://shopping-backend-api.herokuapp.com/item-attribute-value/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);

        }).catch((err) => {
            if(err.response.data.itemId !== undefined) {
                alert(err.response.data.itemId);
            } else if(err.response.data.attributeValueId !== undefined) {
                alert(err.response.data.attributeValueId);
            } else if(err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    return(
        <div className="main">
            <div className="container">
                <br/>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content dark-model">
                            <div className="modal-header dark-card-header">
                                <h4 className="modal-title">Your Shopping Cart ({cartItemList.length} Items)</h4>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">X</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => submit(e)}>
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
                                        <div className="col">
                                            <p style={{textAlign: 'justify'}}><b>Remove</b></p>
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
                                                        <p style={{textAlign: 'justify'}}>{cartItem.quantity}</p><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p style={{textAlign: 'justify'}}>Rs. {(Math.round(cartItem.subTotal * 100) / 100).toFixed(2)}</p><br/>
                                                    </div>
                                                    <div className="col">
                                                        <p style={{textAlign: 'justify'}}><button type="button" className="btn btn-sm btn-danger">X</button></p><br/>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                    <br/>
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
                                                    <p style={{textAlign: 'justify'}}><b>Rs. {(Math.round((cartItemList.reduce((a,v) =>  a = a + v.subTotal, 0)  * 100) / 100).toFixed(2))}</b></p>
                                            }
                                        </div>
                                    </div><br/>
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
