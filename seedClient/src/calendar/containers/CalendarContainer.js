import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import './CalendarContainer.css';

// TODO - HARDCODED DATA - pass this
import place from '../lib/PlaceObject.json';
import user from '../lib/UserObject.json';

// NOTE: this is your parent component
export default class CalendarContainer extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    isOpen: true,
		};

	}
  render() {
  	const { isOpen } = this.state;
    return (
      <div className='calendarContainer'>
      	<button onClick={this.onOpenCalendar.bind(this)}>Open Calendar</button>
      	<Calendar 
      		disablePast
      		place={place}
      		user={user}
      		isOpen={isOpen}
      		onBook={this.onBook.bind(this)}
      		onCloseCalendar={this.onCloseCalendar.bind(this)}
      	/>
      </div>
    );
  }

  onBook = (place, user) => {
  	// call redux action or which system you use
  	//console.log('updated PlaceObject (send to backend): ', place);
    //console.log('updated UserObject (send to backend): ', user);
  }

  onOpenCalendar = () => {
  	this.setState({ isOpen: true });
  }

  onCloseCalendar = () => {
  	this.setState({ isOpen: false });
  }
}
