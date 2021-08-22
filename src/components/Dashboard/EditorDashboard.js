import React, {useState, useEffect} from "react";
import axios from "axios";
import EditorSideNav from "../Navbar/EditorSideNav";

export default function EditorDashboard(props) {

  const [data, setData] = useState({
    totalConferences: "",
    totalConferenceDetails: "",
    totalTracks: "",
    totalKeynoteSpeakers: "",
    totalResearches: "",
    totalWorkshops: ""
  })

  useEffect(() => {
    getDashboard();
  }, [])

  function getDashboard() {
    axios.get("https://icaf-backend.herokuapp.com/dashboard/admin").then((res) => {
      setData(res.data);
    }).catch((err) => {
      alert(err);
    })
  }

  return(
      <div className="main">
        <EditorSideNav/>
        <div className="container mt-3" style={{marginLeft:"50px"}}>
          <header className="jumbotron">
            <h3>Editor Dashboard</h3><br/>
            <div className="row ">
              <div className="col-md-3">
                <div className="card-counter conf">
                  <i className="fa fa-globe"></i>
                  <span className="count-numbers"><h1>{data.totalConferences}</h1></span>
                  <span className="count-name">Conferences</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card-counter conf-det">
                  <i className="fa fa-th-list"></i>
                  <span className="count-numbers"><h1>{data.totalConferenceDetails}</h1></span>
                  <span className="count-name">Conference<br/>Details</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card-counter tracks">
                  <i className="fa fa-object-group"></i>
                  <span className="count-numbers"><h1>{data.totalTracks}</h1></span>
                  <span className="count-name">Tracks</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card-counter browns">
                  <i className="fa fa-handshake-o"></i>
                  <span className="count-numbers"><h1>{data.totalKeynoteSpeakers}</h1></span>
                  <span className="count-name">Keynote<br/>Speakers</span>
                </div>
              </div>
            </div><br/>
            <div className="row ">
              <div className="col-md-3">
                <div className="card-counter buyers">
                  <i className="fa fa-file-text-o"></i>
                  <span className="count-numbers"><h1>{data.totalResearches}</h1></span>
                  <span className="count-name">Researches</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card-counter orders">
                  <i className="fa fa-code"></i>
                  <span className="count-numbers"><h1>{data.totalWorkshops}</h1></span>
                  <span className="count-name">Workshops</span>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
  )
}