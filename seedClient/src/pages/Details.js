import React, { Component } from 'react';
import CalendarContainer from '../calendar/containers/CalendarContainer'
import CalendarLayout from '../calendar/layouts/CalendarLayout'

export default class Details extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <CalendarLayout>
                <CalendarContainer/>
            </CalendarLayout>
        )
    }
}