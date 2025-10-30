import React, { Component } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';

class VisitCalendar extends Component {
  state = {
    calendarEvents: [],
    pendingVisits: [],
    loading: true,
  };

  async componentDidMount() {
    await this.loadVisits();
  }

  // 🧩 Cargar todas las visitas
  loadVisits = async () => {
    try {
      const { data, error } = await supabase
        .from('visits')
        .select(
          `
          id,
          date,
          scheduled_start,
          scheduled_end,
          type,
          status,
          description,
          clients(name),
          sites(name)
        `
        )
        .order('date', { ascending: true });

      if (error) throw error;

      // 🎨 Mapear visitas a eventos del calendario
      const events = data.map((v) => {
        const titleParts = [v.clients?.name || 'Visit'];
        const color = this.getColorByStatus(v.status);

        return {
          id: v.id,
          title: titleParts.join(' '),
          start: v.scheduled_start || v.date,
          end: v.scheduled_end || null,
          backgroundColor: color,
          borderColor: color,
          extendedProps: {
            description: v.description,
            status: v.status,
            client: v.clients?.name,
            site: v.sites?.name,
            type: v.type,
          },
        };
      });

      // 🟡 Filtrar visitas pendientes (no completadas ni canceladas)
      const pending = data.filter(
        (v) => v.status !== 'completed' && v.status !== 'canceled'
      );

      this.setState({
        calendarEvents: events,
        pendingVisits: pending,
        loading: false,
      });
    } catch (err) {
      console.error('Error loading visits:', err.message);
      this.setState({ loading: false });
    }
  };

  getColorByStatus = (status) => {
    switch (status) {
      case 'scheduled':
        return '#6c757d';
      case 'in_progress':
        return '#007bff';
      case 'completed':
        return '#28a745';
      case 'canceled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  render() {
    const { pendingVisits } = this.state;

    return (
      <div className="animated fadeIn demo-app">
        <PageTitle activeMenu="Visits" motherMenu="Operations" />
        <Row>
          {/* 🔹 COLUMNA IZQUIERDA */}
          <Col lg={3}>
            <Card>
              <div className="card-header">
                <h4 className="card-title">Pending Visits</h4>
              </div>
              <Card.Body>
                {pendingVisits.length === 0 ? (
                  <p className="text-muted fst-italic">
                    All visits are completed.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm align-middle">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Client</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingVisits.map((v) => (
                          <tr
                            key={v.id}
                            className="cursor-pointer"
                            onClick={() =>
                              (window.location.href = `/edit-visit/${v.id}`)
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <td>
                              <span className="badge bg-secondary">
                                {v.type}
                              </span>
                            </td>
                            <td>{v.clients?.name || '-'}</td>
                            <td>
                              {new Date(v.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: '2-digit',
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* 🔹 COLUMNA DERECHA */}
          <Col lg={9}>
            <Card>
              <div className="card-header">
                <h4 className="card-title">Visits Calendar</h4>
              </div>
              <Card.Body>
                {this.state.loading ? (
                  <p>Loading visits...</p>
                ) : (
                  <div className="app-fullcalendar" id="visits-calendar">
                    <FullCalendar
                      rerenderDelay={10}
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
                      headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay',
                      }}
                      initialView="dayGridMonth"
                      eventClick={this.eventClick}
                      events={this.state.calendarEvents}
                      editable={false}
                      droppable={false}
                      aspectRatio={1.5}
                      fixedWeekCount={false}
                      firstDay={1}
                      titleFormat={{ month: 'long', year: 'numeric' }}
                      locale="es"
                      displayEventTime={false}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VisitCalendar;
