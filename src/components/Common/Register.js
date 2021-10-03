import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";
import { isEmail } from "validator";



import AuthService from "../../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vNic = value => {
    if (value.length < 10 || value.length > 10) {
        return (
            <div className="alert alert-danger" role="alert">
                The NIC must be 10 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeAddress1 = this.onChangeAddress1.bind(this);
        this.onChangeAddress2 = this.onChangeAddress2.bind(this);
        this.onChangeAddress3 = this.onChangeAddress3.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.customTheme = this.customTheme.bind(this);

        this.state = {
            userName: "",
            email: "",
            password: "",
            title: "",
            firstName: "",
            lastName: "",
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            phoneNumber: "",
            successful: false,
            message: "",
            conferenceId: "1",
            dob: "",
            nic: "",
            role: "BUYER",
        };
    }
    customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange'
            }
        }
    }

    onSelect(e) {
        this.setState({
            role: e.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeFname(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLname(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeAddress1(e) {
        this.setState({
            addressLine1: e.target.value,

        });
    }
    onChangeAddress2(e) {
        this.setState({
            addressLine2: e.target.value,
        });
    }
    onChangeAddress3(e) {
        this.setState({
            addressLine3: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeNic(e) {
        this.setState({
            nic: e.target.value
        });
    }

    onChangeDob(e) {
        this.setState({
            dob: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.role,
                //this.props.match.params.name,
                this.state.firstName,
                this.state.lastName,
                this.state.addressLine1,
                this.state.addressLine2,
                this.state.addressLine3,
                this.state.phoneNumber,
                this.state.userName,
                this.state.conferenceId,
                this.state.email,
                this.state.password,
                this.state.dob,
                this.state.nic,


            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }


    render() {
        const options = [
            { value: 'BUYER', label: 'BUYER' },
            { value: 'SELLER', label: 'SELLER' }
        ]
        return (
            <div className="container">
                <div className="card bg-dark" style={{ width: '50%', marginTop: '10px', borderRadius: '5px', color: 'white' }}>
                    <div className="card-header" style={{ color: 'white' }}>
                        <h4>Signup</h4>
                    </div>
                    <div className="card-body">
                        <img
                            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="attributeId" >Role</label>
                                        <div className="form-group row">

                                            <div className="col-sm-5">
                                                <Select options={options} onChange={(e) => this.onSelect(e)} single autoFocus isSearchable theme={this.customTheme} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.userName}
                                            onChange={this.onChangeUsername}
                                            validations={[required, vusername]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.onChangeFname}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.onChangeLname}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName">Address</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="addressLine1"
                                            value={this.state.addressLine1}
                                            onChange={this.onChangeAddress1}
                                            validations={[required]}
                                        />
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="addressLine2"
                                            value={this.state.addressLine2}
                                            onChange={this.onChangeAddress2}
                                        //validations={[required]}
                                        />
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="addressLine3"
                                            value={this.state.addressLine3}
                                            onChange={this.onChangeAddress3}
                                        //validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone no</label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={this.state.phoneNumber}
                                            onChange={this.onChangePhone}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nic">NIC (OLD)</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="nic"
                                            value={this.state.nic}
                                            onChange={this.onChangeNic}
                                            validations={[required, vNic]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dob">Date Of Birth</label>
                                        <Input
                                            type="date"
                                            className="form-control"
                                            name="dob"
                                            value={this.state.dob}
                                            onChange={this.onChangeDob}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required, email]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Sign Up</button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                </div >
            </div>
        );
    }
}
