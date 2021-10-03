import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import {storage} from "../../firebase";
import appleCamera from "../../images/apple-camera.png";

export default function BuyerUpdateProfile({props}) {

    const [data, setData] = useState({
        username:"",
        id: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        phoneNumber: "",
        status: "",
        nic: "",
        dob: "",
        userImage: "",
        email: "",
        password: ""
    })
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState('');
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        getBuyer();
    }, [])

    function onSubmit(e) {
        e.preventDefault();
        console.log("submit function called");
        console.log(data.firstName);

        axios.put("https://shopping-backend-api.herokuapp.com/auth/buyer/" + data.username, {
            firstName: data.firstName,
            lastName: data.lastName,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            addressLine3: data.addressLine3,
            phoneNumber: data.phoneNumber,
            status: data.status,
            nic: data.nic,
            dob: data.dob,
            username: data.username,
            email: data.email,
            password: data.password,
            userImage: imageURL
        },  {headers: authHeader()}).then((res) => {
            alert(res.data.messages);
        }).catch((err) => {
            alert(err);
        })
    }

    function getBuyer() {
        data.username = authService.getCurrentUser().username;
        axios.get("https://shopping-backend-api.herokuapp.com/auth/buyer/" + data.username).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
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
            alert("Please select an image");
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
            <BuyerSideNav/>
            <Container style={{color : 'white'}} className="dark-table-container">
                <center><h3>Update Profile Details</h3></center>
            </Container>
            <Container style={{color: 'white'}} className="dark-table-container">
                <div className="form-group row">
                    <label htmlFor="imageURL" className="col-sm-3 lg-wh">User Image</label>
                    <div className="col-sm-5">
                        <input type="file" onChange={(e) => handleImageChange(e)} className="form-control file-box" id="imageURL" />
                    </div>
                        <div className="col">
                        <button onClick={(e) => handleImageUpload(e)} className="btn btn-success">Upload</button>
                    </div>
                    <div className="col">
                        <img src={ imageURL || appleCamera} alt="No Image" height="100" width="160" /><br />
                        <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress} max="100" />
                    </div>
                </div><br/>
            </Container>
            <Container style={{color: 'white'}} className="dark-table-container">
                <Col xs={6}>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => (data.firstName=e.target.value)} defaultValue={data.firstName}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => (data.lastName=e.target.value)} defaultValue={data.lastName}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" onChange={(e) => (data.email=e.target.value)} defaultValue={data.email}/>
                        </Form.Group>
                        <Form.Group controlId="addressLine1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" onChange={(e) => (data.addressLine1=e.target.value)} defaultValue={data.addressLine1}/>
                        </Form.Group>
                        <Form.Group controlId="addressLine2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" onChange={(e) => (data.addressLine2=e.target.value)} defaultValue={data.addressLine2}/>
                        </Form.Group>
                        <Form.Group controlId="addressLine3">
                            <Form.Label>Address Line 3</Form.Label>
                            <Form.Control type="text" onChange={(e) => (data.addressLine3=e.target.value)} defaultValue={data.addressLine3}/>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="tel" onChange={(e) => (data.phoneNumber=e.target.value)} defaultValue={data.phoneNumber}/>
                        </Form.Group>
                        <Form.Group controlId="nic">
                            <Form.Label>NIC No</Form.Label>
                            <Form.Control type="text" defaultValue={data.nic} disabled/>
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" defaultValue={data.dob} disabled/>
                        </Form.Group>
                        <Button type="submit" onClick={(e) => onSubmit(e)} href="./buyer-profile">Update</Button>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}