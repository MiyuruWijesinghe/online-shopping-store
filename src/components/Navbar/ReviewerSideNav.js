import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class ReviewerSideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="sidenav" >
                    <a href="/reviewer" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/researches-reviewer"><i className="fa fa-file-text-o"></i>&nbsp; Researches</a>
                    <a href="/workshops-reviewer"><i className="fa fa-code"></i>&nbsp; Workshops</a>
                </div>
            </div>
        );
    }
}