import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {InputGroup, FormControl, Button} from 'react-bootstrap';

export default function CategoryListFront(props) {

    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(6);

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        axios.get("https://shopping-backend-api.herokuapp.com/category/status/ACTIVE").then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewItems(categoryId) {
        props.history.push("common-items/"+categoryId);
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
        if(currentPage < Math.ceil(categories.length / recordsPerPage)) {
            setCurrentPage(Math.ceil(categories.length / recordsPerPage));
        }
    }

    function nextPage() {
        if(currentPage < Math.ceil(categories.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = categories.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(categories.length / recordsPerPage);

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
                                <h1 className="home-h1">Our Categories</h1>
                            </div>
                        </div>
                        <div className="row">
                            {
                                categories.length === 0 ?
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <h1 className="home-h1">No Records Available</h1>
                                        </div>
                                    </div>
                                    :
                                    currentRecords.map((category, index) => (
                                        <div className="col-md-4">
                                            <Link style={{textDecoration : 'none'}} onClick={() => viewItems(category.id)}>
                                            <div className="card bg-dark fr-key-card">
                                                <img className="card-img-top fr-track-card-img" src={category.imageURL} alt="No image" />
                                                <div className="card-body">
                                                    <center><h5>{category.name}</h5></center>
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
