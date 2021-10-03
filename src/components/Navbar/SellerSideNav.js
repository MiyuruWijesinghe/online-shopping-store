import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export class SellerSideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="sidenav" >
                    <a href="/seller" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/items-seller"><i className="fa fa-shopping-cart"></i>&nbsp; Item</a>
                    <a href="/admin-report"><i className="fa fa-file-text-o"></i>&nbsp; Reports</a>
                </div>
            </div>
        );
    }
}
export default SellerSideNav;
