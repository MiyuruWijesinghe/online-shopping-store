import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import authService from "../../services/auth.service";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

export default function BuyerProfile(props) {

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
        email: "",
        password: "",
        userImage: ""
    })

    useEffect(() => {
        getBuyer();
    }, [])

    function getBuyer() {
        data.username = authService.getCurrentUser().username;
        axios.get("https://shopping-backend-api.herokuapp.com/auth/buyer/" + data.username).then((res) => {
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
                        <Col className="col-sm-3"><Image src={data.userImage} rounded alt="No Image" width="120px"/></Col>
                        <Col><h4>{data.username}</h4></Col>
                    </Row><br/>
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
                        <Col><Button href="./buyer-update-profile"> Go to Update</Button></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}