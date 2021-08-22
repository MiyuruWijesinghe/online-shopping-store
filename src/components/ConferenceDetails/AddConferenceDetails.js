import React, {useEffect, useState} from "react";
import EditorSideNav from "../Navbar/EditorSideNav";
import axios from "axios";
import Select from "react-select";
import authHeader from "../../services/auth-header";

export default function AddConferenceDetails(props) {

    const [conferenceList, setConferenceList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [conferenceId, setConferenceId] = useState("");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        getConference();
    }, [])

    function getConference() {
        axios.get("https://icaf-backend.herokuapp.com/conference/status/ACTIVE").then((res) => {
            setConferenceList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(conferenceList.length > 0) {
            setOptionValues();
        }
    }, [conferenceList])

    function setOptionValues() {
        const gotOptions = conferenceList.map((conference, index) => ({
            value : conference.id,
            label : conference.name
        }))
        setOptionsList(gotOptions)
    }

    function onSelect(e) {
        setConferenceId(e.value);
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            conferenceId,
            topic,
            description
        }
        axios.post("https://icaf-backend.herokuapp.com/conference-details/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/conference-details");
        }).catch((err) => {
            if(err.response.data.topic !== undefined) {
                alert(err.response.data.topic);
            } else if(err.response.data.conductor !== undefined) {
                alert(err.response.data.conductor);
            } else if(err.response.data.conferenceId !== undefined) {
                alert(err.response.data.conferenceId);
            } else if(err.response.data.description !== undefined) {
                alert(err.response.data.description);
            } else {
                alert(err);
            }
        })
    }

    return(
        <div className="main">
            <EditorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1200px'
            }}>
                <br/>
                <div className="card" style={{width : '70%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Conference Details</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div className="form-group row">
                                <label htmlFor="conferenceId" className="col-sm-3">Conference</label>
                                <div className="col-sm-5">
                                    <Select options={optionsList} onChange={(e) => onSelect(e)} id="conferenceId" placeholder="Select Conference" single autoFocus isSearchable/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="topic" className="col-sm-3">Topic</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setTopic(e.target.value)} className="form-control" id="topic" placeholder="Enter Topic" required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" cols="30" rows="6" placeholder="Enter Description" required/>
                                </div>
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}