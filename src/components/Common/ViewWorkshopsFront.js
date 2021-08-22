import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function ViewWorkshopsFront(props) {

    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        getWorkshops();
    }, [])

    function getWorkshops() {
        const tracksId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/workshops/conference-tracks/"+tracksId+"/status/APPROVED").then((res) => {
            setWorkshops(res.data);
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
                            <h1 className="home-h1">Workshops</h1><br/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="row">
                            {
                                workshops.length === 0 ?
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <h1 className="home-h1">No Records Available</h1><br/>
                                        </div>
                                    </div>
                                    :
                                    workshops.map((workshop, index) => (
                                        <div className="card bg-dark fr-work-card">
                                            <center><h5>{workshop.name}</h5></center><br/>
                                            <center><img className="card-img-top fr-work-card-img" src={workshop.imageURL} alt="No image"/></center>
                                            <div className="card-body">
                                                <h5>Conducted by {workshop.conductor}</h5><br/>
                                                <h6>{workshop.description}</h6><br/>
                                                <h6>Date : {workshop.date}</h6>
                                                <h6>Time : {workshop.startTime} - {workshop.endTime}</h6>
                                                <h6>Venue : {workshop.venue}</h6>
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