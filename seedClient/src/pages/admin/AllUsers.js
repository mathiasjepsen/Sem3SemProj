import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom'
import userFacade from "../../facades/userFacade";
import adminFacade from '../../facades/adminFacade'
import AddUser from './AddUser'
import EditUser from './EditUser'
import auth from '../../authorization/auth'

export default class AllUsers extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            username: "",
            password: "",
            fName: "",
            lName: "",
            phone: "",
            email: "",
            isAdmin: auth.isAdmin
        }
    }

    componentDidMount() {
        if (this.state.isAdmin) {
            userFacade.setUsersObserver(this.usersUpdater)
            userFacade.getAllUsers()
        }
    }

    usersUpdater = (users) => {
        this.setState({
            users
        })
    }

    handleChange = (target) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onDelete = (target) => {
        adminFacade.deleteUser(target.target.id)
        target.preventDefault()
    }

    addUser = (user) => {
        let msg = adminFacade.addUser(user)
        this.setState({
            username: "",
            password: "",
            fName: "",
            lName: "",
            phone: "",
            email: "",
        })
    }

    render() {
        return (
            <div>
                {this.state.isAdmin ?
                    <div className="col-xs-12">
                        <div className="col-xs-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Username</td>
                                        <td>First Name</td>
                                        <td>Last Name</td>
                                        <td>Phone Number</td>
                                        <td>E-mail</td>
                                        <td>Roles</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((user) => {
                                        return (
                                            <tr key={user.username}>
                                                <td>{user.username}</td>
                                                <td>{user.fName}</td>
                                                <td>{user.lName}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td><Link className="btn btn-info" to={`${this.props.match.url}/${user.username}`}>Edit User</Link></td>
                                                <td><button className="btn btn-danger" onClick={this.onDelete} id={user.username}>delete</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-xs-4 col-xs-offset-4">
                            <Switch>
                                <Route exact path={`${this.props.match.url}`} render={(props) => {
                                    return (
                                        <AddUser
                                            {...props}
                                            username={this.state.username}
                                            password={this.state.password}
                                            fName={this.state.fName}
                                            lName={this.state.lName}
                                            phone={this.state.phone}
                                            email={this.state.email}
                                            msg={this.state.msg}
                                            handleChange={this.handleChange}
                                            handleSubmit={this.addUser} />
                                    )
                                }} />
                                <Route path={`${this.props.match.url}/:username`} render={(props) => {
                                    return (
                                        <EditUser
                                            {...props}
                                            msg={this.state.msg}
                                            users={this.state.users}
                                        />
                                    )
                                }} />
                            </Switch>
                        </div>
                    </div>
                    :
                    <div class="alert alert-danger">
                        <strong>Sorry!</strong> You need to be logged in to access this page.
                    </div>
                }
            </div>
        )
    }

}




