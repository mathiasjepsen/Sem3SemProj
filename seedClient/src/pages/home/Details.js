import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import CalendarContainer from '../../calendar/containers/CalendarContainer';
import CalendarLayout from '../../calendar/layouts/CalendarLayout';
import auth from '../../authorization/auth';
import userFacade from '../../facades/userFacade';
import homeFacade from '../../facades/homeFacade';
import MapDetails from './MapDetails'

export default class Details extends React.Component {
    constructor(props) {
        super();
        this.state = {
            home: {},
            user: {},
            address: {
                city: "",
                zip: "",
                street: ""
            },
            userName: auth.userName,
            homeId: props.match.params.id,
            isLoggedIn: false
        }
    }

    componentDidMount = () => {
        homeFacade.setDetailsObserver(this.homeUpdater);
        homeFacade.fetchHome(this.state.homeId);
    }

    homeUpdater = (home) => {
        const newAddress = {
            street: home.address.street,
            city: home.address.city,
            zip: home.address.zip
        }

        this.setState({
            home,
            address: newAddress

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
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" readOnly id="street" name="street" value={this.state.address.street} />
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" readOnly id="city" name="city" value={this.state.address.city} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" readOnly id="zip" name="zip" value={this.state.address.zip} />
                        </div>
                    </div>
                    <MapDetails
                        city={this.state.address.city}
                        zip={this.state.address.zip}
                        street={this.state.address.street}
                    />
                </div>
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

