import React, {useState, useEffect} from "react";
import ResearcherSideNav from "../Navbar/ResearcherSideNav";
import axios from "axios";
import { storage } from '../../firebase';
import docIcon from '../../images/normal-file.jpg'
import Select from "react-select";
import authHeader from "../../services/auth-header";

export default function AddResearch(props) {

    const [tracksList, setTracksList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [conferenceTracksId, setConferenceTracksId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [documentURL, setDocumentURL] = useState("");
    const [document, setDocument] = useState(null);
    const [progress, setProgress] = useState('');

    useEffect(() => {
        getTracks();
    }, [])

    function getTracks() {
        axios.get("https://icaf-backend.herokuapp.com/tracks/status/APPROVED").then((res) => {
            setTracksList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(tracksList.length > 0) {
            setOptionValues();
        }
    }, [tracksList])

    function setOptionValues() {
        const gotOptions = tracksList.map((track, index) => ({
            value : track.id,
            label : track.name
        }))
        setOptionsList(gotOptions)
    }

    function onSelect(e) {
        setConferenceTracksId(e.value);
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            conferenceTracksId,
            name,
            description,
            publishedDate,
            documentURL
        }
        axios.post("https://icaf-backend.herokuapp.com/research/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/researches");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.topic !== undefined) {
                alert(err.response.data.topic);
            } else if(err.response.data.documentURL !== undefined) {
                alert(err.response.data.documentURL);
            } else if(err.response.data.conferenceTracksId !== undefined) {
                alert(err.response.data.conferenceTracksId);
            } else if(err.response.data.publishedDate !== undefined) {
                alert(err.response.data.publishedDate);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function handleDocumentChange(e) {
        if(e.target.files[0]) {
            const documentFile = e.target.files[0]
            setDocument(documentFile)
        }
    }

    function handleDocumentUpload(e) {
        e.preventDefault();
        if(document == null) {
            alert("Please select a document!");
        } else {
            const uploadTask = storage.ref(`Researches/${document.name}`).put(document);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Researches').child(document.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setDocumentURL(uploadedURL);
                        alert("Document uploaded successfully.")
                    })
                });
        }
    }

    return(
        <div className="main">
            <ResearcherSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1000px'
            }}>
                <br/>
                <div className="card" style={{width : '70%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Research</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="conferenceTracksId" className="col-sm-3">Conference Track</label>
                                <div className="col-sm-5">
                                    <Select options={optionsList} onChange={(e) => onSelect(e)} id="conferenceTracksId" placeholder="Select Conference Track" single autoFocus isSearchable/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter Name" required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" cols="30" rows="6" placeholder="Enter Description" />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="documentURL" className="col-sm-3">Document</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleDocumentChange(e)} className="form-control file-box" id="documentURL" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleDocumentUpload(e)} className="btn btn-success">Upload</button>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <div className="col-md-3 offset-md-3">
                                    <img src={ documentURL || docIcon} alt="No Document" height="100" width="100" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress} max="100" />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="publishedDate" className="col-sm-3">Published Date</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setPublishedDate(e.target.value)} className="form-control" id="publishedDate" placeholder="Enter Published Date" required/>
                                </div>
                            </div><br/>
                            <button onClick={(e) => submit(e)} className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}