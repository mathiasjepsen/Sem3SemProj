import React, { Component } from 'react';
import placeFacade from '../facades/placeFacade';
import auth from '../authorization/auth'

export default class Rating extends React.Component {
    constructor(props) {
        super(props)
        this.user = auth._userName;
        this.placeId = this.props.match.params.id;
        console.log("props in rating", this.props)
        this.state = {
            place: "",
            user: auth._userName
        }
    }

    componentDidMount() {
        placeFacade.setRatingObserver(this.handleFetchPlace)
        this.place = placeFacade.fetchPlace(this.placeId)
    }

    handleFetchPlace = (place) => {
        this.setState({ place })
    }

    handleChange = (e) => {
        var value = parseInt(e.target.value);
        var user = this.state.user;
        var newRating = { [user]: value };
        var obj = Object.assign({}, this.state.place.ratings, newRating);
        var newPlace = this.state.place;
        newPlace.ratings = obj;
        this.setState({ place: newPlace });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        placeFacade.addRating(this.state.place);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    rate the place
                </label>
                <input type="text" name="rating" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
        //        }
    }
}