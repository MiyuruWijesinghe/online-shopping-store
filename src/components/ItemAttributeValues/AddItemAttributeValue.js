import React, {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";

export default function AddItemAttributeValue(props) {

    const [attributeValueList, setAttributeValueList] = useState([]);
    const [attributeValueOptionsList, setAttributeValueOptionsList] = useState([]);
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [attributeValueId, setAttributeValueId] = useState("");
    const [status, setStatus] = useState("INACTIVE");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getItem();
    }, [])

    function getItem() {
        //const itemId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item/"+1).then((res) => {
            console.log(res.data);
            setItemId(res.data.id);
            setItemName(res.data.name);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        getAttributeValues();
    }, [])

    function getAttributeValues() {
        axios.get("https://shopping-backend-api.herokuapp.com/attribute-value/status/ACTIVE").then((res) => {
            setAttributeValueList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(attributeValueList.length > 0) {
            setAttributeValueOptionValues();
        }
    }, [attributeValueList])

    function setAttributeValueOptionValues() {
        const gotOptions = attributeValueList.map((attributeValue, index) => ({
            value : attributeValue.id,
            label : attributeValue.name
        }))
        setAttributeValueOptionsList(gotOptions)
    }

    function onAttributeValueSelect(e) {
        setAttributeValueId(e.value);
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            itemId,
            attributeValueId,
            status
        }
        axios.post("https://shopping-backend-api.herokuapp.com/item-attribute-value/save", dataObject, {headers: authHeader()}).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);

        }).catch((err) => {
            if(err.response.data.itemId !== undefined) {
                alert(err.response.data.itemId);
            } else if(err.response.data.attributeValueId !== undefined) {
                alert(err.response.data.attributeValueId);
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

    function customTheme(theme) {
        return{
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange'
            }
        }
    }

    return(
        <div className="main">
            <div className="container">
                <br/>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content dark-model">
                            <div className="modal-header dark-card-header">
                                <h4 className="modal-title">Item Attribute Value</h4>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">X</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => submit(e)}>
                                    <div className="form-group row">
                                        <label htmlFor="itemName" className="col-sm-3 lg-wh">Item</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="itemName" value={itemName} readOnly/>
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label htmlFor="attributeValueId" className="col-sm-3 lg-wh">Attribute Value</label>
                                        <div className="col-sm-5">
                                            <Select options={attributeValueOptionsList} onChange={(e) => onAttributeValueSelect(e)} id="attributeValueId" placeholder="Select Attribute Value" single autoFocus isSearchable theme={customTheme} />
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-3 lg-wh">Status</label>
                                        <div className="col-sm-5">
                                            <Switch checked={checked} onChange={handleStatus} id="status" /> {checked ? <label className="lg-wh">Active</label> : <label className="lg-wh">Inactive</label>}
                                        </div>
                                    </div><br/>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}