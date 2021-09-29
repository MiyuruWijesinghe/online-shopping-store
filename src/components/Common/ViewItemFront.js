import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import SlideShow from "./SlideShow";
import ItemSlideShow from "./ItemSlideShow";

export default function ViewItemFront(props) {

    const [data, setData] = useState({
        id: "",
        name: "",
        description: "",
        imageURL1:"",
        imageURL2:"",
        imageURL3:"",
        imageURL4:"",
        imageURL5:"",
    })

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

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="card bg-dark fr-work-card">
                                <h5>{data.name}</h5><br/>
                                <img className="card-img-top fr-work-card-img" src={data.imageURL1} alt="No image"/>
                                <ItemSlideShow/>
                                <div className="card-body">
                                    <h6>{data.description}</h6><br/>
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
