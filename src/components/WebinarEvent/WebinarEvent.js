import React from 'react';

const WebinarEvent = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    {/* <p>URL: {event.eventUrl}</p> */}
    {/* Render other webinar event details as needed */}
  </span>
);

export default WebinarEvent;