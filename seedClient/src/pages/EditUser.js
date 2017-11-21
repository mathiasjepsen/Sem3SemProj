import React, { Component } from 'react'
import userFacade from '../facades/userFacade'
import auth from "../authorization/auth";

class EditUser extends Component {
    constructor() {
        super();
        this.state = { err: "", user: { loggedIn: auth.loggedIn, firstname: "", lastname: "", userName: auth.userName, email: "", phone: "", password: "" } }
    }

    componentDidMount() {
        userFacade.setEditObserver(this.editHandler)
    }

    editHandler = (data) => {
        auth.login(this.state.user.username, this.state.user.password, (err, loggedIn) => {
            if (err) {
                return this.setState({ err: err.errorMessage });
            }
            this.setState({ err: "" });
            this.props.history.push("/places");
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        userFacade.signUp(this.state.user);
    }



    onChange = (e) => {
        const propertyName = e.target.id
        const value = e.target.value
        let user = this.state.user
        user[propertyName] = value
        this.setState({ user })
    }


    render() {
        const logInStatus = this.state.loggedIn ? "Logged in as: " + this.state.userName : "lovro";
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h2 className="form-signin-heading">Edit information</h2>
                    <label htmlFor="inputUserName" className="sr-only">User Name</label>
                    <input type="text" value={this.state.user.userΝame} onChange={this.onChange} className="form-control" id="username" placeholder={logInStatus} required autoFocus />
                    <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                    <input type="text" value={this.state.user.firstname} onChange={this.onChange} className="form-control" id="firstname" placeholder="First Name" required autoFocus />
                    <label htmlFor="inputLasttName" className="sr-only">Last Name</label>
                    <input type="text" value={this.state.user.lastname} onChange={this.onChange} className="form-control" id="lastname" placeholder="Last Name" required autoFocus />
                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                    <input type="text" value={this.state.user.email} onChange={this.onChange} className="form-control" id="email" placeholder="Email" required autoFocus />
                    <label htmlFor="inputPhone" className="sr-only">Phone number</label>
                    <input type="text" value={this.state.user.phone} onChange={this.onChange} className="form-control" id="phone" placeholder="Phone" required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" value={this.state.user.password} onChange={this.onChange} className="form-control" id="password" placeholder="Password" required />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
                    <br />
                </form>
                {this.state.err && (
                    <div className="alert alert-danger errmsg" role="alert">
                        {this.state.err}
                    </div>
                )}
            </div>
        )
    }
}

export default EditUser