import React, {useState, useEffect} from "react";
import axios from "axios";
import EditorSideNav from "../Navbar/EditorSideNav";

export default function ViewNotificationEditor(props) {

    const [data, setData] = useState({
        type: "",
        description: "",
        remarks: ""
    })

    useEffect(() => {
        getNotification();
    }, [])

    function getNotification() {
        const notificationId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/notifications/" + notificationId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        props.history.push("/notifications-editor");
    }

    return(
        <div className="main">
            <EditorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1000px'
            }}>
                <br/>
                <div className="card" style={{width : '60%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Approval for {data.type}</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div style={{backgroundColor : '#e6ccff', borderRadius: '5px'}}>
                                <div className="form-group row" style={{marginLeft : '15px'}}>
                                    <label htmlFor="description" id="description">{data.description}</label>
                                </div>
                                <div className="form-group row" style={{marginLeft : '15px'}}>
                                    <label><b>Remarks : </b>&nbsp;</label>
                                    <label htmlFor="description" id="description">{data.remarks}</label>
                                </div><br/>
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Okay</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}