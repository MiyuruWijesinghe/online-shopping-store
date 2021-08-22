import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class ResearcherSideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="sidenav" >
                    <a href="/researcher" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/researches"><i className="fa fa-file-text-o"></i>&nbsp; Researches</a>
                    <a href="/notifications-researcher"><i className="fa fa-bell-o"></i>&nbsp; Notifications</a>
                </div>
            </div>
        );
    }
}