import React, {useState, useEffect} from "react";
import axios from "axios";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import AdminSideNav from "../Navbar/AdminSideNav";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function CategoryList(props) {

    const [categories, setCategories] = useState([]);
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
        getCategories();
    }, [])

    function getCategories() {
        axios.get("https://shopping-backend-api.herokuapp.com/category/all").then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function addCategory() {
        props.history.push("category/add")
    }

    function viewCategory(categoryId) {
        props.history.push("category-admin/"+categoryId)
    }

    function deleteCategory(categoryId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("https://shopping-backend-api.herokuapp.com/category/"+categoryId).then((res) => {
                alert(res.data.messages);
                const currentData = categories.filter(category =>  category.id !== categoryId);
                setCategories(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Delete cancelled.");
        }
    }

    function viewPageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-info btn-sm" onClick={() => viewCategory(row.id)}>Edit</button>
        );
    }

    function deletePageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(row.id)}>Delete</button>
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
                            <h3 className="col-sm-3" style={{color : 'white'}}>Category</h3>
                            <div className="col-sm-5">
                                <button className="btn btn-success" onClick={() => addCategory()}>+ Add New</button>
                            </div>
                        </div><br/>

                        <div className="container dark-boots-table">
                            <BootstrapTable
                                keyField='id'
                                striped
                                hover
                                data={categories}
                                columns={columns}
                                filter={filterFactory()}
                                pagination={paginationFactory()}
                                classes="dark-table"/>
                        </div>
                        <br/>
                    </div>
                    <br/>
                </header>
            </div>
        </div>
    )
}