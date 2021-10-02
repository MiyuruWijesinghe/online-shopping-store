import React, {useState, useEffect} from "react";
import axios from "axios";
import BuyerSideNav from "../Navbar/BuyerSideNav";
import authService from "../../services/auth.service";
import { Image, Col } from "react-bootstrap";

export default function BuyerDashboard(props) {

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
        console.log(data.userImage + "hhhh")
    }

    return(
        <div className="main">
            <BuyerSideNav/>
            <div className="container mt-3 dark-table-main">
                <header>
                    <br/>
                    <div className="container dark-table-container">
                        <br/>
                        <div className="row">
                            <Col xs={3} style={{marginLeft:"3%"}}>
                                <Image src={data.userImage} rounded alt="No Image" width="120px"/>
                            </Col>
                            <div className="col">
                                <h4 className="col" style={{color : 'white'}}>{data.username}</h4>
                            </div>
                        </div>
                        <div className="container dark-boots-table">
                            <div className="row">
                                <div className="col-md-3">
                                    <a href="/buyer-profile">
                                        <div className="card-counter conf">
                                            <i className="fa fa-user-circle-o"></i>
                                            <span className="count-name">Profile</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/buyer-orders">
                                        <div className="card-counter conf">
                                            <i className="fa fa-gift"></i>
                                            <div className="card-body"><span className="count-name">Orders</span></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}