import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function ViewKeyNoteFront(props) {

    const [data, setData] = useState({
        id: "",
        name: "",
        designation: "",
        description: "",
        imageURL:""
    })

    useEffect(() => {
        getKeyNote();
    }, [])

    function getKeyNote() {
        const keyNoteId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/keynote-speakers/"+keyNoteId).then((res) => {
            console.log(res.data);
            setData(res.data);
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
                            <div className="card bg-dark fr-work-card">
                                <center><h5>{data.name}</h5></center><br/>
                                <center><img className="card-img-top fr-work-card-img" src={data.imageURL} alt="No image"/></center>
                                <div className="card-body">
                                    <h5>{data.designation}</h5><br/>
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