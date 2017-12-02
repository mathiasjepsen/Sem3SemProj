import React, { Component } from 'react';
import userFacade from '../../facades/userFacade';
import homeFacade from '../../facades/homeFacade';
import Rating from '../home/Rating'
import auth from '../../authorization/auth'
import { NavLink, Route } from 'react-router-dom';
import Details from '../home/Details';

export default class Homes extends React.Component {
    constructor() {
        super();
        this.state = {
            homes: [],
            userName: auth.userName
        }
    }

    componentDidMount() {
        homeFacade.setHomeObserver(this.homesUpdater)
        homeFacade.setSortObserver(this.homesUpdater)
        homeFacade.fetchHomes()
    }

    componentDidUpdate() {
        homeFacade.fetchHomes()
    }

    homesUpdater = (homes) => {
        this.setState({
            homes
        })
    }

    sortByRating = () => {
        homeFacade.sortByRating(this.state.homes)
    }

    sortByCity = () => {
        homeFacade.sortByCity(this.state.homes)
    }

    sortByZip = () => {
        homeFacade.sortByZip(this.state.homes)
    }

    render() {
        console.log("Homes", this.state.homes)
        return (
            <div>
                <h2>Beautiful homes</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>City</th>
                            <th>Zip Code</th>
                            <th>Street</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th><button onClick={this.sortByRating}>Sort by rating</button></th>
                            <th><button onClick={this.sortByCity}>Sort by City</button></th>
                            <th><button onClick={this.sortByZip}>Sort by Zip</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.homes.map((home, index) => {
                            var x = Object.keys(home.ratings);
                            var alreadyRated = x.indexOf(this.state.userName)
                            return (
                                <tr key={index}>
                                    <td><img src={`https://mathiasjepsen.dk/backend/ca3/images/${home.image}`} style={{ width: 50, height: 50 }} /></td>
                                    <td>
                                        {home.address.city}
                                    </td>
                                    <td>
                                        {home.address.zip}
                                    </td>
                                    <td>
                                        {home.address.street}
                                    </td>
                                    <td>
                                        {home.address.location}
                                    </td>
                                    <td>
                                        {home.description}
                                    </td>
                                    <td>
                                        {home.rating}
                                    </td>
                                    <td> {this.state.userName !== "" && alreadyRated === -1 &&
                                        <NavLink className="btn btn-info" to={`/rate/${home.id}`}>rate this place</NavLink>
                                    }
                                    </td>
                                    <td><NavLink className="btn btn-info" to={`details/${home.id}`}>see details</NavLink></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}



/*
const PlaceDetails = (props) => {

    const place = props.places[props.match.params.index]
    return (
        <div>
            <table>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            City:
            {place.city}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Zip Code:
            {place.zip}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Street Name:
            {place.street}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Location:
            {place.location}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
*/