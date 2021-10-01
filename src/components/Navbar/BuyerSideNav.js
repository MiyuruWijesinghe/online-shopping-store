import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export class BuyerSideNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className="sidenav">
                    <a href="/buyer" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/buyer-profile" ><i className="fa fa-dashboard"></i>&nbsp; Profile</a>
                    <a href="/buyer-orders" ><i className="fa fa-dashboard"></i>&nbsp; Orders</a>
                </div>
            </div>
        );
    }
}
export default BuyerSideNav;