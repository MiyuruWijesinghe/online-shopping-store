import React, {useState, useEffect} from "react";
import axios from "axios";
import ResearcherSideNav from "../Navbar/ResearcherSideNav";
import AuthService from "../../services/auth.service";

export default function ResearcherDashboard(props) {

    const [data, setData] = useState({
        totalPendingResearches: "",
        totalApprovedResearches: "",
        totalRejectedResearches: ""
    })

    useEffect(() => {
        getDashboard();
    }, [])

    function getDashboard() {
        const user = AuthService.getCurrentUser();
        axios.get("https://icaf-backend.herokuapp.com/dashboard/researcher/" + user.username).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="main">
            <ResearcherSideNav/>
            <div className="container mt-3" style={{marginLeft:"50px"}}>
                <header className="jumbotron">
                    <h3>Researcher Dashboard</h3><br/>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-counter users">
                                <i className="fa fa-file-text-o"></i>
                                <span className="count-numbers"><h1>{data.totalPendingResearches}</h1></span>
                                <span className="count-name">Pending<br/>Researches</span>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card-counter orders">
                                <i className="fa fa-file-text-o"></i>
                                <span className="count-numbers"><h1>{data.totalApprovedResearches}</h1></span>
                                <span className="count-name">Approved<br/>Researches</span>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card-counter blacks">
                                <i className="fa fa-window-close-o"></i>
                                <span className="count-numbers"><h1>{data.totalRejectedResearches}</h1></span>
                                <span className="count-name">Rejected<br/>Researches</span>
                            </div>
                        </div>
                    </div><br/>
                </header>
            </div>
        </div>
    )
}