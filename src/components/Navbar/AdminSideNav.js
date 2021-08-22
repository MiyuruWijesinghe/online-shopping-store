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
                    <a href="/researches-admin"><i className="fa fa-file-text-o"></i>&nbsp; Reports</a>
                    <a href="/conferences-admin"><i className="fa fa-globe"></i>&nbsp; Conference</a>
                    <a href="/conference-details-admin"><i className="fa fa-th-list"></i>&nbsp; Conference Details</a>
                    <a href="/tracks-admin"><i className="fa fa-object-group"></i>&nbsp; Tracks</a>
                    <a href="/keynote-speakers-admin"><i className="fa fa-handshake-o"></i>&nbsp; Keynote Speakers</a>
                    <a href="/researches-admin"><i className="fa fa-file-text-o"></i>&nbsp; Researches</a>
                    <a href="/workshops-admin"><i className="fa fa-code"></i>&nbsp; Workshops</a>
                    <a href="/roles"><i className="fa fa-users"></i>&nbsp; Users</a>
                    <a href="/roles"><i className="fa fa-sliders"></i>&nbsp; Roles</a>
                </div>
            </div>
        );
    }
}
export default AdminSideNav;