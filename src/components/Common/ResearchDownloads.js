import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import docIcon from '../../images/down-doc.png'

export default function ResearchDownloads(props) {

    const [researches, setResearches] = useState([]);

    useEffect(() => {
        getResearches();
    }, [])

    function getResearches() {
        axios.get("https://icaf-backend.herokuapp.com/research/status/APPROVED").then((res) => {
            setResearches(res.data);
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
                            <h1 className="home-h1">Researches of Application Frameworks</h1><br/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="row">
                            {
                                researches.length === 0 ?
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <h1 className="home-h1">No Records Available</h1><br/>
                                        </div>
                                    </div>
                                    :
                                    researches.map((research, index) => (
                                        <div className="card bg-dark fr-work-card">
                                            <center><h5>{research.name}</h5></center><br/>
                                            <center><img className="card-img-top fr-doc-card-img" src={docIcon} alt="No image"/></center>
                                            <div className="card-body">
                                                <h6>{research.description}</h6><br/>
                                                <h6>Author : {research.createdUser}</h6>
                                                <h6>Published Date : {research.publishedDate}</h6>
                                                <h6><a href={research.documentURL} className="doc-url">{research.documentURL}</a></h6>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}