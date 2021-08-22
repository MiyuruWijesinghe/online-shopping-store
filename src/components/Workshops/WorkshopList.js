import React, {useState, useEffect} from "react";
import axios from "axios";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import WorkshopConductorSideNav from "../Navbar/WorkshopConductorSideNav";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import AuthService from "../../services/auth.service";

export default function WorkshopList(props) {

    const [workshops, setWorkshops] = useState([]);
    const columns = [
        {
            dataField: 'id',
            text: 'Id',
            sort: true,
            headerStyle: (column, colIndex) => {
                return {padding: '5px', textAlign: 'center'};
            }
        },
        {
            dataField: 'name',
            text: 'Name',
            filter: textFilter(),
            headerStyle: (column, colIndex) => {
                return {padding: '5px', textAlign: 'center'};
            }
        },
        {
            dataField: 'status',
            text: 'Status',
            filter: textFilter(),
            headerStyle: (column, colIndex) => {
                return {padding: '5px', textAlign: 'center'};
            }
        },
        {
            dataField: "",
            text: 'Edit',
            formatter: viewPageLink,
            sort: true,
            headerStyle: (column, colIndex) => {
                return {padding: '5px', textAlign: 'center'};
            }
        },
        {
            dataField: "",
            text: 'Delete',
            formatter: deletePageLink,
            sort: true,
            headerStyle: (column, colIndex) => {
                return {padding: '5px', textAlign: 'center'};
            }
        }
    ];
    const options = {
        page: 0,
        sizePerPageList: [
            {
                text: '5', value: 5
            },
            {
                text: '10', value: 10
            },
            {
                text: 'All', value: workshops.length
            }
        ],
        sizePerPage: 5,
        pageStartIndex: 0,
        paginationSize: 3,
        prePage: 'Prev',
        nextPage: 'Next',
        firstPage: 'First',
        lastPage: 'Last',
        paginationPosition: 'top'
    };

    useEffect(() => {
        getWorkshops();
    }, [])

    function getWorkshops() {
        const user = AuthService.getCurrentUser();
        axios.get("https://icaf-backend.herokuapp.com/workshops/created-user/" + user.username).then((res) => {
            setWorkshops(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function addWorkshop() {
        props.history.push("workshop/add")
    }

    function viewWorkshop(workshopId) {
        props.history.push("workshop/"+workshopId)
    }

    function deleteWorkshop(workshopId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("https://icaf-backend.herokuapp.com/workshops/"+workshopId).then((res) => {
                alert(res.data.messages);
                const currentData = workshops.filter(workshop =>  workshop.id !== workshopId);
                setWorkshops(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Delete cancelled.");
        }
    }

    function viewPageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-info btn-sm" onClick={() => viewWorkshop(row.id)}>Edit</button>
        );
    }

    function deletePageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-danger btn-sm" onClick={() => deleteWorkshop(row.id)}>Delete</button>
        );
    }

    return(
        <div className="main">
            <WorkshopConductorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ffffff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px'
            }}>
                <header>
                    <br/>
                    <div className="container" style={{background : '#ccccff', borderRadius : '8px'}}>
                        <br/>
                        <div className="form-group row">
                            <h3 className="col-sm-3">Workshops List</h3>
                            <div className="col-sm-5">
                                <button className="btn btn-success" onClick={() => addWorkshop()}>+ Add Workshop</button>
                            </div>
                        </div><br/>

                        <div className="container" style={{
                            borderRadius: "10px",
                            padding: "10px",
                            backgroundColor: "white",
                            marginTop: "10px"
                        }}>
                            <BootstrapTable
                                keyField='id'
                                striped
                                hover
                                data={workshops}
                                columns={columns}
                                filter={filterFactory()}
                                pagination={paginationFactory(options)} />
                        </div>
                        <br/>
                    </div>
                    <br/>
                </header>
            </div>
        </div>
    )
}