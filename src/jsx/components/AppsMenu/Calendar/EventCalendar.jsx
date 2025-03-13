import React, { Component } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import Alert from 'sweetalert2';

class EventCalendar extends Component {
  state = {
    calendarEvents: [
      {
        title: 'Atlanta Monster',
        start: new Date('2024-12-07 00:00'),
        id: '99999991',
      },
      {
        title: 'My Favorite Movie',
        start: new Date('2024-12-11 00:00'),
        id: '99999992',
      },
      {
        title: 'Enggement Function',
        start: new Date('2024-12-17 00:00'),
        id: '99999993',
      },
      {
        title: 'Marrige Function',
        start: new Date('2024-12-23 00:00'),
        id: '99999994',
      },
      {
        title: 'Party With Friends',
        start: new Date('2024-12-26 00:00'),
        id: '99999995',
      },
      {
        title: 'Atlanta Monster',
        start: new Date('2025-01-07 00:00'),
        id: '99999991',
      },
      {
        title: 'My Favorite Movie',
        start: new Date('2025-05-01 00:00'),
        id: '99999992',
      },
      {
        title: 'Enggement Function',
        start: new Date('2025-01-17 00:00'),
        id: '99999993',
      },
      {
        title: 'Marrige Function',
        start: new Date('2025-01-23 00:00'),
        id: '99999994',
      },
      {
        title: 'Party With Friends',
        start: new Date('2025-01-26 00:00'),
        id: '99999995',
      },
    ],
    events: [
      { title: 'New Theme Release', id: '1', style: 'primary' },
      { title: 'My Event', id: '2', style: 'warning' },
      { title: 'Meet Manager', id: '3', style: 'danger' },
      { title: 'Create New Theme', id: '4', style: 'info' },
      { title: 'Project Launch ', id: '5', style: 'dark' },
      { title: 'Meeting', id: '6', style: 'secondary' },
    ],
  };

  componentDidMount() {
    let draggableEl = document.getElementById('external-events');
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('data');
        return {
          title: title,
          id: id,
        };
      },
    });
  }

  eventClick = (eventClick) => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div className="table-responsive">
      <table className="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove Event',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove();
        Alert.fire('Deleted!', 'Your Event has been deleted.', 'success');
      }
    });
  };

  render() {
    return (
      <div className="animated fadeIn demo-app">
        <Row>
          <Col lg={3}>
            <Card>
              <div className="card-header border-0 pb-0">
                <h4 className="text-black fs-20 mb-0">Events</h4>
              </div>
              <Card.Body>
                <div id="external-events">
                  <p>Drag and drop your event or click in the calendar</p>
                  {this.state.events.map((event) => (
                    <div
                      className={`fc-event external-event light btn-${event.style}`}
                      data-class={`bg-${event.style}`}
                      title={event.title}
                      data={event.id}
                      key={event.id}
                    >
                      <i className="fa fa-move" />
                      <span>{event.title}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={9}>
            <Card>
              <Card.Body>
                <div className="app-fullcalendar" id="mycalendartest">
                  <FullCalendar
                    defaultView="dayGridMonth"
                    headerToolbar={{
                      start: 'prev,next today',
                      center: 'title',
                      end: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    rerenderDelay={10}
                    eventDurationEditable={false}
                    editable={true}
                    droppable={true}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={this.calendarComponentRef}
                    weekends={this.state.calendarWeekends}
                    events={this.state.calendarEvents}
                    eventDrop={this.drop}
                    eventReceive={this.eventReceive}
                    eventClick={this.eventClick}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventCalendar;
