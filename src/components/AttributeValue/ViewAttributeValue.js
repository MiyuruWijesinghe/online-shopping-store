import React, {useState, useEffect} from "react";
import axios from "axios";
import AdminSideNav from "../Navbar/AdminSideNav";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

export default function ViewAttributeValue(props) {

    const [id, setId] = useState("");
    const [attributeId, setAttributeId] = useState("");
    const [attributeName, setAttributeName] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getAttributeValue();
    }, [])

    function getAttributeValue() {
        const attributeValueId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/attribute-value/" + attributeValueId).then((res) => {
            console.log(res.data);
            setId(res.data.id);
            setAttributeId(res.data.attributeId);
            setAttributeName(res.data.attributeName);
            setName(res.data.name);
            setStatus(res.data.status);
            initialStatus(res.data.status);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            attributeId,
            name,
            status
        }
        const attributeValueId = props.match.params.id;
        axios.put("https://shopping-backend-api.herokuapp.com/attribute-value/" + attributeValueId, dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/attribute-values");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if(err.response.data.attributeId !== undefined) {
                alert(err.response.data.attributeId);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function initialStatus(pStatus) {
        if (pStatus == 'ACTIVE') {
            setChecked(true);
            setStatus('ACTIVE');
        } else {
            setChecked(false);
            setStatus('INACTIVE');
        }
    }

    function handleStatus() {
        if (checked) {
            setChecked(false);
            setStatus('INACTIVE');
        } else {
            setChecked(true);
            setStatus('ACTIVE');
        }
    }

    return(
        <div className="main">
            <AdminSideNav />
            <div className="container dark-form-main">
                <br/>
                <div className="card dark-card">
                    <div className="card-header dark-card-header">
                        <h4>Attribute Value</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="id" className="col-sm-3 lg-wh">Id</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="id" value={id} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="attributeName" className="col-sm-3 lg-wh">Attribute</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="attributeName" value={attributeName} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 lg-wh">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter Name" value={name} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3 lg-wh">Status</label>
                                <div className="col-sm-5">
                                    <Switch checked={checked} onChange={handleStatus} id="status" /> {checked ? <label className="lg-wh">Active</label> : <label className="lg-wh">Inactive</label>}
                                </div>
                            </div><br/>
                            <button onClick={(e) => submit(e)} className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}