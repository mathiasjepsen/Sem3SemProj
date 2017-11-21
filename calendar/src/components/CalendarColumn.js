import React from 'react';
import PropTypes from 'prop-types';

// styles
import './CalendarColumn.css';
const classNames = require('classnames');

export default class CalendarColumn extends React.Component {
  static propTypes = {
    currentDay: PropTypes.bool,
    day: PropTypes.number,
    firstInNewMonth: PropTypes.string,
    nextMonthDays: PropTypes.bool,
    isWeekend: PropTypes.bool,
    olderDate: PropTypes.bool,
    weekNumber: PropTypes.number,
  };

  render() {
    const { isWeekend, olderDate, nextMonthDays, currentDay, weekNumber, firstInNewMonth, day } = this.props;
    const calendarRowClasses = classNames({
      'day': true,
      'isWeekend': isWeekend,
      'fromAnotherMonth': olderDate || nextMonthDays,
      'currentDayMarker': currentDay,
    });

    return (
      <li className={calendarRowClasses}>
        {weekNumber && <span className='weekNumber'>{weekNumber}</span>}
        <div className='date'> {day} <span>{firstInNewMonth}</span></div>
      </li>
    );
  }
}
