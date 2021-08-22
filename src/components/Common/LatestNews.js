import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function LatestNews(props) {

    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        getLatestNews();
    }, [])

    function getLatestNews() {
        axios.get("https://icaf-backend.herokuapp.com/conference-details/status/APPROVED").then((res) => {
            setLatestNews(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 home-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">Latest News</h1>
                        </div>
                    </div>
                    <div className="row">
                        {
                            latestNews.length === 0 ?
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <h1 className="home-h1">No Records Available</h1>
                                    </div>
                                </div>
                                :
                                latestNews.map((news, index) => (
                                    <div className="col-md-4">
                                        <div className="card bg-dark fr-key-card">
                                            <div className="card-body">
                                                <center><h5>{news.topic}</h5></center>
                                                <center><h6>{news.description}</h6></center>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}