import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import ItemSlideShow from "./ItemSlideShow";
import Rating from '@material-ui/lab/Rating';
import ProceedOrder from "./ProceedOrder";

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

    useEffect(() => {
        getItem();
    }, [])

    function getItem() {
        const itemId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item/"+itemId).then((res) => {
            console.log(res.data);
            setData(res.data);
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

    function placeOrder() {
        //props.history.push("/order")
        return(
            <ProceedOrder itemName={data.name}/>
        )
    }

    /********
     * cart
     */

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        alert('Item added to cart.');
        console.log(product);
    }

    return(
        <div>
            <Header cartSize={cart.length}/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="card bg-dark fr-work-card">
                                <div className="row ">
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
                                        <p style={{textAlign: 'justify'}}><Rating name="half-rating-read" defaultValue={2} precision={0.5} readOnly /></p>
                                        <p style={{textAlign: 'justify'}}>2 Ratings</p><br/>
                                        <h6 style={{textAlign: 'justify', textJustify: 'inter-word'}}>{data.description}</h6><br/>
                                        <h4 style={{textAlign: 'justify', textJustify: 'inter-word', color: 'yellow'}}>Rs.&nbsp; {finalPrice}</h4><br/>
                                        <strike><h4 style={{textAlign: 'justify', textJustify: 'inter-word', color: 'grey'}}>Rs.&nbsp; {(Math.round(data.price * 100) / 100).toFixed(2)}</h4></strike><br/>

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

                                        <div style={{textAlign: 'justify'}}>
                                            <button className="btn btn-success" onClick={placeOrder}>Buy Now &nbsp;<i className="fa fa-hand-o-up"></i></button>&nbsp; &nbsp;
                                            <button className="btn btn-primary" onClick={() => addToCart(data)}>Add to Cart &nbsp;<i className="fa fa-shopping-cart"></i></button>
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
