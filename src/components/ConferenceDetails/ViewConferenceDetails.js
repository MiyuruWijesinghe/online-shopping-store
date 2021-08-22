import React, {useState, useEffect} from "react";
import axios from "axios";
import EditorSideNav from "../Navbar/EditorSideNav";
import authHeader from "../../services/auth-header";

export default function ViewConferenceDetails(props) {

    const [data, setData] = useState({
        id: "",
        conferenceName: "",
        conferenceYear: "",
        topic: "",
        description: ""
    });

    useEffect(() => {
        getConferenceDetail();
    }, [])

    function getConferenceDetail() {
        const conferenceDetailsId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/conference-details/" + conferenceDetailsId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const conferenceDetailsId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/conference-details/" + conferenceDetailsId, data, {headers: authHeader()}).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/conference-details");
        }).catch((err) => {
            if(err.response.data.topic !== undefined) {
                alert(err.response.data.topic);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    return(
        <div className="main">
            <EditorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1300px'
            }}>
                <br/>
                <div className="card" style={{width : '72%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Conference Details</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div className="form-group row">
                                <label htmlFor="id" className="col-sm-3">Id</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="id" value={data.id} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="conferenceName" className="col-sm-3">Conference Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="conferenceName" value={data.conferenceName} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="conferenceYear" className="col-sm-3">Conference Year</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="conferenceYear" value={data.conferenceYear} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="topic" className="col-sm-3">Topic</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => handle(e)} id="topic" placeholder="Enter Topic" value={data.topic} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea className="form-control" onChange={(e) => handle(e)} id="description" cols="30" rows="6" placeholder="Enter Description" value={data.description} />
                                </div>
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}