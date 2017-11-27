import React, { Component } from 'react';
import homeFacade from '../../facades/homeFacade';
import auth from '../../authorization/auth'

export default class Rating extends React.Component {
    constructor(props) {
        super(props)
        this.user = auth._userName;
        this.homeId = this.props.match.params.id;
        this.state = {
            home: "",
            user: auth._userName
        }
    }

    componentDidMount() {
        homeFacade.setRatingObserver(this.handleFetchHome)
        this.home = homeFacade.fetchHome(this.homeId)
    }

    handleFetchHome = (home) => {
        this.setState({ home })
    }


    handleChange = (e) => {
        var value = parseInt(e.target.value);
        var user = this.state.user;
        var newRating = { [user]: value };
        var obj = Object.assign({}, this.state.home.ratings, newRating);
        var newHome = this.state.home;
        newHome.ratings = obj;
        this.setState({ home: newHome });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        homeFacade.addRating(this.state.home);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    rate the home
                </label>
                <input type="text" name="rating" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
        //        }
    }
}