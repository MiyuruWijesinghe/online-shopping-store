import React, {useState, useEffect} from "react";
import axios from "axios";
import Carousel from "react-elastic-carousel";

export default function CategoryCarousel() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        axios.get("https://shopping-backend-api.herokuapp.com/category/status/ACTIVE").then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
    ];

    return (
        <div>
            <Carousel breakPoints={breakPoints}>
                {   categories.length === 0 ?
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">No Records Available</h1>
                        </div>
                    </div>
                    :
                    categories.map(category => (
                        <div key={category.id} className="carousel-clz">
                            <div className="card bg-dark fr-key-card">
                                <img className="card-img-top fr-track-card-img" src={category.imageURL} alt="No image" />
                                <div className="card-body">
                                    <center><h5>{category.name}</h5></center>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </Carousel>
        </div>
    )
}
