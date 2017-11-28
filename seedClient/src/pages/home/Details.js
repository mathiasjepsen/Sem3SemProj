import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import CalendarContainer from '../../calendar/containers/CalendarContainer';
import CalendarLayout from '../../calendar/layouts/CalendarLayout';
import auth from '../../authorization/auth';
import userFacade from '../../facades/userFacade';
import homeFacade from '../../facades/homeFacade';

//import '../../calendar/App.css';

export default class Details extends React.Component {
    constructor(props) {
        super();
        this.state = {
            //user:,
            home: {},
            user: {},
            userName: auth.userName,
            homeId: props.match.params.id,
            isLoggedIn: false
        }
    }

    componentDidMount = () => {
        homeFacade.setDetailsObserver(this.homeUpdater);
        homeFacade.fetchHome(this.state.homeId);
        if (this.state.userName !== "") {
            this.setState({ isLoggedIn: true })
            userFacade.setDetailsObserver(this.userUpdater);
            userFacade.getUser(this.state.userName);
        }
    }

    homeUpdater = (home) => {
        this.setState({
            home
        })
    }

    userUpdater = (user) => {
        this.setState({
            user: user
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Link className="btn btn-success" to={`${this.props.match.url}/book`}>Book Home</Link>
                </div>
                <Route exact path={`${this.props.match.url}/book`} render={(props) => {
                    return (
                        <CalendarLayout>
                            <CalendarContainer
                                {...props}
                                user={this.state.user}
                                home={this.state.home}
                                isLoggedIn={this.state.isLoggedIn} />
                        </CalendarLayout>
                    )
                }} />
            </div>
        )
    }
}

