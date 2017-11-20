import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom'
import adminFacade from "../../facades/adminFacade";
import AddUser from './AddUser'
import EditUser from './EditUser'

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
            email: ""
        }
    }

    componentDidMount() {
        adminFacade.setUsersObserver(this.usersUpdater)
        adminFacade.getAllUsers()
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

    addUser = (user) => {
        adminFacade.addUser(user)
    }

    render() {
        return (
            <div>
                <div>
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
                                        <td><Link to={`${this.props.match.url}/editUser/${user.username}`}>Edit User</Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <Link to={`${this.props.match.url}/addUser`}>Add User</Link>

                <Switch>
                    <Route path={`${this.props.match.url}/addUser`} render={(props) => {
                        return (
                            <div>
                                <AddUser
                                    {...props}
                                    handleSubmit={this.addUser}
                                    handleChange={this.handleChange}
                                    username={this.state.username}
                                    password={this.state.password}
                                    fName={this.state.fName}
                                    lName={this.state.lName}
                                    phone={this.state.phone}
                                    email={this.state.email}
                                />
                            </div>
                        )
                    }}>
                    </Route>
                    {this.state.users.length > 0 &&
                        <Route path={`${this.props.match.url}/editUser/:username`} render={(props) => {
                            const user = this.state.users.filter((user) => {
                                return user.username === props.match.params.username
                            })[0]

                            return (
                                <div>
                                    <EditUser
                                        {...props}
                                        user={user}
                                    />
                                </div>
                            )
                        }}>
                        </Route>
                    }
                </Switch>
            </div>
        )
    }
}