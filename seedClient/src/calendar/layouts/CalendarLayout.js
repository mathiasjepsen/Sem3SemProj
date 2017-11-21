import React, { Component } from 'react';
import './CalendarLayout.css';

export default class CalendarLayout extends Component {
  render() {
    return (
      <div className='calendarLayout'>
      	{ this.props.children }
      </div>
    );
  }
}
