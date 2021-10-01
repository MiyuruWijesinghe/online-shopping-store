import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import authService from "../../services/auth.service";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function BuyerOrder(props) {

    const[data, setData] = useState({
        username: ""
    })
    const[orders, setOrders] = useState([])

    useEffect(() => {
        getOrders();
    }, [])

    function getOrders() {
        data.username = authService.getCurrentUser().username;
        axios.get("http://localhost:5000/orders/username/ADMIN").then((res) => {
            setOrders(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewOrder(id) {
        props.history.push("buyer-order-details/" + id)
    }

    return(
        <div className="main">
            <BuyerSideNav/>
            <Container className="dark-table-container">
                <center style={{color : 'white'}}><h3>Orders</h3></center>
            </Container>
            <Container style={{color : 'white'}} className="dark-table-container">
                <Row>
                    <Col><i><b>Order ID</b></i></Col>
                    <Col><i><b>Date</b></i></Col>
                    <Col><i><b>Qty</b></i></Col>
                    <Col><i><b>Status</b></i></Col>
                    <Col><i><b>Options</b></i></Col>
                </Row>
            </Container><br/>
            <Container style={{color : 'white'}} className="dark-table-container">
                {orders.map(order =>
                    <>
                        <Row>
                            <Col>{order.id}</Col>
                            <Col>{order.createdDate}</Col>
                            <Col>{order.quantity}</Col>
                            <Col>{order.status}</Col>
                            <Col><Button onClick={() => viewOrder(order.referenceCode)}>View Order</Button></Col>
                        </Row><br/>
                    </>
                )}
            </Container>
        </div>
    )
}