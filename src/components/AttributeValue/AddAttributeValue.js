import React, { useEffect, useState } from "react";
import AdminSideNav from "../Navbar/AdminSideNav";
import axios from "axios";
import Select from "react-select";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

export default function AddAttributeValue(props) {

    const [attributeList, setAttributeList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [attributeId, setAttributeId] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("INACTIVE");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getAttribute();
    }, [])

    function getAttribute() {
        axios.get("https://shopping-backend-api.herokuapp.com/attribute/status/ACTIVE").then((res) => {
            setAttributeList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if (attributeList.length > 0) {
            setOptionValues();
        }
    }, [attributeList])

    function setOptionValues() {
        const gotOptions = attributeList.map((attribute, index) => ({
            value: attribute.id,
            label: attribute.name
        }))
        setOptionsList(gotOptions)
    }

    function onSelect(e) {
        setAttributeId(e.value);
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            attributeId,
            name,
            status
        }
        axios.post("https://shopping-backend-api.herokuapp.com/attribute-value/save", dataObject, { headers: authHeader() }).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/attribute-values");
        }).catch((err) => {
            if (err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if (err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if (err.response.data.attributeId !== undefined) {
                alert(err.response.data.attributeId);
            } else if (err.response.data.message !== undefined) {
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

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange'
            }
        }
    }

    return (
        <div className="main">
            <AdminSideNav />
            <div className="container dark-form-main">
                <br />
                <div className="card dark-card">
                    <div className="card-header dark-card-header">
                        <h4>Attribute Value</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div className="form-group row">
                                <label htmlFor="attributeId" className="col-sm-3 lg-wh">Attribute</label>
                                <div className="col-sm-5">
                                    <Select options={optionsList} onChange={(e) => onSelect(e)} id="attributeId" placeholder="Select Attribute" single autoFocus isSearchable theme={customTheme} />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 lg-wh">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter Name" required />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3 lg-wh">Status</label>
                                <div className="col-sm-5">
                                    <Switch checked={checked} onChange={handleStatus} id="status" /> {checked ? <label className="lg-wh">Active</label> : <label className="lg-wh">Inactive</label>}
                                </div>
                            </div><br />
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}