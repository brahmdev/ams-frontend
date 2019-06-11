import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';

import './main.scss'
import AddSchedule from "./AddSchedule";
import {withStyles} from "@material-ui/core"; // webpack must be configured to do this

const styles = theme => ({

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing * 4,
    outline: 'none',
  },

});
class TimeTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.calendarRef = React.createRef();
  }

  rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  getModalStyle() {
    const top = 50 + this.rand();
    const left = 50 + this.rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  handleClose = (event) => {
    this.setState({open: false})
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
      <FullCalendar
        ref={this.calendarRef}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin, interactionPlugin]}
        themeSystem='bootstrap'
        header={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay addSchedule',
          center: 'title',
          right: 'save today prevYear,prev,next,nextYear'
        }}
        customButtons={{
          addSchedule: {
            text: 'Add Schedule',
            click: () => {
              console.log(this.calendarRef)
              let calendarApi = this.calendarRef.current.getApi()
              console.log('all events ', calendarApi.getEvents());
              this.setState({open: true})
            }
          },
          save: {
            text: 'Save',
            click: () => {
              console.log(this.calendarRef);
              alert('calendar will be saved now in database')
              let calendarApi = this.calendarRef.current.getApi()
              console.log('all events ', calendarApi.getEvents());
            }
          }
        }}
        editable
        eventStartEditable
        eventResizableFromStart
        eventLimit={3}
        events={[
          {
            title: "My repeating event\ntest",
            startTime: '10:00', // a start time (10am in this example)
            endTime: '14:00', // an end time (6pm in this example)
            daysOfWeek: [1, 4], // Repeat monday and thursday
            startRecur: new Date('2019-06-05'),
            endRecur: new Date('2019-06-15'),
          },
          {
            title: "My repeating event 2",
            start: '2019-06-19',
            end: '2019-06-19',

          }
        ]}
        eventResize={(info) => {
          alert(info.event.title + " end is now from " + info.event.start + ' till ' + info.event.end.toISOString());
        }
        }
      />
        <AddSchedule
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={(e) => this.handleClose(e)}
        />
      </div>
    )
  }

}
export default withStyles(styles)(TimeTable);
