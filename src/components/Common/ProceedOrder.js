import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function ProceedOrder(props) {

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
        const itemId = 1;
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
        const itemId = 1;
        axios.get("https://shopping-backend-api.herokuapp.com/item-attribute-value/item/"+itemId).then((res) => {
            console.log(res.data);
            setAttributeData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="card bg-dark fr-track-card">
                                <div className="row ">
                                    <div className="col">
                                        <img style={{textAlign: 'justify'}} className="card-img-top ord-img" src={data.imageURL1} alt="No image" />
                                    </div>
                                    <div className="col">
                                        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>color : blue</p>
                                    </div>
                                    <div className="col">
                                        <h6 style={{textAlign: 'justify', textJustify: 'inter-word', color: 'yellow'}}>Rs.&nbsp; {finalPrice}</h6>
                                        <strike><p style={{textAlign: 'justify', textJustify: 'inter-word', color: 'grey'}}>Rs.&nbsp; {(Math.round(data.price * 100) / 100).toFixed(2)}</p></strike>
                                    </div>
                                    <div className="col">
                                        <h6 style={{textAlign: 'justify', textJustify: 'inter-word'}}>Quantity : 1</h6><br/>
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
