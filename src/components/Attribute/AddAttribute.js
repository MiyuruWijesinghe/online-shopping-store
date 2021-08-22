import React, {useState} from "react";
import AdminSideNav from "../Navbar/AdminSideNav";
import axios from "axios";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

export default function AddAttribute(props) {

    const [name, setName] = useState("");
    const [status, setStatus] = useState("INACTIVE");
    const [checked, setChecked] = useState(false);

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            name,
            status
        }
        axios.post("https://shopping-backend-api.herokuapp.com/attribute/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/attributes");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
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
                        <h4>Attribute</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 lg-wh">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter Name" required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3 lg-wh">Status</label>
                                <div className="col-sm-5">
                                    <Switch checked={checked} onChange={handleStatus} id="status" /> {checked ? <label className="lg-wh">Active</label> : <label className="lg-wh">Inactive</label>}
                                </div>
                            </div><br/>
                            <button onClick={(e) => submit(e)} className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}