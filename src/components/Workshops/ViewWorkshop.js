import React, {useState, useEffect} from "react";
import axios from "axios";
import WorkshopConductorSideNav from "../Navbar/WorkshopConductorSideNav";
import {storage} from "../../firebase";
import docIcon from "../../images/normal-file.jpg";
import appleCamera from "../../images/apple-camera.png";
import authHeader from "../../services/auth-header";

export default function ViewWorkshop(props) {

    const [id, setId] = useState("");
    const [conferenceTracksName, setConferenceTracksName] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [conductor, setConductor] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [documentURL, setDocumentURL] = useState("");
    const [document, setDocument] = useState(null);
    const [progress, setProgress] = useState('');
    const [image, setImage] = useState(null);
    const [imgProgress, setImgProgress] = useState('');

    useEffect(() => {
        getWorkshop();
    }, [])

    function getWorkshop() {
        const workshopId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/workshops/" + workshopId).then((res) => {
            console.log(res.data);
            setId(res.data.id);
            setConferenceTracksName(res.data.conferenceTracksName);
            setName(res.data.name);
            setDescription(res.data.description);
            setDocumentURL(res.data.documentURL);
            setConductor(res.data.conductor);
            setImageURL(res.data.imageURL);
            setVenue(res.data.venue);
            setDate(res.data.date);
            setStartTime(res.data.startTime);
            setEndTime(res.data.endTime);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            name,
            description,
            documentURL,
            conductor,
            imageURL,
            venue,
            date,
            startTime,
            endTime
        }
        const workshopId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/workshops/" + workshopId, dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/workshops");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.documentURL !== undefined) {
                alert(err.response.data.documentURL);
            } else if(err.response.data.conductor !== undefined) {
                alert(err.response.data.conductor);
            } else if(err.response.data.imageURL !== undefined) {
                alert(err.response.data.imageURL);
            } else if(err.response.data.venue !== undefined) {
                alert(err.response.data.venue);
            } else if(err.response.data.date !== undefined) {
                alert(err.response.data.date);
            } else if(err.response.data.startTime !== undefined) {
                alert(err.response.data.startTime);
            } else if(err.response.data.endTime !== undefined) {
                alert(err.response.data.endTime);
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
            const uploadTask = storage.ref(`Workshops/${document.name}`).put(document);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Workshops').child(document.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setDocumentURL(uploadedURL);
                        alert("Document uploaded successfully.")
                    })
                });
        }
    }

    function handleImageChange(e) {
        if(e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImage(imageFile)
        }
    }

    function handleImageUpload(e) {
        e.preventDefault();
        if(image == null) {
            alert("Please select an image!");
        } else {
            const uploadTask = storage.ref(`Conductors/${image.name}`).put(image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(imgProgress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Conductors').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setImageURL(uploadedURL);
                        alert("Image uploaded successfully.")
                    })
                });
        }
    }

    return(
        <div className="main">
            <WorkshopConductorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1600px'
            }}>
                <br/>
                <div className="card" style={{width : '72%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Workshop</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="id" className="col-sm-3">Id</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="id" value={id} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="conferenceTracksName" className="col-sm-3">Conference Track</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="conferenceTracksName" value={conferenceTracksName} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter Name" value={name} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} id="description" cols="30" rows="6" placeholder="Enter Description" value={description} />
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
                                <div className="col-md-4 offset-md-3">
                                    <img src={docIcon} alt="No Document" height="50" width="50" /><br/>
                                    <a href={documentURL} className="doc-url">{documentURL.substring(0, 30)}</a>
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress} max="100" />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="conductor" className="col-sm-3">Conductor</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setConductor(e.target.value)} className="form-control" id="conductor" placeholder="Enter Conductor" value={conductor} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="imageURL" className="col-sm-3">Conductor Image</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleImageChange(e)} className="form-control file-box" id="imageURL" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleImageUpload(e)} className="btn btn-success">Upload</button>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <div className="col-md-3 offset-md-3">
                                    <img src={ imageURL || appleCamera} alt="No Image" height="100" width="160" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={imgProgress} max="100" />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="venue" className="col-sm-3">Venue</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setVenue(e.target.value)} className="form-control" id="venue" placeholder="Enter Venue" value={venue} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-3">Date</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setDate(e.target.value)} className="form-control" id="date" placeholder="Enter Date" value={date} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="startTime" className="col-sm-3">Start Time</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setStartTime(e.target.value)} className="form-control" id="startTime" placeholder="Enter Start Time" value={startTime} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="endTime" className="col-sm-3">End Time</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setEndTime(e.target.value)} className="form-control" id="endTime" placeholder="Enter End Time" value={endTime} required/>
                                </div>
                            </div><br/>
                            <button onClick={(e) => submit(e)} className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}