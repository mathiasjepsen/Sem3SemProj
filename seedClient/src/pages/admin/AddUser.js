import React, { Component } from "react";

class AddUser extends Component {
    constructor() {
        super()
    }

    onSubmit = (e) => {
        e.preventDefault()   

        const user = {
            username: this.props.username,
            password: this.props.password,
            fName: this.props.fName,
            lName: this.props.lName,
            phone: this.props.phone,
            email: this.props.email
        }

        this.props.handleSubmit(user)
    }

    onChange = (e) => {
        this.props.handleChange(e.target)
    }

    render() {
        return (
            <div>
                <form method="POST" className="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label>Create New User</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="username" name="username" placeholder="Enter username" value={this.props.username} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="password" name="password" placeholder="Enter password" value={this.props.password} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" name="fName" id="fName" placeholder="Enter first name" value={this.props.fName} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="lName" name="lName" placeholder="Enter last name" value={this.props.lName} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" type="number" id="phone" name="phone" placeholder="Enter phone number" value={this.props.phone} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" type="email" id="email" name="email" placeholder="Enter e-mail" value={this.props.email} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddUser