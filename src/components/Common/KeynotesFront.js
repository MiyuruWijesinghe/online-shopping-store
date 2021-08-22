import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";

export default function KeynotesFront(props) {

    const [keynotes, setKeynotes] = useState([]);

    useEffect(() => {
        getKeynotes();
    }, [])

    function getKeynotes() {
        axios.get("https://icaf-backend.herokuapp.com/keynote-speakers/status/APPROVED").then((res) => {
            setKeynotes(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewKeynote(keynoteId) {
        props.history.push("common-keynote/"+keynoteId)
    }

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 home-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">Keynote Speakers</h1>
                        </div>
                    </div>
                    <div className="row">
                        {
                            keynotes.length === 0 ?
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <h1 className="home-h1">No Records Available</h1>
                                    </div>
                                </div>
                                :
                                keynotes.map((keynote, index) => (
                                    <div className="col-md-4">
                                        <div className="card bg-dark fr-key-card">
                                            <Link><img className="card-img-top fr-key-card-img" src={keynote.imageURL} alt="No image" onClick={() => viewKeynote(keynote.id)} /></Link>
                                            <div className="card-body">
                                                <center><h5>{keynote.name}</h5></center>
                                                <center><h6>{keynote.designation}</h6></center>
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