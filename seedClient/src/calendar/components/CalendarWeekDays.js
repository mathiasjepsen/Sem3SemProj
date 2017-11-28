import React 		 from 'react';
import PropTypes from 'prop-types';
import _ 				 from 'lodash';

// styles
import './CalendarWeekDays.css';

export default class CalendarWeekDays extends React.Component {
	static propTypes = {
		dayNames: PropTypes.array,
	}

  render() {
    const weekdays = _.map(this.props.dayNames, (day, key) => {
			return (
	       <li key={key} className='week'>{key === 0 && <span className='week'>Week</span>} {day}</li>
			);
		})

    return (
  		<ul className='weekdays'>
				{ weekdays }
			</ul>
    );
  }
}
