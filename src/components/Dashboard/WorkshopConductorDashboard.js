import React, {useState, useEffect} from "react";
import axios from "axios";
import WorkshopConductorSideNav from "../Navbar/WorkshopConductorSideNav";
import AuthService from "../../services/auth.service";

export default function WorkshopConductorDashboard(props) {

    const [data, setData] = useState({
        totalPendingWorkshops: "",
        totalApprovedWorkshops: "",
        totalRejectedWorkshops: ""
    })

    useEffect(() => {
        getDashboard();
    }, [])

    function getDashboard() {
        const user = AuthService.getCurrentUser();
        axios.get("https://icaf-backend.herokuapp.com/dashboard/workshop-conductor/" + user.username).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div className="main">
            <WorkshopConductorSideNav/>
            <div className="container mt-3" style={{marginLeft:"50px"}}>
                <header className="jumbotron">
                    <h3>Workshop Conductor Dashboard</h3><br/>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-counter users">
                                <i className="fa fa-file-text-o"></i>
                                <span className="count-numbers"><h1>{data.totalPendingWorkshops}</h1></span>
                                <span className="count-name">Pending<br/>Workshops</span>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card-counter conf">
                                <i className="fa fa-code"></i>
                                <span className="count-numbers"><h1>{data.totalApprovedWorkshops}</h1></span>
                                <span className="count-name">Approved<br/>Workshops</span>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card-counter blacks">
                                <i className="fa fa-window-close"></i>
                                <span className="count-numbers"><h1>{data.totalRejectedWorkshops}</h1></span>
                                <span className="count-name">Rejected<br/>Workshops</span>
                            </div>
                        </div>
                    </div><br/>
                </header>
            </div>
        </div>
    )
}