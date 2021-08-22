import React, {useState, useEffect} from "react";
import axios from "axios";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import AdminSideNav from "../Navbar/AdminSideNav";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import AddItemAttributeValue from "./AddItemAttributeValue";

export default function ItemAttributeValueList(props) {

    const [itemAttributeValues, setItemAttributeValues] = useState([]);
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
            dataField: 'itemName',
            text: 'Item',
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
            dataField: 'attributeValue',
            text: 'Value',
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
        getItemAttributeValues();
    }, [])

    function getItemAttributeValues() {
        const itemId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item-attribute-value/item/"+itemId).then((res) => {
            setItemAttributeValues(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewItemAttributeValue(itemAttributeValueId) {
        props.history.push("item-attribute-value/"+itemAttributeValueId)
    }

    function deleteItemAttributeValue(itemAttributeValueId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("https://shopping-backend-api.herokuapp.com/item-attribute-value/"+itemAttributeValueId).then((res) => {
                alert(res.data.messages);
                const currentData = itemAttributeValues.filter(itemAttributeValue =>  itemAttributeValue.id !== itemAttributeValueId);
                setItemAttributeValues(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Delete cancelled.");
        }
    }

    function viewPageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-info btn-sm" onClick={() => viewItemAttributeValue(row.id)}>Edit</button>
        );
    }

    function deletePageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-danger btn-sm" onClick={() => deleteItemAttributeValue(row.id)}>Delete</button>
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
                            <h3 className="col-sm-4" style={{color : 'white'}}>Item Attribute Value</h3>
                            <div className="col-sm-5">
                                <button className="btn btn-success" data-toggle="modal" data-target="#myModal">+ Add New</button>
                            </div>
                        </div><br/>

                        <div className="container dark-boots-table">
                            <BootstrapTable
                                keyField='id'
                                striped
                                hover
                                data={itemAttributeValues}
                                columns={columns}
                                filter={filterFactory()}
                                pagination={paginationFactory()}
                                classes="dark-table" />
                        </div>
                        <br/>
                        <AddItemAttributeValue/>
                    </div>
                    <br/>
                </header>
            </div>
        </div>
    )
}