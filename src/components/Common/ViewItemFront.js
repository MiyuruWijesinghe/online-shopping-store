import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import ItemSlideShow from "./ItemSlideShow";
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";

export default function ViewItemFront(props) {

    const [data, setData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        discount: "",
        imageURL1:"",
        imageURL2:"",
        imageURL3:"",
        imageURL4:"",
        imageURL5:"",
    });
    const [finalPrice, setFinalPrice] = useState("");
    const [attributeData, setAttributeData] = useState([]);
    const [qty, setQty] = useState(1);
    const [userName, setUserName] = useState("");
    const [itemId, setItemId] = useState("");

    useEffect(() => {
        getItem();
    }, [])

    function getItem() {
        const itemsId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item/"+itemsId).then((res) => {
            console.log(res.data);
            setData(res.data);
            setItemId(res.data.id);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        calculateFinalPrice();
    }, null)

    function calculateFinalPrice() {
        const itemPrice = (Math.round(data.price * 100) / 100).toFixed(2);
        const itemDiscount = (Math.round(data.discount * 100) / 100).toFixed(2);
        const finalAmount = itemPrice - itemDiscount;
        setFinalPrice((Math.round(finalAmount * 100) / 100).toFixed(2));
    }

    useEffect(() => {
        getItemAttributeValues();
    }, [])

    function getItemAttributeValues() {
        const itemId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item-attribute-value/item/"+itemId).then((res) => {
            console.log(res.data);
            setAttributeData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function incrementItem() {
        setQty(qty + 1);
    }

    function decrementItem() {
        setQty(qty - 1);
    }

    function getCurrentUserName() {
        const user = AuthService.getCurrentUser();
        let userName = "user";
        if(user != null) {
            userName = user.username;
        }
        setUserName(userName);
    }

    useEffect(() => {
        getCurrentUserName();
    }, null)

    function submit(e) {
        e.preventDefault();
        const cartObject = {
            itemId: itemId.toString(),
            quantity: qty.toString()
        }
        const dataObject = {
            userName,
            cartItems:[cartObject]
        }
        axios.post("https://shopping-backend-api.herokuapp.com/cart/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            window.location.reload(false);
        }).catch((err) => {
            if(err.response.data.userName !== undefined) {
                alert(err.response.data.userName);
            } else if(err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function placeOrder() {
        props.history.push("/order")
    }

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="card bg-dark fr-work-card">
                                <div className="row">
                                    <div className="col">
                                        <ItemSlideShow
                                            itemImage1={data.imageURL1}
                                            itemImage2={data.imageURL2}
                                            itemImage3={data.imageURL3}
                                            itemImage4={data.imageURL4}
                                            itemImage5={data.imageURL5}
                                        />
                                    </div>
                                    <div className="col">
                                        <h5 style={{textAlign: 'justify', textJustify: 'inter-word'}}>{data.name}</h5><br/>
                                        <h6 style={{textAlign: 'justify', textJustify: 'inter-word'}}>{data.description}</h6><br/>
                                        <h4 style={{textAlign: 'justify', textJustify: 'inter-word', color: 'yellow'}}>Rs.&nbsp; {finalPrice}</h4><br/>
                                        <strike><h4 style={{textAlign: 'justify', textJustify: 'inter-word', color: 'grey'}}>Rs.&nbsp; {(Math.round(data.price * 100) / 100).toFixed(2)}</h4></strike><br/>
                                        <h6 style={{textAlign: 'justify'}}>Quantity : </h6>
                                        <p style={{textAlign: 'justify'}}>
                                            <button type="button" className="btn btn-sm btn-success" onClick={decrementItem}>-</button>
                                            <button type="button" className="btn btn-sm btn-light">{qty}</button>
                                            <button type="button" className="btn btn-sm btn-success" onClick={incrementItem}>+</button>
                                        </p>
                                        {
                                            attributeData.length === 0 ?
                                                    <div className="col-auto">
                                                        <p className="home-h1">No Records Available</p>
                                                    </div>
                                                :
                                                attributeData.map((attribute, index) => (
                                                    <div>
                                                        <p style={{textAlign: 'justify'}}>{attribute.attributeName} : {attribute.attributeValue}</p>
                                                    </div>
                                                ))
                                        }
                                        <br/>
                                        <div style={{textAlign: 'justify'}}>
                                            <form>
                                                <button className="btn btn-primary" onClick={(e) => submit(e)}>Add to Cart &nbsp;<i className="fa fa-shopping-cart"></i></button>
                                            </form>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
