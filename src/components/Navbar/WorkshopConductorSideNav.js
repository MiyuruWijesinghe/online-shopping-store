import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class WorkshopConductorSideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="sidenav" >
                    <a href="/workshop-conductor" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/workshops"><i className="fa fa-code"></i>&nbsp; Workshops</a>
                    <a href="/notifications-workshop-conductor"><i className="fa fa-bell-o"></i>&nbsp; Notifications</a>
                </div>
            </div>
        );
    }
}