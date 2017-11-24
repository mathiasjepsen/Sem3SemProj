/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import CalendarColumn from './CalendarColumn';

import './CalendarRow.css';
const classNames = require('classnames');

export default class CalendarRow extends React.Component {
  static propTypes = {
    daysInMonth: PropTypes.number,
    daysInNextMonth: PropTypes.number,
    monthStardDay: PropTypes.number,
    nextMonthDays: PropTypes.bool,
    nextMonthName: PropTypes.string,
    isAlreadyBooked: PropTypes.bool,
    isCurrentMonthSelected: PropTypes.bool,
    selectedWeek: PropTypes.number,
    weekNumber: PropTypes.number,
    weekStartDay: PropTypes.number,
    // handlers
    onWeekSelect: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      hoveredWeek: null,
    };
  }

  render() {
  	const {
      daysInLastMonth,
      daysInMonth,
      monthStardDay,
      nextMonthDays,
      nextMonthName,
      isAlreadyBooked,
      isCurrentMonthSelected,
      selectedWeek,
      weekNumber,
      weekStartDay,
      daysInNextMonth
    } = this.props;
    
    const { hoveredWeek } = this.state;

    const calendarColumnClasses = classNames({
      'days': true,
      'isAlreadyBooked': isAlreadyBooked,
      'weekHovered': hoveredWeek,
      'weekSelected': (selectedWeek === weekNumber) && !isAlreadyBooked,
    });

    const dayInWeek = []; // CalenderRow week collection
    let weekNumberSet = false;

    // first row (week) in month
    if (monthStardDay) {
      const startFrom = weekStartDay - monthStardDay + 1;

      let lastMonthDays = 0;
      // days from start of week to current day
      // week is in month that is not current
      if (startFrom < 0 || !isCurrentMonthSelected) {
        lastMonthDays = daysInLastMonth + startFrom;
        for (var i = lastMonthDays; i <= daysInLastMonth; i++) {
          const isWeekend = (daysInLastMonth - lastMonthDays) >= 5 && (daysInLastMonth - i === 0);
          dayInWeek.push(
            <CalendarColumn
              key={i}
              day={i}
              olderDate
              isWeekend={isWeekend}
              weekNumber={!weekNumberSet ? weekNumber : null}
            />
          );
          weekNumberSet = true;
        }
        
      } else {
        // week is in current month
        for (var i = startFrom; i < weekStartDay; i++) {
          const isWeekend = (weekStartDay - startFrom) > 5 && (weekStartDay - i === 0 || weekStartDay - i === 1);
          dayInWeek.push(
            <CalendarColumn
              key={i}
              day={i}
              olderDate
              isWeekend={isWeekend}
              weekNumber={!weekNumberSet ? weekNumber : null}
            />
          );
          weekNumberSet = true;
        }
      }

      // days from today to Sunday
      const range = weekStartDay + (7 - monthStardDay);
      for (var i = weekStartDay; i <= range; i++) {
        const isWeekend = i === range || i === (range - 1);
        dayInWeek.push(
          <CalendarColumn
            key={i}
            day={i}
            isWeekend={isWeekend}
            weekNumber={!weekNumberSet ? weekNumber : null}
            currentDay={ i === weekStartDay && isCurrentMonthSelected}
          />
        );
        weekNumberSet = true;
      }

    } else {
      const endDate = weekStartDay + 7;
      let newMonthDaysCounter = 1;
      // rows for other week than current
      // if days goes to new week and that week is in new month, then get number of days in new month
      const maxDaysInMonth = !nextMonthDays ? daysInMonth : daysInNextMonth;
      for (var i = weekStartDay; i < (endDate); i++) {
        const isWeekend = i === (endDate - 2) || i === (endDate - 1);


        if (i <= maxDaysInMonth) {
          dayInWeek.push(
            <CalendarColumn
              key={i}
              day={i}
              isWeekend={isWeekend}
              nextMonthDays={nextMonthDays}
              weekNumber={!weekNumberSet ? weekNumber : null}
              firstInNewMonth={i === 1 ? nextMonthName.substring(0, 3) : null}
            />
          );
          weekNumberSet = true;
        } else {
          dayInWeek.push(
            <CalendarColumn
              key={i}
              day={newMonthDaysCounter}
              isWeekend={isWeekend}
              weekNumber={!weekNumberSet ? weekNumber : null}
              nextMonthDays
              firstInNewMonth={newMonthDaysCounter === 1 ? nextMonthName.substring(0, 3) : null}
            />
          );
          weekNumberSet = true;
          newMonthDaysCounter++;
        }
      }
    }

    return (
      <ul 
        className={calendarColumnClasses}
        onMouseEnter={this.handleColumnEnter.bind(this, weekNumber)}
        onMouseLeave={this.handleColumnLeave.bind(this)}
        onClick={this.handleColumnSelect.bind(this, weekNumber)}
      >
        {dayInWeek}
      </ul>
    );
  }

  handleColumnEnter = (weekNumber) => {
    !this.props.isAlreadyBooked && this.setState({ hoveredWeek: weekNumber });
  }

  handleColumnLeave = () => {
    this.setState({ hoveredWeek: null });
  }

  handleColumnSelect = (weekNumber) => {
    const weekNumberParam = (weekNumber === this.props.selectedWeek) ? null : weekNumber;
    !this.props.isAlreadyBooked && this.props.onWeekSelect(weekNumberParam);
  }
}
