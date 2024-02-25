import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import Appointment from "../Appointment/Appointment";
import WebinarEvent from "../WebinarEvent/WebinarEvent";
import "./CalendarScreen.scss";
import EventForm from "../EventForm/EventForm";
import SimpleModal from "../Modal/SimpleModal";
import CustomToolbar from "./CustomComponent/ToolBar/CustomToolBar";
import CustomHeader from "./CustomComponent/Header/Header.js";
import {
  CustomAgendaHeader,
  CustomDateHeader,
  CustomEvent,
  CustomAgendaToolbar,
} from "./CustomComponent/Agenda/Agenda.js";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  // Get today's date
  const today = new Date();
  const tomorrow = new Date(today);
  const totomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Increment the day for tomorrow
  totomorrow.setDate(totomorrow.getDate() + 2); // Increment the day for totomorrow

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Added state for selected date
  const [showAllEvents, setShowAllEvents] = useState(true);

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
      clientName: "Johan Le",
      description: "Meeting daily",
      color: "#FFE4C8",
    },
    {
      id: 2,
      title: "Webinar: How to make webinar on React",
      start: new Date(tomorrow.setHours(15, 0, 0, 0)), // Tomorrow at 3:00 PM
      end: new Date(tomorrow.setHours(16, 0, 0, 0)), // Tomorrow at 4:00 PM
      type: "event",
      eventUrl: "https://example.com/webinar",
      color: "#F9BE81",
    },
    {
      id: 3,
      title: "Interview with Johan Le",
      start: new Date(totomorrow.setHours(9, 0, 0, 0)),
      end: new Date(totomorrow.setHours(9, 30, 0, 0)),
      type: "appointment",
      clientName: "Johan Le",
      description: "Meeting daily",
      color: "#FFE4C8",
    },
    // More events...
  ]);

  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
    if (!isMobile) {
      setShowForm(true);
    }
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

  const handleDrillDown = (date, view) => {
    // If mobile, prevent default behavior
    if (isMobile) {
      // Custom behavior, or simply do nothing to prevent navigating to the day view
      // For instance, you could set state to show a custom day view modal or similar
      setSelectedDate(date);
      setShowAllEvents(false);
    } else {
      // If not mobile, allow default behavior (optional)
      // This would navigate to the day view or you can customize as needed
    }
  };

  // This is where you might adjust the events passed to the agenda view
  const filteredEventsForSelectedDate = showAllEvents
    ? events
    : events.filter(
        (event) =>
          moment(event.start).isSame(selectedDate, "day") ||
          moment(event.end).isSame(selectedDate, "day")
      );

  const toggleShowAllEvents = () => {
    setShowAllEvents(true);
  };

  const eventStyleGetter = (event, isMobile) => {
    let backgroundColor = event.color || "#FFE4C8"; // Default color if none is specified
    let borderLeftColor =
      event.type === "appointment"
        ? "4px solid var(--dark-blue-color)"
        : "4px solid var(--light-blue-color)"; // Check if type is appointment
    let style = {
      backgroundColor: backgroundColor,
      color: isColorBright(backgroundColor) ? "#0F4C81" : "#5684AE",
      border: "1px solid transparent",
      borderLeft: borderLeftColor,
    };
    let className = "";

    if (isMobile) {
      className = "mobileView";
      style.borderLeft =
        event.type === "appointment"
          ? "8px solid var(--dark-blue-color)"
          : "8px solid var(--light-blue-color)";
    }

    return {
      style: style,
      className: className,
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

  // CustomDay.js
  const CustomDay = ({ date }) => {
    return <div className="custom-day">{moment(date).format("ddd")}</div>;
  };

  const props = {
    events,
    localizer,
    popup: true,
    selectable: true,
    defaultDate: selectedDate,
    defaultView: "month",
    startAccessor: "start",
    endAccessor: "end",
    className: "react-big-calendar",
    onSelectSlot: handleSelectSlot,
    onSelectEvent: handleSelectEvent,
    eventPropGetter: (prop) => eventStyleGetter(prop, isMobile),
    messages: {
      week: "Week",
      day: "Day",
      month: "Month",
      previous: <BsChevronLeft />,
      next: <BsChevronRight />,
      today: "Today",
      agenda: "Agenda",

      showMore: (total) => `+${total} more`,
    },
    components: {
      event: ({ event }) => {
        if (event.type === "appointment") {
          return <Appointment event={event} />;
        } else if (event.type === "event") {
          return <WebinarEvent event={event} />;
        }
        return <div>Unknown event type</div>;
      },
      month: {
        header: CustomDay,
      },
      toolbar: (props) => (
        <CustomToolbar
          {...props}
          isMobile={isMobile}
          labelFormat={<CustomHeader {...props} isMobile={isMobile} />}
        />
      ),
    },
    style: isMobile
      ? { height: "auto", maxHeight: "36vh" }
      : { height: "auto", minHeight: "100vh" },
  };

  if (isMobile) {
    props.onDrillDown = handleDrillDown;
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
      <Calendar {...props} />
      {isMobile && (
        <Calendar
          {...props}
          className="agenda-calendar"
          defaultView="agenda"
          components={{
            agenda: {
              header: CustomAgendaHeader,
              event: CustomEvent,
            },
            toolbar: (prop) => (
              <CustomAgendaToolbar
                onViewAllClick={toggleShowAllEvents}
                {...prop}
              />
            ),
          }}
          events={filteredEventsForSelectedDate}
          // toolbar={false} // Disable the toolbar for this view
          style={{ height: "55vh", padding: "12px" }} // Adjust height accordingly
        />
      )}
    </div>
  );
};

export default CalendarScreen;
