import React from 'react';

const Appointment = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    {/* <p>Client: {event.clientName}</p> */}
    {/* Render other appointment details as needed */}
  </span>
);

export default Appointment;