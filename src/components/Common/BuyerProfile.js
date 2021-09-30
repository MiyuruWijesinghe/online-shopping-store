import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function BuyerProfile(props) {

    const [data, setData] = useState({
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

    function getBuyer() {
        axios.get("http://localhost:5000/auth/buyer/Menu").then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="main">
            <BuyerSideNav/>
            <div className="container">
                <div className="container dark-table-container">
                    <center style={{color : 'white'}}><h3>Profile Details</h3></center>
                </div>
                <Container style={{color : 'white'}} className="dark-table-container">
                    <Row>
                        <Col className="col-sm-3">Full Name</Col>
                        <Col>{data.firstName} {data.lastName}</Col>
                    </Row><br/>
                    <Row>
                        <Col className="col-sm-3">Address</Col>
                        <Col>{data.addressLine1}, {data.addressLine2}, {data.addressLine3}</Col>
                    </Row><br/>
                    <Row>
                        <Col className="col-sm-3">Mobile No</Col>
                        <Col>{data.phoneNumber}</Col>
                    </Row><br/>
                    <Row>
                        <Col className="col-sm-3">NIC No</Col>
                        <Col>{data.nic}</Col>
                    </Row><br/>
                    <Row>
                        <Col className="col-sm-3">Date of Birth</Col>
                        <Col>{data.dob}</Col>
                    </Row><br/>
                    <Row>
                        <Col className="col-sm-3">Email Address</Col>
                        <Col>{data.email}</Col>
                    </Row><br/>
                    <Row>
                        <Col><Button href="./buyer-update-profile" size="lg">Update</Button></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}