import React, {useState, useEffect} from "react";
import axios from "axios";
import AdminSideNav from "../Navbar/AdminSideNav";
import appleCamera from "../../images/apple-camera.png";
import authHeader from "../../services/auth-header";

export default function ApproveRejectKeyNoteSpeaker(props) {

    const [data, setData] = useState({
        id: "",
        name: "",
        designation: "",
        description: "",
        imageURL: "",
        status: "",
        remarks: "",
        createdUser: "",
        createdDate: "",
        approvedUser: "",
        approvedDate: "",
        rejectedUser: "",
        rejectedDate: ""
    });

    useEffect(() => {
        getKeyNoteSpeaker();
    }, [])

    function getKeyNoteSpeaker() {
        const keyNoteSpeakerId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/keynote-speakers/" + keyNoteSpeakerId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function approve(e) {
        e.preventDefault();
        const keyNoteSpeakerId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/keynote-speakers/approve/" + keyNoteSpeakerId, data, {headers: authHeader()}).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/keynote-speakers-admin");
        }).catch((err) => {
            if(err.response.data.remarks !== undefined) {
                alert(err.response.data.remarks);
            } else {
                alert(err);
            }
        })
    }

    function reject(e) {
        e.preventDefault();
        const keyNoteSpeakerId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/keynote-speakers/reject/" + keyNoteSpeakerId, data, {headers: authHeader()}).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/keynote-speakers-admin");
        }).catch((err) => {
            if(err.response.data.remarks !== undefined) {
                alert(err.response.data.remarks);
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
            <AdminSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1800px'
            }}>
                <br/>
                <div className="card" style={{width : '70%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Keynote Speaker</h4>
                    </div>
                    <div className="card-body">
                        <form>
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
                                <label htmlFor="designation" className="col-sm-3">Designation</label>
                                <div className="col-sm-5">
                                    <textarea type="text" className="form-control" id="designation" cols="30" rows="6" value={data.designation} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea type="text" className="form-control" id="description" cols="30" rows="6" value={data.description} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="imageURL" className="col-sm-3">Image</label>
                                <div className="col-sm-5">
                                    <img src={ data.imageURL || appleCamera } alt="No Image" height="100" width="160" /><br />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3">Status</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="status" value={data.status} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="createdUser" className="col-sm-3">Created By</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="createdUser" value={data.createdUser} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="createdDate" className="col-sm-3">Created Date</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="createdDate" value={data.createdDate} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="approvedUser" className="col-sm-3">Approved By</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="approvedUser" value={data.approvedUser} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="approvedDate" className="col-sm-3">Approved Date</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="approvedDate" value={data.approvedDate} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="rejectedUser" className="col-sm-3">Rejected By</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="rejectedUser" value={data.rejectedUser} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="rejectedDate" className="col-sm-3">Rejected Date</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="rejectedDate" value={data.rejectedDate} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="remarks" className="col-sm-3">Remarks</label>
                                <div className="col-sm-5">
                                    <textarea onChange={(e) => handle(e)} className="form-control" id="remarks" cols="30" rows="6" placeholder="Enter Remarks" value={data.remarks} required/>
                                </div>
                            </div><br/>
                            <button onClick={(e) => approve(e)} className="btn btn-primary">Approve</button>&nbsp;
                            <button onClick={(e) => reject(e)} className="btn btn-danger">Reject</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}