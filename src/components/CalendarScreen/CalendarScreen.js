import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import Appointment from "../Appointment/Appointment";
import WebinarEvent from "../WebinarEvent/WebinarEvent";
import "./CalendarScreen.css";
import EventForm from "../EventForm/EventForm";
import SimpleModal from "../Modal/SimpleModal";
import CustomToolbar from "./CustomComponent/ToolBar/CustomToolBar";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  // Get today's date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Increment the day for tomorrow
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize events with dynamic start and end dates based on today
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Client Meeting",
      start: new Date(today.setHours(10, 0, 0, 0)), // Today at 10:00 AM
      end: new Date(today.setHours(11, 0, 0, 0)), // Today at 11:00 AM
      type: "appointment",
      clientName: "John Doe",
      description: "Meeting daily",
      color: "#FFE4C8",
    },
    {
      id: 2,
      title: "Webinar on React",
      start: new Date(tomorrow.setHours(15, 0, 0, 0)), // Tomorrow at 3:00 PM
      end: new Date(tomorrow.setHours(16, 0, 0, 0)), // Tomorrow at 4:00 PM
      type: "event",
      eventUrl: "https://example.com/webinar",
      color: "#F9BE81",
    },
    {
      id: 3,
      title: "Webinar on React",
      start: new Date(tomorrow.setHours(15, 0, 0, 0)), // Tomorrow at 3:00 PM
      end: new Date(tomorrow.setHours(16, 0, 0, 0)), // Tomorrow at 4:00 PM
      type: "event",
      eventUrl: "https://example.com/webinar",
      color: "#F9BE81",
    },
    // More events...
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleAddOrUpdateEvent = (event) => {
    console.log(event);
    if (event.mode) {
      delete event.mode; // Remove mode in object
    }
    if (event.id) {
      setEvents(events.map((evt) => (evt.id === event.id ? event : evt)));
    } else {
      event.id = new Date().getTime(); // Simple ID assignment, consider a more robust approach
      setEvents([...events, event]);
    }
    setShowForm(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setShowForm(false);
  };

  const handleSelectSlot = (slotInfo) => {
    // slotInfo contains start and end date of the clicked slot
    console.log("select slot: ", slotInfo);
    const newEvent = {
      mode: "create",
      start: slotInfo.start,
      end: slotInfo.end,
      title: "", // Empty title, user will input
      type: "appointment", // Default to 'appointment' or make dynamic as needed
    };
    setSelectedEvent(newEvent); // Set as selected event to fill the form
    setShowForm(true); // Show the form
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color || "#FFE4C8"; // Default color if none is specified
    var borderLeftColor = event.type === "appointment" ? "4px solid var(--dark-blue-color)" : "4px solid var(--dark-blue-color)"; // Check if type is appointment
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: isColorBright(backgroundColor) ? "#0F4C81" : "#5684AE",
      border: "1px solid transparent",
      borderLeft: borderLeftColor,
      display: "block",
    };
    return {
      style: style,
    };
  };

  const isColorBright = (hex) => {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // Convert hex to RGB
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Using the luminance formula to find brightness
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5; // Bright colors will have luminance greater than 0.5
  };

  const CustomHeader = ({ date, localizer, isMobile, view }) => {
    let result = <span></span>;
    let formatString = "";
    switch (view) {
      case "month":
        formatString = isMobile ? "MMM YYYY" : "MMMM YYYY";
        result = <span>{localizer.format(date, formatString)}</span>;
        break;
      case "week":
        const startOfWeek = moment(date).startOf("week");
        const endOfWeek = moment(date).endOf("week");
        formatString = isMobile ? "MMM DD" : "MMMM DD";
        result = (
          <span>{`${startOfWeek.format(formatString)} - ${endOfWeek.format(
            formatString
          )}`}</span>
        );
        break;
      case "day":
        formatString = isMobile ? "ddd MMM DD" : "ddd MMM DD";
        result = <span>{localizer.format(date, formatString)}</span>;
        break;
    }
    return result;
  };

  // CustomDay.js
  const CustomDay = ({ date }) => {
    // setHeaderDate(prev => ([ ...prev, moment(date).format("ddd")]));
    return <div className="custom-day">{moment(date).format("ddd")}</div>;
  };

  const messages = {
    week: "Week",
    work_week: "Work week",
    day: "Day",
    month: "Month",
    previous: <BsChevronLeft />,
    next: <BsChevronRight />,
    today: "Today",
    agenda: "Agenda",

    showMore: (total) => `+${total} more`,
  }

  const components = {
    event: ({ event }) => {
      if (event.type === "appointment") {
        return <Appointment event={event} />;
      } else if (event.type === "event") {
        return <WebinarEvent event={event} />;
      }
      return <div>Unknown event type</div>;
    },
    month: {
      header: CustomDay
    },
    toolbar: (props) => (
      <CustomToolbar
        {...props}
        isMobile={isMobile}
        labelFormat={<CustomHeader {...props} isMobile={isMobile} />}
      />
    ),
  }

  return (
    <div>
      <SimpleModal isOpen={showForm} onClose={() => setShowForm(false)}>
        <EventForm
          eventDetails={selectedEvent}
          onSave={handleAddOrUpdateEvent}
          onCancel={() => setShowForm(false)}
        />
      </SimpleModal>
      <Calendar
        className="react-big-calendar"
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        startAccessor="start"
        endAccessor="end"
        style={isMobile ? { height: "auto", minHeight: "40vh" } : { height: "auto", minHeight: "100vh" }}
        defaultDate={new Date()}
        defaultView="month"
        messages={messages}
        components={components}
        popup
        eventPropGetter={eventStyleGetter}
      />
      {isMobile && <Calendar
        localizer={localizer}
        events={events}
        defaultView="agenda"
        toolbar={false} // Disable the toolbar for this view
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: 300 }} // Adjust height accordingly
      />}
    </div>
  );
};

export default CalendarScreen;
