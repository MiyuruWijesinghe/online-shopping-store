import React, {useState, useEffect} from "react";
import axios from "axios";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import AdminSideNav from "../Navbar/AdminSideNav";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function AttributeValueList(props) {

    const [attributeValues, setAttributeValues] = useState([]);
    const columns = [
        {
            dataField: 'id',
            text: 'Id',
            sort: true,
            headerStyle: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            },
            style: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            }
        },
        {
            dataField: 'attributeName',
            text: 'Attribute',
            filter: textFilter({
                style: {
                    backgroundColor: '#1a1a1a',
                    color: 'white'
                }
            }),
            headerStyle: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            },
            style: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            }
        },
        {
            dataField: 'name',
            text: 'Name',
            filter: textFilter({
                style: {
                    backgroundColor: '#1a1a1a',
                    color: 'white'
                }
            }),
            headerStyle: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            },
            style: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            }
        },
        {
            dataField: 'status',
            text: 'Status',
            filter: textFilter({
                style: {
                    backgroundColor: '#1a1a1a',
                    color: 'white'
                }
            }),
            headerStyle: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            },
            style: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            }
        },
        {
            dataField: "",
            text: 'Edit',
            formatter: viewPageLink,
            sort: true,
            headerStyle: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            },
            style: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            }
        },
        {
            dataField: "",
            text: 'Delete',
            formatter: deletePageLink,
            sort: true,
            headerStyle: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            },
            style: () => {
                return {padding: '5px', textAlign: 'center', color: 'white'};
            }
        }
    ];

    useEffect(() => {
        getAttributeValues();
    }, [])

    function getAttributeValues() {
        axios.get("https://shopping-backend-api.herokuapp.com/attribute-value/all").then((res) => {
            setAttributeValues(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function addAttributeValue() {
        props.history.push("attribute-value/add")
    }

    function viewAttributeValue(attributeValueId) {
        props.history.push("attribute-value/"+attributeValueId)
    }

    function deleteAttributeValue(attributeValueId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("https://shopping-backend-api.herokuapp.com/attribute-value/"+attributeValueId).then((res) => {
                alert(res.data.messages);
                const currentData = attributeValues.filter(attributeValue =>  attributeValue.id !== attributeValueId);
                setAttributeValues(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Delete cancelled.");
        }
    }

    function viewPageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-info btn-sm" onClick={() => viewAttributeValue(row.id)}>Edit</button>
        );
    }

    function deletePageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-danger btn-sm" onClick={() => deleteAttributeValue(row.id)}>Delete</button>
        );
    }

    return(
        <div className="main">
            <AdminSideNav />
            <div className="container mt-3 dark-table-main">
                <header>
                    <br/>
                    <div className="container dark-table-container">
                        <br/>
                        <div className="form-group row">
                            <h3 className="col-sm-3" style={{color : 'white'}}>Attribute Value</h3>
                            <div className="col-sm-5">
                                <button className="btn btn-success" onClick={() => addAttributeValue()}>+ Add New</button>
                            </div>
                        </div><br/>

                        <div className="container dark-boots-table">
                            <BootstrapTable
                                keyField='id'
                                striped
                                hover
                                data={attributeValues}
                                columns={columns}
                                filter={filterFactory()}
                                pagination={paginationFactory()}
                                classes="dark-table" />
                        </div>
                        <br/>
                    </div>
                    <br/>
                </header>
            </div>
        </div>
    )
}