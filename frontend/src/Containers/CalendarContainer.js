import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

class CalendarContainer extends React.Component {



    render () {
        const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
        return  (
            <div style={{height: '50rem'}}>
                <BigCalendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                />
            </div>
        )
    }
}

export default CalendarContainer;