import React, { useEffect, useState } from "react";
import AdminSideNav from "../Navbar/SellerSideNav";
import axios from "axios";
import Select from "react-select";
import authHeader from "../../services/auth-header";
import Switch from "react-switch";
import { storage } from "../../firebase";
import appleCamera from "../../images/apple-camera.png";

export default function AddItem(props) {

    const [categoryList, setCategoryList] = useState([]);
    const [categoryOptionsList, setCategoryOptionsList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [brandOptionsList, setBrandOptionsList] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [imageURL1, setImageURL1] = useState("");
    const [imageURL2, setImageURL2] = useState("");
    const [imageURL3, setImageURL3] = useState("");
    const [imageURL4, setImageURL4] = useState("");
    const [imageURL5, setImageURL5] = useState("");
    const [outOfStock, setOutOfStock] = useState("NO");
    const [status, setStatus] = useState("INACTIVE");
    const [checkedStatus, setCheckedStatus] = useState(false);
    const [checkedStock, setCheckedStock] = useState(false);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [progress1, setProgress1] = useState('');
    const [progress2, setProgress2] = useState('');
    const [progress3, setProgress3] = useState('');
    const [progress4, setProgress4] = useState('');
    const [progress5, setProgress5] = useState('');

    useEffect(() => {
        getCategory();
    }, [])

    function getCategory() {
        axios.get("https://shopping-backend-api.herokuapp.com/category/status/ACTIVE").then((res) => {
            setCategoryList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if (categoryList.length > 0) {
            setCategoryOptionValues();
        }
    }, [categoryList])

    function setCategoryOptionValues() {
        const gotOptions = categoryList.map((category, index) => ({
            value: category.id,
            label: category.name
        }))
        setCategoryOptionsList(gotOptions)
    }

    useEffect(() => {
        getBrand();
    }, [])

    function getBrand() {
        axios.get("https://shopping-backend-api.herokuapp.com/brand/status/ACTIVE").then((res) => {
            setBrandList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if (brandList.length > 0) {
            setBrandOptionValues();
        }
    }, [brandList])

    function setBrandOptionValues() {
        const gotOptions = brandList.map((brand, index) => ({
            value: brand.id,
            label: brand.name
        }))
        setBrandOptionsList(gotOptions)
    }

    function onCategorySelect(e) {
        setCategoryId(e.value);
    }

    function onBrandSelect(e) {
        setBrandId(e.value);
    }

    function handleImage1Change(e) {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImage1(imageFile)
        }
    }

    function handleImage2Change(e) {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImage2(imageFile)
        }
    }

    function handleImage3Change(e) {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImage3(imageFile)
        }
    }

    function handleImage4Change(e) {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImage4(imageFile)
        }
    }

    function handleImage5Change(e) {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImage5(imageFile)
        }
    }

    function handleImage1Upload(e) {
        e.preventDefault();
        if (image1 == null) {
            alert("Please select an image for image 1!");
        } else {
            const uploadTask = storage.ref(`Tracks/${image1.name}`).put(image1);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress1(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Tracks').child(image1.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setImageURL1(uploadedURL);
                        alert("Image 1 uploaded successfully.")
                    })
                });
        }
    }

    function handleImage2Upload(e) {
        e.preventDefault();
        if (image2 == null) {
            alert("Please select an image for image 2!");
        } else {
            const uploadTask = storage.ref(`Tracks/${image2.name}`).put(image2);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress2(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Tracks').child(image2.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setImageURL2(uploadedURL);
                        alert("Image 2 uploaded successfully.")
                    })
                });
        }
    }

    function handleImage3Upload(e) {
        e.preventDefault();
        if (image3 == null) {
            alert("Please select an image for image 3!");
        } else {
            const uploadTask = storage.ref(`Tracks/${image3.name}`).put(image3);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress3(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Tracks').child(image3.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setImageURL3(uploadedURL);
                        alert("Image 3 uploaded successfully.")
                    })
                });
        }
    }

    function handleImage4Upload(e) {
        e.preventDefault();
        if (image4 == null) {
            alert("Please select an image for image 4!");
        } else {
            const uploadTask = storage.ref(`Tracks/${image4.name}`).put(image4);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress4(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Tracks').child(image4.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setImageURL4(uploadedURL);
                        alert("Image 4 uploaded successfully.")
                    })
                });
        }
    }

    function handleImage5Upload(e) {
        e.preventDefault();
        if (image5 == null) {
            alert("Please select an image for image 5!");
        } else {
            const uploadTask = storage.ref(`Tracks/${image5.name}`).put(image5);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress5(progressValue);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('Tracks').child(image5.name).getDownloadURL().then(url => {
                        console.log(url);
                        const uploadedURL = url;
                        setImageURL5(uploadedURL);
                        alert("Image 5 uploaded successfully.")
                    })
                });
        }
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            categoryId,
            brandId,
            name,
            code,
            description,
            price,
            discount,
            imageURL1,
            imageURL2,
            imageURL3,
            imageURL4,
            imageURL5,
            outOfStock,
            status
        }
        axios.post("https://shopping-backend-api.herokuapp.com/item/save", dataObject, { headers: authHeader() }).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/items-admin");
        }).catch((err) => {
            if (err.response.data.categoryId !== undefined) {
                alert(err.response.data.categoryId);
            } else if (err.response.data.brandId !== undefined) {
                alert(err.response.data.brandId);
            } else if (err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if (err.response.data.code !== undefined) {
                alert(err.response.data.code);
            } else if (err.response.data.status !== undefined) {
                alert(err.response.data.status);
            } else if (err.response.data.outOfStock !== undefined) {
                alert(err.response.data.outOfStock);
            } else if (err.response.data.price !== undefined) {
                alert(err.response.data.price);
            } else if (err.response.data.discount !== undefined) {
                alert(err.response.data.discount);
            } else if (err.response.data.imageURL1 !== undefined) {
                alert(err.response.data.imageURL1);
            } else if (err.response.data.imageURL2 !== undefined) {
                alert(err.response.data.imageURL2);
            } else if (err.response.data.imageURL3 !== undefined) {
                alert(err.response.data.imageURL3);
            } else if (err.response.data.imageURL4 !== undefined) {
                alert(err.response.data.imageURL4);
            } else if (err.response.data.imageURL5 !== undefined) {
                alert(err.response.data.imageURL5);
            } else if (err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function handleStatus() {
        if (checkedStatus) {
            setCheckedStatus(false);
            setStatus('INACTIVE');
        } else {
            setCheckedStatus(true);
            setStatus('ACTIVE');
        }
    }

    function handleOutOfStock() {
        if (checkedStock) {
            setCheckedStock(false);
            setOutOfStock('NO');
        } else {
            setCheckedStock(true);
            setOutOfStock('YES');
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
                        <h4>Item</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div className="form-group row">
                                <label htmlFor="categoryId" className="col-sm-3 lg-wh">Category</label>
                                <div className="col-sm-5">
                                    <Select options={categoryOptionsList} onChange={(e) => onCategorySelect(e)} id="categoryId" placeholder="Select Category" single autoFocus isSearchable theme={customTheme} />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="brandId" className="col-sm-3 lg-wh">Brand</label>
                                <div className="col-sm-5">
                                    <Select options={brandOptionsList} onChange={(e) => onBrandSelect(e)} id="brandId" placeholder="Select Brand" single autoFocus isSearchable theme={customTheme} />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 lg-wh">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter Name" required />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="code" className="col-sm-3 lg-wh">Code</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setCode(e.target.value)} className="form-control" id="code" placeholder="Enter Code" required />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3 lg-wh">Description</label>
                                <div className="col-sm-5">
                                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" cols="30" rows="6" placeholder="Enter Description" />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="price" className="col-sm-3 lg-wh">Price</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setPrice(e.target.value)} className="form-control" id="price" placeholder="Enter Price" required />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="discount" className="col-sm-3 lg-wh">Discount</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => setDiscount(e.target.value)} className="form-control" id="discount" placeholder="Enter Discount" required />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="outOfStock" className="col-sm-3 lg-wh">Out of Stock</label>
                                <div className="col-sm-5">
                                    <Switch checked={checkedStock} onChange={handleOutOfStock} id="outOfStock" /> {checkedStock ? <label className="lg-wh">Yes</label> : <label className="lg-wh">No</label>}
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3 lg-wh">Status</label>
                                <div className="col-sm-5">
                                    <Switch checked={checkedStatus} onChange={handleStatus} id="status" /> {checkedStatus ? <label className="lg-wh">Active</label> : <label className="lg-wh">Inactive</label>}
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="imageURL1" className="col-sm-3 lg-wh">Image 1</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleImage1Change(e)} className="form-control file-box" id="imageURL1" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleImage1Upload(e)} className="btn btn-success">Upload</button>
                                </div>
                                <div className="col">
                                    <img src={imageURL1 || appleCamera} alt="No Image" height="100" width="160" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress1} max="100" />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="imageURL2" className="col-sm-3 lg-wh">Image 2</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleImage2Change(e)} className="form-control file-box" id="imageURL2" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleImage2Upload(e)} className="btn btn-success">Upload</button>
                                </div>
                                <div className="col">
                                    <img src={imageURL2 || appleCamera} alt="No Image" height="100" width="160" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress2} max="100" />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="imageURL3" className="col-sm-3 lg-wh">Image 3</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleImage3Change(e)} className="form-control file-box" id="imageURL3" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleImage3Upload(e)} className="btn btn-success">Upload</button>
                                </div>
                                <div className="col">
                                    <img src={imageURL3 || appleCamera} alt="No Image" height="100" width="160" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress3} max="100" />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="imageURL4" className="col-sm-3 lg-wh">Image 4</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleImage4Change(e)} className="form-control file-box" id="imageURL4" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleImage4Upload(e)} className="btn btn-success">Upload</button>
                                </div>
                                <div className="col">
                                    <img src={imageURL4 || appleCamera} alt="No Image" height="100" width="160" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress4} max="100" />
                                </div>
                            </div><br />
                            <div className="form-group row">
                                <label htmlFor="imageURL5" className="col-sm-3 lg-wh">Image 5</label>
                                <div className="col-sm-5">
                                    <input type="file" onChange={(e) => handleImage5Change(e)} className="form-control file-box" id="imageURL5" />
                                </div>
                                <div className="col">
                                    <button onClick={(e) => handleImage5Upload(e)} className="btn btn-success">Upload</button>
                                </div>
                                <div className="col">
                                    <img src={imageURL5 || appleCamera} alt="No Image" height="100" width="160" /><br />
                                    <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={progress5} max="100" />
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