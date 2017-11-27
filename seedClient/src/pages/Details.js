import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import CalendarContainer from '../calendar/containers/CalendarContainer';
import CalendarLayout from '../calendar/layouts/CalendarLayout';
import auth from '../authorization/auth';
import userFacade from '../facades/userFacade';
import placeFacade from '../facades/placeFacade';

//import '../../calendar/App.css';

export default class Details extends React.Component {
    constructor(props) {
        super();
        this.state = {
            //user:,
            place: {},
            user: {},
            userName: auth.userName,
            placeId: props.match.params.id,
            isLoggedIn: false
        }

    }

    componentDidMount = ()=> {
        placeFacade.setDetailsObserver(this.placeUpdater);
        placeFacade.fetchPlace(this.state.placeId);
        if (this.state.userName !== "") {
            this.setState({ isLoggedIn: true })
            userFacade.setDetailsObserver(this.userUpdater);
            userFacade.getUser(this.state.userName);
        }
    }

    placeUpdater = (place) => {
        this.setState({
            place
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
                                home={this.state.place}
                                isLoggedIn={this.state.isLoggedIn} />
                        </CalendarLayout>
                    )
                }} />
            </div>
        )
    }
}

