import React, { Component } from "react";
import adminFacade from "../../facades/adminFacade";

class EditUser extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            fName: "",
            lName: "",
            phone: "",
            email: ""
        }
    }

    componentDidMount() {
        const user = this.props.user

        this.setState({
            username: user.username,
            password: user.password,
            fName: user.fName,
            lName: user.lName,
            phone: user.phone,
            email: user.email
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        const user = {
            username: this.state.username,
            password: this.state.password,
            fName: this.state.fName,
            lName: this.state.lName,
            phone: this.state.phone,
            email: this.state.email
        }

        adminFacade.editUser(user)
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" readOnly id="username" name="username" value={this.state.username} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" name="fName" id="fName" placeholder="Enter first name" value={this.state.fName} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="" className="form-control" id="lName" name="lName" placeholder="Enter last name" value={this.state.lName} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" type="number" id="phone" name="phone" placeholder="Enter phone number" value={this.state.phone} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" type="email" id="email" name="email" placeholder="Enter e-mail" value={this.state.email} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditUser