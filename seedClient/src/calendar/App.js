import React, { Component } from 'react';
import CalendarContainer    from './containers/CalendarContainer';
import CalendarLayout       from './layouts/CalendarLayout';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <CalendarLayout>
        <CalendarContainer />
      </CalendarLayout>
    );
  }
}
