import React 		 from 'react';
import PropTypes from 'prop-types';

// styles
import './CalendarHeader.css';
const classNames = require('classnames');

export default class CalendarHeader extends React.Component {
	static propTypes = {
		disablePast: PropTypes.bool,
		isAuthUser: PropTypes.bool,
		selectedWeek: PropTypes.number,
		selectedMonth: PropTypes.string.isRequired,
		selectedYear: PropTypes.number.isRequired,
		onBook: PropTypes.func,
		onNextMonth: PropTypes.func,
		onPrevMonth: PropTypes.func,
		onCloseCalendar: PropTypes.func,
	}

	constructor(props) {
	  super(props);
	  this.state = {
	    errorMessage: false,
	  };
	}

  render() {
  	const { errorMessage } = this.state;
  	const { 
  		disablePast,
  		selectedMonth,
  		selectedYear,
  		selectedWeek,
  		// handler functions
  		onNextMonth,
  		onPrevMonth,
  		onCloseCalendar,
  	} = this.props;

    const bookClasses = classNames({
    	'bookLabe': true,
      'canBook': selectedWeek,
    });

    return (
      <div className='calendarHeaderWrapper'>
      	<div className='closeButtonWrapper'>
      		<button className='closeButton' onClick={onCloseCalendar}>X</button>
      	</div>
				<div className='dateWrapper'>
					<span className="month">{selectedMonth}</span>
					<span className="year">{selectedYear}</span>
				</div>
				<div className='bookLabelWrapper'>
					<span className={bookClasses} onClick={this.onBook.bind(this)}>BOOK</span>
				</div>
				<div className='monthsNavigation'>
					{ !disablePast && <button className='backButton' onClick={onPrevMonth}>{'<'}</button> }
					<button className='forwardButton' onClick={onNextMonth}>{'>'}</button>
				</div>
				<div className='loginErrorMessage'>
					{ errorMessage && 
						<span>You must be logged in to book a week. Please click <a href="/#/login">here</a> to login</span>
					}
				</div>
      </div>
    );
  }

  onBook = () => {
  	if (!this.props.isAuthUser) {
  		this.setState({ errorMessage: true })
  	} else if (this.props.selectedWeek) {
			this.props.onBook();
  	}
  }
}
