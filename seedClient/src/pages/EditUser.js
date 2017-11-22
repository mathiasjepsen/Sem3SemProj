import React, { Component } from 'react'
import userFacade from '../facades/userFacade'
import auth from "../authorization/auth";

class EditUser extends Component {
    constructor() {
        super();
        this.state = { fName: "", lName: "", username: "", email: "", phone: ""}
    }

    componentDidMount() {
        const user =  userFacade.getUser(this.state.username)
        console.log ("user ",this.state.username)
       // this.setState = {fName: user.fName }
        
        
    }

/*
    editHandler = () => {
       const user =  userFacade.getUser(this.state.username)
    }

*/


    onSubmit = (e) => {
        const user = {
            username: this.state.username,
            fName: this.state.fName,
            lName: this.state.lName,
            phone: this.state.phone,
            email: this.state.email
        }
        

        userFacade.editUser(user)
        e.preventDefault()
    }



    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
render() {
    return (
        <div>
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-xs-6">
                        <label>Edit Existing User</label>
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