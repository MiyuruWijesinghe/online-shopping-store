import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/auth.service";

export default function BuyerUpdateProfile({props}) {

    const [data, setData] = useState({
        username: ""
    })


    function getCurrentUser() {
        data.username = setData(authService.getCurrentUser());
    }

    function onSubmit() {
        console.log("submit function called");
        console.log(data.username);
    }

    return(
        <div className="main">
            <BuyerSideNav/>
            <Container style={{color: 'white'}} className="dark-table-container">
                <Col xs={6}>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue="Mahi"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue="Ramyathilake"/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" defaultValue="test@gmail.com"/>
                        </Form.Group>
                        <Form.Group controlId="addressLine1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" defaultValue="test"/>
                        </Form.Group>
                        <Form.Group controlId="addressLine2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" defaultValue="test"/>
                        </Form.Group>
                        <Form.Group controlId="addressLine3">
                            <Form.Label>Address Line 3</Form.Label>
                            <Form.Control type="text" defaultValue="test"/>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="tel" defaultValue="5555"/>
                        </Form.Group>
                        <Form.Group controlId="nic">
                            <Form.Label>NIC No</Form.Label>
                            <Form.Control type="text" defaultValue="test" disabled/>
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" defaultValue="05/03/2020" disabled/>
                        </Form.Group>
                        <Button type="submit" onClick={onSubmit()}>Update</Button>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}