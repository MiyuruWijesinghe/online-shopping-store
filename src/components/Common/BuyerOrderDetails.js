import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import authService from "../../services/auth.service";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { height } from "dom-helpers";
import OrderDetailsReport from "../Common/OrderDetailsReport";

export default function BuyerOrderDetails(props) {

    const[order, setOrder] = useState([])
    const[data, setData] = useState([])
    var deliveryCharge = 0
    var total = 0
    const user = authService.getCurrentUser()

    useEffect(() => {
        getOrderDetails();
    }, [])

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

    function getOrderDetails() {
        const referenceCode = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/orders/referenceCode/" + referenceCode).then((res) => {
            setOrder(res.data);
        }).catch((err) => {
            alert(err);
        })
    } 
    
    function calculateTotal(item) {
        total = total + (item.itemPrice - item.itemDiscount)
    }

    function calculateDelivery(item) {
        deliveryCharge += item.deliveryCharge
    }

    return(
        <div className="main">
            <BuyerSideNav/>
            <Container className="dark-table-container">
                <center style={{color : 'white'}}><h3>Order Details</h3></center>
            </Container>
            <Container style={{color : 'white'}} className="dark-table-container">
                <Row>
                    <Col xs={3}><i><b><h4>Order Reference:</h4></b></i></Col>
                    <Col xs={6}><h4>{props.match.params.id}</h4></Col>
                    <Col><Button onClick={() => OrderDetailsReport(order)}>Generate Order Report</Button></Col>
                </Row>
            </Container><br/>
            <Container style={{color : 'white'}} className="dark-table-container">
                <Row>
                    <Col><i><b>Item</b></i></Col>
                    <Col><i><b>Item Name</b></i></Col>
                    <Col><i><b>Qty</b></i></Col>
                    <Col><i><b>Price</b></i></Col>
                    <Col><i><b>Discount</b></i></Col>
                    <Col><i><b>Amount</b></i></Col>
                </Row>
            </Container>
            <Container style={{color : 'white'}} className="dark-table-container">
                {order.map(item =>
                    <>
                        <br/>
                        <Row>
                            <Col>
                                <Image src={item.itemImage} rounded style={{ width: '8rem', height: "7rem" }}/>
                            </Col>
                            <Col>{item.brandName + ' ' + item.itemName}</Col>
                            <Col>{item.quantity}</Col>
                            <Col>Rs.{item.itemPrice}.00</Col>
                            <Col>Rs.{item.itemDiscount}.00</Col>
                            <Col>Rs.{item.itemPrice - item.itemDiscount}.00</Col>
                        </Row>
                    </>
                )}
            </Container><br/>
            {order.map(item => calculateDelivery(item))}
            {order.map(item => calculateTotal(item))}
            <Container style={{color : 'white'}} className="dark-table-container">
                <Row>
                    <Col className="dark-table-container">
                        <Row><i className="fa fa-user-circle-o" aria-hidden="true"/>{data.firstName + ' ' + data.lastName}</Row>
                        <Row><i className="fa fa-map-marker" aria-hidden="true"/>{data.addressLine1 + ', ' + data.addressLine1 + ', ' +  data.addressLine1}</Row>
                        <Row><i className="fa fa-phone-square" aria-hidden="true"/>{data.phoneNumber}</Row>
                        <Row><i className="fa fa-envelope" aria-hidden="true"/>{data.email}</Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col><i><b>Delivery Charges:</b></i></Col>
                            <Col>Rs.{deliveryCharge / order.length}.00</Col>
                        </Row>
                        <Row>
                            <Col><i><b>Total Amount:</b></i></Col>
                            <Col>Rs.{total + (deliveryCharge / order.length)}.00</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}