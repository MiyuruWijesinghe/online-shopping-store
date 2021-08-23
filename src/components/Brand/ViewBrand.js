import React, {useState, useEffect} from "react";
import axios from "axios";
import AdminSideNav from "../Navbar/AdminSideNav";
import {storage} from "../../firebase";
import appleCamera from "../../images/apple-camera.png";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

export default function ViewBrand(props) {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState('');
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getBrand();
    }, [])

    function getBrand() {
        const brandId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/brand/" + brandId).then((res) => {
            console.log(res.data);
            setId(res.data.id);
            setName(res.data.name);
            setImageURL(res.data.imageURL);
            setStatus(res.data.status);
            initialStatus(res.data.status);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            name,
            imageURL,
            status
        }
        const brandId = props.match.params.id;
        axios.put("https://shopping-backend-api.herokuapp.com/brand/" + brandId, dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/brands");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.imageURL !== undefined) {
                alert(err.response.data.imageURL);
            } else if(err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function initialStatus(pStatus) {
        if (pStatus == 'ACTIVE') {
            setChecked(true);
            setStatus('ACTIVE');
        } else {
            setChecked(false);
            setStatus('INACTIVE');
        }
    }

    function handleStatus() {
        if (checked) {
            setChecked(false);
            setStatus('INACTIVE');
        } else {
            setChecked(true);
            setStatus('ACTIVE');
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
            const uploadTask = storage.ref(`Tracks/${image.name}`).put(image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Tracks').child(image.name).getDownloadURL().then(url => {
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
            <AdminSideNav />
            <div className="container dark-form-main">
                <br/>
                <div className="card dark-card">
                    <div className="card-header dark-card-header">
                        <h4>Brand</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="id" className="col-sm-3 lg-wh">Id</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="id" value={id} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 lg-wh">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter Name" value={name} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="imageURL" className="col-sm-3 lg-wh">Image</label>
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
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress} max="100" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3 lg-wh">Status</label>
                                <div className="col-sm-5">
                                    <Switch checked={checked} onChange={handleStatus} id="status" /> {checked ? <label className="lg-wh">Active</label> : <label className="lg-wh">Inactive</label>}
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