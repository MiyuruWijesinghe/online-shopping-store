import React, {useState, useEffect} from "react";
import axios from "axios";
import ResearcherSideNav from "../Navbar/ResearcherSideNav";
import {storage} from "../../firebase";
import docIcon from "../../images/normal-file.jpg";
import authHeader from "../../services/auth-header";

export default function ViewResearch(props) {

    const [id, setId] = useState("");
    const [conferenceTracksName, setConferenceTracksName] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [documentURL, setDocumentURL] = useState("");
    const [document, setDocument] = useState(null);
    const [progress, setProgress] = useState('');

    useEffect(() => {
        getResearch();
    }, [])

    function getResearch() {
        const researchId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/research/" + researchId).then((res) => {
            console.log(res.data);
            setId(res.data.id);
            setConferenceTracksName(res.data.conferenceTracksName);
            setName(res.data.name);
            setDescription(res.data.description);
            setPublishedDate(res.data.publishedDate);
            setDocumentURL(res.data.documentURL);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            name,
            description,
            publishedDate,
            documentURL
        }
        const researchId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/research/" + researchId, dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/researches");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.documentURL !== undefined) {
                alert(err.response.data.documentURL);
            } else if(err.response.data.conferenceDetailsId !== undefined) {
                alert(err.response.data.conferenceDetailsId);
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
                height : '1100px'
            }}>
                <br/>
                <div className="card" style={{width : '72%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Research</h4>
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
                                <label htmlFor="publishedDate" className="col-sm-3">Published Date</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => setPublishedDate(e.target.value)} id="publishedDate" placeholder="Enter Published Date" value={publishedDate} required/>
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