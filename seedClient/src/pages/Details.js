import React, { Component } from 'react';
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

    componentDidMount() {
        placeFacade.setDetailsObserver(this.placeUpdater);
        placeFacade.fetchPlace(this.state.placeId);
        console.log("state after fetchPlace", this.state);

        if(this.userName !== ""){
            this.setState({isLoggedIn : true})
        userFacade.setDetailsObserver(this.userUpdater);
        userFacade.getUser(this.state.userName);
        console.log("state after getUser", this.state);
        }
        console.log("state at the end of ComponentDidMount", this.state)
    }

    placeUpdater(place){
        this.setState({
            place
        })
    }

    userUpdater(user){
        this.setState({
            user
        })
    }

    render() {
        return (
            <div>
                <CalendarLayout>
                    <CalendarContainer />
                </CalendarLayout>
            </div>
        )
    }
}