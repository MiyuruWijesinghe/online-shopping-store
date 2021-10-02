import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export class AdminSideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="sidenav" >
                    <a href="/admin" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/categories-admin"><i className="fa fa-th-list"></i>&nbsp; Category</a>
                    <a href="/brands"><i className="fa fa-gift"></i>&nbsp; Brand</a>
                    <a href="/attributes"><i className="fa fa-list-alt"></i>&nbsp; Attribute</a>
                    <a href="/attribute-values"><i className="fa fa-list-ol"></i>&nbsp; Attribute Values</a>
                    <a href="/items-admin"><i className="fa fa-shopping-cart"></i>&nbsp; Item</a>
                    <a href="/admin-report"><i className="fa fa-file-text-o"></i>&nbsp; Reports</a>
                    <a href="/roles"><i className="fa fa-users"></i>&nbsp; Admins</a>
                </div>
            </div>
        );
    }
}
export default AdminSideNav;
