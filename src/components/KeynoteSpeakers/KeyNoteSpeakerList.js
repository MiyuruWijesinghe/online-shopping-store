import React, {useState, useEffect} from "react";
import axios from "axios";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import EditorSideNav from "../Navbar/EditorSideNav";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function KeyNoteSpeakerList(props) {

    const [keyNoteSpeakers, setKeyNoteSpeakers] = useState([]);
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
                text: 'All', value: keyNoteSpeakers.length
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
        getKeyNoteSpeakers();
    }, [])

    function getKeyNoteSpeakers() {
        axios.get("https://icaf-backend.herokuapp.com/keynote-speakers/all").then((res) => {
            setKeyNoteSpeakers(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function addKeyNoteSpeaker() {
        props.history.push("keynote-speaker/add")
    }

    function viewKeyNoteSpeaker(keyNoteSpeakerId) {
        props.history.push("keynote-speaker/"+keyNoteSpeakerId)
    }

    function deleteKeyNoteSpeaker(keyNoteSpeakerId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("https://icaf-backend.herokuapp.com/keynote-speakers/"+keyNoteSpeakerId).then((res) => {
                alert(res.data.messages);
                const currentData = keyNoteSpeakers.filter(keyNoteSpeaker =>  keyNoteSpeaker.id !== keyNoteSpeakerId);
                setKeyNoteSpeakers(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Delete cancelled.");
        }
    }

    function viewPageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-info btn-sm" onClick={() => viewKeyNoteSpeaker(row.id)}>Edit</button>
        );
    }

    function deletePageLink(cell, row, rowIndex, formatExtraData) {
        return (
            <button className="btn btn-danger btn-sm" onClick={() => deleteKeyNoteSpeaker(row.id)}>Delete</button>
        );
    }

    return(
        <div className="main">
            <EditorSideNav />
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
                            <h3 className="col-sm-4">Keynote Speakers List</h3>
                            <div className="col-sm-5">
                                <button className="btn btn-success" onClick={() => addKeyNoteSpeaker()}>+ Add Keynote Speaker</button>
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
                                data={keyNoteSpeakers}
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