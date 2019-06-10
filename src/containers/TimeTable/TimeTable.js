import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap';

import './main.scss' // webpack must be configured to do this

export default class TimeTable extends React.Component {

  render() {
    return (
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin ]}
        themeSystem= 'bootstrap'
        header={{
          left : 'dayGridMonth,timeGridWeek,timeGridDay custom1',
          center: 'title',
          right: 'custom2 prevYear,prev,next,nextYear'
        }}
        customButtons={{
          custom1: {
            text: 'custom 1',
            click: function () {
              alert('clicked custom button 1!');
            }
          }
        }}
        events={[
          { title: 'event 1', date: '2019-06-01' },
          { title: 'event 2', date: '2019-06-02' }
        ]}
      />
    )
  }

}