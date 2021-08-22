import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";

export default function ResearchFront(props) {

    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        getTracks();
    }, [])

    function getTracks() {
        axios.get("https://icaf-backend.herokuapp.com/tracks/status/APPROVED").then((res) => {
            setTracks(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewResearches(trackId) {
        props.history.push("common-research/"+trackId)
    }

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 home-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">Workshop Tracks</h1><br/>
                            <small className="home-h1">Select Your Interested Application Framework</small>
                        </div>
                    </div>
                    <div className="row">
                        {
                            tracks.length === 0 ?
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <h1 className="home-h1">No Records Available</h1>
                                    </div>
                                </div>
                                :
                                tracks.map((track, index) => (
                                    <div className="col-md-4">
                                        <div className="card bg-dark fr-track-card">
                                            <Link><img className="card-img-top fr-track-card-img" src={track.imageURL} alt="No image" onClick={() => viewResearches(track.id)}/></Link>
                                            <div className="card-body">
                                                <center><h5>{track.name}</h5></center>
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