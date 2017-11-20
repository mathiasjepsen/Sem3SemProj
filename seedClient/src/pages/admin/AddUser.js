import React, { Component } from "react";

const AddUser = (props) => {
    this.onSubmit = (e) => {
        const user = {
            username: props.username,
            password: props.password,
            fName: props.fName,
            lName: props.lName,
            phone: props.phone,
            email: props.email
        }

        props.handleSubmit(user)
        e.preventDefault()
    }

    this.onChange = (e) => {
        props.handleChange(e.target)
    }

    return (
        <div>
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="username" name="username" placeholder="Enter username" value={props.username} onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="password" name="password" placeholder="Enter password" value={props.password} onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" name="fName" id="fName" placeholder="Enter first name" value={props.fName} onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="lName" name="lName" placeholder="Enter last name" value={props.lName} onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" type="number" id="phone" name="phone" placeholder="Enter phone number" value={props.phone} onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" type="email" id="email" name="email" placeholder="Enter e-mail" value={props.email} onChange={this.onChange} />
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

export default AddUser