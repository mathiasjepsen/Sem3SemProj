import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import './CalendarContainer.css';
import userFacade from './../../facades/userFacade';
import homeFacade from './../../facades/homeFacade';

// TODO - HARDCODED DATA - pass this
//import place from '../lib/PlaceObject.json';
//import user from '../lib/UserObject.json';

// NOTE: this is your parent component
export default class CalendarContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
			user: this.props.user,
			home: this.props.home,
			isLoggedIn: this.props.isLoggedIn
		};
		console.log("state cal co", this.state)
	}


	render() {
		const { isOpen } = this.state;
		return (
			<div className='calendarContainer'>
			 {/* <button onClick={this.onOpenCalendar.bind(this)}>Open Calendar</button> */}
				<Calendar
				//	disablePast
					home={this.state.home}
					user={this.state.user}
					isOpen={isOpen}
					onBook={this.onBook.bind(this)}
					onCloseCalendar={this.onCloseCalendar.bind(this)}
					isLoggedIn={this.state.isLoggedIn}
				/>
			</div>
		);
	}

	onBook = (home, user) => {
		// call redux action or which system you use
		userFacade.editUser(user);
		homeFacade.editHome(home);
		if (this._detailsHandler) {
			this._detailsHandler(home, user)
		}
	}

	onOpenCalendar = () => {
		this.setState({ isOpen: true });
	}

	onCloseCalendar = () => {
		this.setState({ isOpen: false });
		this.props.history.push(`details/${this.state.home.id}`);
	}
}
