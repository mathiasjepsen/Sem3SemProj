/* eslint-disable */
import React from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarRow from './CalendarRow';
import CalendarWeekDays from './CalendarWeekDays';

import './Calendar.css';

export default class Calendar extends React.Component {
  static propTypes = {
    disablePast: PropTypes.bool,
    user: PropTypes.object,
    place: PropTypes.object,
    weeksToShow: PropTypes.number,
    isOpen: PropTypes.bool,
    onBook: PropTypes.func,
    onCloseCalendar: PropTypes.func,
  };

  static defaultProps = {
    disablePast: true,
    weeksToShow: 6, // best fit (look at December 2017)
  }

  constructor(props) {
    const date = new Date();
    super(props);
    this.state = {
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth(),
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      selectedWeek: null,
    };
  }

  render() {
    const { monthNames, selectedMonth, selectedYear, dayNames, selectedWeek } = this.state;
    const { disablePast, weeksToShow, user, place, isOpen, onCloseCalendar } = this.props;
    
    // date calculations
    const date = new Date();
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInLastMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const isCurrentMonthSelected = (selectedMonth === currentMonth) && (selectedYear === currentYear);
    const nextMonthName = (selectedMonth + 1) === 12 ? monthNames[0] : monthNames[selectedMonth + 1];

    const alreadyBoked = [];
    _.map(place.bookings, (booked) => {
      const bookedDate = new Date(booked.date);
      const bookedWeek = this.getWeekNumber(bookedDate);
      if (!_.includes(alreadyBoked, bookedWeek)) {
        alreadyBoked.push(bookedWeek);
      }
    })

    let monthStardDay;
    if (isCurrentMonthSelected) {
      monthStardDay = date.getDay() === 0 ? 7 : date.getDay();
    } else {
      // get 1st in next month
      const nextMonthStartDate = new Date(selectedYear, selectedMonth, 1);
      monthStardDay = nextMonthStartDate.getDay() === 0 ? 7 : nextMonthStartDate.getDay();
    }

    // row calculated data
    const weeks = []; // CalenderColumn month collection
    let weekStartDay = isCurrentMonthSelected ? currentDay : 1;
    let nextMonthDays = false;

    // show 6 weeks in month starting with current week
    for (var week = 1; week <= weeksToShow; week++) {
      // first visible week
      if (week === 1) {
        const fullStartDate = new Date(selectedYear, selectedMonth, weekStartDay); // return [year, weekNumber] 
        const weekNumber = this.getWeekNumber(fullStartDate);

        weeks.push(
          <CalendarRow
            isAlreadyBooked={_.includes(alreadyBoked, weekNumber)}
            selectedWeek={selectedWeek}
            key={week}
            monthStardDay={monthStardDay}
            weekStartDay={weekStartDay} // just current month starts with current date
            daysInMonth={daysInMonth}
            daysInLastMonth={daysInLastMonth}
            weekNumber={weekNumber}
            onWeekSelect={this.onWeekSelect.bind(this)}
            isCurrentMonthSelected={isCurrentMonthSelected}
            nextMonthName={nextMonthName}
          />
        );

        weekStartDay = weekStartDay + (7 - monthStardDay) + 1; // set start day to next Monday
      } else {
        const month = (nextMonthDays) ? selectedMonth + 1 : selectedMonth;
        const fullStartDate = new Date(selectedYear, month, weekStartDay);
        const weekNumber = this.getWeekNumber(fullStartDate);

        weeks.push(
          <CalendarRow
            isAlreadyBooked={_.includes(alreadyBoked, weekNumber)}
            selectedWeek={selectedWeek}
            key={week}
            weekStartDay={weekStartDay}
            daysInMonth={daysInMonth}
            nextMonthDays={nextMonthDays}
            weekNumber={weekNumber}
            onWeekSelect={this.onWeekSelect.bind(this)}
            nextMonthName={nextMonthName}
          />
        );

        const nextMonday = weekStartDay + 7; // set start day to next Monday
        // if next Monday is in new month then return first Monday in next month        
        if (nextMonday <= daysInMonth) {
          weekStartDay = nextMonday;
        } else {
          weekStartDay = nextMonday - daysInMonth;
          nextMonthDays = true; // say that this week is in next month
        }
      }
    }
    return (
      <Modal
        isOpen={isOpen}
        contentLabel="Example Modal"
      >
        <CalendarHeader
          disablePast={disablePast && isCurrentMonthSelected}
          isAuthUser={typeof user !== 'undefined'}
          dayNames={dayNames}
          selectedMonth={monthNames[selectedMonth]}
          selectedYear={selectedYear}
          selectedWeek={selectedWeek}
          onNextMonth={this.onNextMonth.bind(this)}
          onPrevMonth={this.onPrevMonth.bind(this)}
          onBook={this.onBook.bind(this)}
          onCloseCalendar={onCloseCalendar}
        />
        <div id="calendar">
          <CalendarWeekDays dayNames={dayNames} />
          { weeks }
        </div>
      </Modal>
    )
  }

  onWeekSelect = (weekNumber) => {
    this.setState({ selectedWeek: weekNumber });
  }

  onNextMonth = () => {
    const selectedMonth = this.state.selectedMonth < 11 ? this.state.selectedMonth + 1 : 0;
    // if next month is January then update year, increase
    const selectedYear = (selectedMonth === 0) ? this.state.selectedYear + 1 : this.state.selectedYear;
    this.setState({ selectedMonth, selectedYear });
  }

  onPrevMonth = () => {
    const selectedMonth = this.state.selectedMonth > 0 ? this.state.selectedMonth - 1 : 11;
    // if prev month is December then update year, decrease
    const selectedYear = (selectedMonth === 11) ? this.state.selectedYear - 1 : this.state.selectedYear;
    this.setState({ selectedMonth, selectedYear });
  }

  onBook = () => {
    const bookedRange = this.getDateRangeOfWeek(this.state.selectedWeek);
    const range = []
    if (bookedRange.from.day > bookedRange.to.day) {
      const daysInMonth = new Date(bookedRange.from.year, bookedRange.from.month, 0).getDate();
      // range is in 2 diff months
      for (var day = bookedRange.from.day; day <= daysInMonth; day++) {
        const bookingPart = {
          'user': this.props.user.userName,
          'date': bookedRange.from.year + '-' + bookedRange.from.month + '-' + day,
        }
        range.push(bookingPart);
      }
      for (var nextMonthDay = 1; nextMonthDay <= bookedRange.to.day; nextMonthDay++) {
        const bookingPart = {
          'user': this.props.user.userName,
          'date': bookedRange.to.year + '-' + bookedRange.to.month + '-' + nextMonthDay,
        }
        range.push(bookingPart);
      }
    } else {
      for (var regularMonthDay = bookedRange.from.day; regularMonthDay <= bookedRange.to.day; regularMonthDay++) {
        const bookingPart = {
          'user': this.props.user.userName,
          'date': bookedRange.from.year + '-' + bookedRange.from.month + '-' + regularMonthDay,
        }
        range.push(bookingPart);
      }
    }
    this.props.onBook(range);
    this.props.onCloseCalendar();

  }

  // get week number from date object - depending on original project structure, move this fn to helpers, lib...
  getWeekNumber = (d) => {
    // Copy date so don't modify original
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNumber = Math.ceil(( ( (date - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNumber;
  }

  getDateRangeOfWeek = (weekNo) => {
    const date = new Date();
    const numOfdaysPastSinceLastMonday = eval(date.getDay() - 1);
    date.setDate(date.getDate() - numOfdaysPastSinceLastMonday);
    const weekNoToday = this.getWeekNumber(date);
    const weeksInTheFuture = eval( weekNo - weekNoToday );
    date.setDate(date.getDate() + eval( 7 * weeksInTheFuture ));
    const rangeIsFrom = {
      day: date.getDate(),
      month: eval(date.getMonth()+1),
      year: date.getFullYear()
    };
    date.setDate(date.getDate() + 6);
    const rangeIsTo = {
      day: date.getDate(),
      month: eval(date.getMonth()+1),
      year: date.getFullYear()
    };
    return {
      from: rangeIsFrom,
      to: rangeIsTo
    };
  };
}
