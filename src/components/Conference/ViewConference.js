import React, {useState, useEffect} from "react";
import axios from "axios";
import EditorSideNav from "../Navbar/EditorSideNav";

export default function ViewConference(props) {

    const [data, setData] = useState({
        id: "",
        name: "",
        year: "",
        description: "",
        venue: "",
        payment: "",
        status: ""
    });

    useEffect(() => {
        getConference();
    }, [])

    function getConference() {
        const conferenceId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/conference/" + conferenceId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        props.history.push("/conferences");
    }

    return(
        <div className="main">
            <EditorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1000px'
            }}>
                <br/>
                <div className="card" style={{width : '70%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Conference</h4>
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
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="name" value={data.name} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="year" className="col-sm-3">Year</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="year" value={data.year} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="venue" className="col-sm-3">Venue</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="venue" value={data.venue} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="payment" className="col-sm-3">Payment</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="payment" value={data.payment} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea type="text" className="form-control" id="description" cols="30" rows="6" value={data.description} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3">Status</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="status" value={data.status} readOnly/>
                                </div>
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Okay</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}