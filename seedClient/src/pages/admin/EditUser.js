import React, { Component } from "react";
import adminFacade from "../../facades/adminFacade";
import { Link } from 'react-router-dom'

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
        this.loadUser()
    }

    componentWillReceiveProps() {
        this.loadUser()
    }

    loadUser = () => {
        const user = this.props.users.filter((user) => {
            return user.username === this.props.match.params.username
        })[0]

        this.setState({
            username: user.username,
            password: user.passwordHash,
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
        this.props.history.push("/allUsers");
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="col-xs-6">
                            <label>Edit Existing User</label>
                        </div>
                        <div className="col-xs-4 col-xs-offset-2">
                            <Link to={"/allUsers"}>Create User</Link>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" readOnly id="username" name="username" value={this.state.username} />
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