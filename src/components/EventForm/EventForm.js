import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './EventForm.css';
import { BsJustifyLeft, BsClock, BsPeople, BsCalendar2Event } from "react-icons/bs";

const EventForm = ({ eventDetails, onSave, onCancel }) => {
  // Initialize the form state with event details or default values
  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  const [event, setEvent] = useState({
    ...eventDetails,
    title: '',
    start: new Date(eventDetails.start)|| new Date(),
    end: new Date(eventDetails.end) || new Date(),
    type: eventDetails?.type || 'appointment', // Default type
    color: eventDetails?.color || ( eventDetails.type == 'appointment' ? '#FFE4C8': "#F9BE81"), // Default color blue
  });
  
  useEffect(() => {
    if (eventDetails) {
      setEvent({
        ...eventDetails,
        title: eventDetails?.title || '',
        start: isValidDate(new Date(eventDetails.start)) ? new Date(eventDetails.start) : new Date(),
        end: isValidDate(new Date(eventDetails.end)) ? new Date(eventDetails.end) : new Date(),
        type: eventDetails?.type || 'appointment',
        color: eventDetails?.color || ( eventDetails.type == 'appointment' ? '#FFE4C8': "#F9BE81"), // Default color blue
      });
    }
  }, [eventDetails]);
  
  const EventType = () => {
    return (
      <div className="event-type">
          <button
            className={event.type=="appointment"? "active" : ""}
            type="button"
            name="type"
            value="appointment"
            onClick={handleChange}
          >
              Appointment
          </button>

          <button
            className={event.type=="event"? "active" : ""}
            type="button"
            name="type"
            value="event"
            onClick={handleChange}
          >
              Event
          </button>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name, ", value: ", value)
    if (name === "start" || name === "end") {
      setEvent(prev => ({ ...prev, [name]: new Date(value) }));
    } else {
      setEvent(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    });
  };

  const toGMTPlus7ISOString = (date) => {
    // Convert date to GMT+7 and format as an ISO string without seconds and milliseconds
    return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm');
  };

  return (
    <div className="form-container event-form">
      <form onSubmit={handleSubmit}>
        <div className="event-title">
          <div>
            <label>
              <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}
                placeholder="Add title and time"
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="color"
                name="color"
                value={event.color}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        {event.mode == "create" ? <EventType /> : ""}
        

        <div className='event-attributes'>
          <div className='event-attribute'>
            <div>
              <label>
              <BsClock /> Start Date:
                <input
                  type="datetime-local"
                  name="start"
                  value={isValidDate(new Date(event.start)) 
                    ? toGMTPlus7ISOString(new Date(event.start))
                    : ''}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
              <BsClock /> End Date:
                <input
                  type="datetime-local"
                  name="end"
                  value={isValidDate(new Date(event.end)) 
                    ? toGMTPlus7ISOString(new Date(event.end))
                    : ''}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          
          {event.type == 'appointment'? (
            <div className='event-attribute'>
              <div>
                <label>
                  <BsPeople /> Client
                  <input
                    type="text"
                    name="clientName"
                    value={event.clientName ? event.clientName : ""}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <BsJustifyLeft /> Descriptions
                  <input
                    type="text"
                    name="description"
                    value={event.description ? event.description : ""}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className='event-attribute'>
              <div>
                <label>
                  <BsCalendar2Event /> Event
                  <input
                    type="text"
                    name="eventUrl"
                    value={event.eventUrl ? event.eventUrl : ""}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </label>
              </div>
            </div>
          )}

        </div>

        <div className="event-action">
          <button type="submit">Save</button>
        </div>
        {/* <button type="button" onClick={onCancel}>Cancel</button> */}
      </form>
    </div>
  );
};

export default EventForm;
