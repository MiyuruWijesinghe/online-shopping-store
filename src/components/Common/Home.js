import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import SlideShow from "./SlideShow";
import CategoryCarousel from "./CategoryCarousel";

export default function Home(props) {

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">Welcome to BuyTNow</h1><br/>
                            <h4 className="home-h1">Sri Lanka's Largest Online Shopping Store</h4>
                            <div className="row justify-content-center">
                                <div className="col-10"><br/>
                                    <h2 className="home-h1"> <b><i>"The Choice is Yours"</i></b></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <SlideShow/>
                        </div>
                    </div>
                </div>
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">Our Categories</h1><br/>
                        </div>
                    </div>
                </div>
                <CategoryCarousel/>
            </div>
            <Footer/>
        </div>
    )
}