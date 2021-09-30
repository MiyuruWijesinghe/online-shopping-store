import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/auth.service";

export default function BuyerUpdateProfile({props}) {

    const [data, setData] = useState({
        username: "",
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
        userName: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        getBuyer();
    }, [])

    function onSubmit(e) {
        e.preventDefault();
        console.log("submit function called");
        console.log(data.username);
    }

    function getBuyer() {
        const username = authService.getCurrentUser().username;
        axios.get("http://localhost:5000/auth/buyer/" + username).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="main">
            <BuyerSideNav/>
            <Container style={{color : 'white'}} className="dark-table-container">
                <center><h3>Update Profile Details</h3></center>
            </Container>
            <Container style={{color: 'white'}} className="dark-table-container">
                <Col xs={6}>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue={data.firstName}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue={data.lastName}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" defaultValue={data.email}/>
                        </Form.Group>
                        <Form.Group controlId="addressLine1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" defaultValue={data.addressLine1}/>
                        </Form.Group>
                        <Form.Group controlId="addressLine2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" defaultValue={data.addressLine2}/>
                        </Form.Group>
                        <Form.Group controlId="addressLine3">
                            <Form.Label>Address Line 3</Form.Label>
                            <Form.Control type="text" defaultValue={data.addressLine3}/>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="tel" defaultValue={data.phoneNumber}/>
                        </Form.Group>
                        <Form.Group controlId="nic">
                            <Form.Label>NIC No</Form.Label>
                            <Form.Control type="text" defaultValue={data.nic} disabled/>
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" defaultValue={data.dob} disabled/>
                        </Form.Group>
                        <Button type="submit" onClick={(e) => onSubmit(e)}>Update</Button>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}