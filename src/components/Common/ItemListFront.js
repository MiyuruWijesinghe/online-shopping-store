import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

export default function ItemListFront(props) {

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(6);
    const [categoryTopic, setCategoryTopic] = useState("");

    useEffect(() => {
        getItems();
    }, [])

    function getItems() {
        const categoryId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/item/category/"+categoryId).then((res) => {
            setItems(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        getCategory();
    }, [])

    function getCategory() {
        const categoryId = props.match.params.id;
        axios.get("https://shopping-backend-api.herokuapp.com/category/"+categoryId).then((res) => {
            setCategoryTopic(res.data.name);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewItem(itemId) {
        props.history.push("/view-item/"+itemId);
        window.location.reload(false);
    }

    function changePage(e) {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
    }

    function firstPage() {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function lastPage() {
        if(currentPage < Math.ceil(items.length / recordsPerPage)) {
            setCurrentPage(Math.ceil(items.length / recordsPerPage));
        }
    }

    function nextPage() {
        if(currentPage < Math.ceil(items.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = items.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(items.length / recordsPerPage);

    const selectedPageCss = {
        width: "45px",
        height: "45px",
        border: "1px solid #FFFFFF",
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold"
    };

    return(
        <div>
            <Header/>
            <div className="card py-5 border-0 px-0 mx-0 front-image">
                <div className="card-body text-center">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1 className="home-h1">{categoryTopic}</h1>
                        </div>
                    </div>
                    <div className="row">
                        {
                            items.length === 0 ?
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <h1 className="home-h1">No Records Available</h1>
                                    </div>
                                </div>
                                :
                                currentRecords.map((item, index) => (
                                    <div className="col-md-4">
                                        <Link style={{textDecoration : 'none'}} onClick={() => viewItem(item.id)}>
                                            <div className="card bg-dark fr-item-card">
                                                <img className="card-img-top fr-track-card-img" src={item.imageURL1} alt="No image" />
                                                <div className="card-body">
                                                    <h5 align="left">{item.name}</h5>
                                                    <p align="left"><b>Rs.&nbsp; {(Math.round(item.price * 100) / 100).toFixed(2) - (Math.round(item.discount * 100) / 100).toFixed(2)}</b></p>
                                                    <p align="left"><b><strike>Rs.&nbsp; {(Math.round(item.price * 100) / 100).toFixed(2)}</strike></b></p>
                                                    <p align="left"><Rating name="half-rating-read" defaultValue={2} precision={0.5} readOnly />&nbsp; (2)</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                        }
                    </div><br/>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="light" disabled={currentPage === 1 ? true : false} onClick={firstPage}>
                                        <i className="fa fa-fast-backward"></i> First
                                    </Button>
                                    <Button type="button" variant="light" disabled={currentPage === 1 ? true : false} onClick={prevPage}>
                                        <i className="fa fa-step-backward"></i> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={selectedPageCss} className={"bg-primary"} name="currentPage" value={currentPage} onChange={changePage}/>
                                <InputGroup.Append>
                                    <Button type="button" variant="light" disabled={currentPage === totalPages ? true : false} onClick={nextPage}>
                                        <i className="fa fa-step-forward"></i> Next
                                    </Button>
                                    <Button type="button" variant="light" disabled={currentPage === totalPages ? true : false} onClick={lastPage}>
                                        <i className="fa fa-fast-forward"></i>  Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
