import moment from "moment";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import "./Agenda.scss";
import me from "~/assets/img/jpg/me.jpg";

// CustomAgendaHeader
export const CustomAgendaHeader = () => {
  return (
    <div className="custom-agenda-header">
      <h2>Upcoming Events</h2>
      <button className="view-all-button">View All</button>
    </div>
  );
};

// CustomDateHeader
export const CustomDateHeader = ({ label }) => {
  //   return <div className="custom-date-header">{label}</div>;
};

// CustomEvent
export const CustomEvent = ({ event}) => {
  const videoCall = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const viewProfile = (e) => {
    console.log('view, ',event)
  }

  return (
    <div className={"custom-event " + event.type}>
      <div className="event-details">
        <h3>{event.title}</h3>
        <div className="event-time">
          {moment(event.start).format("h:mm A")} —{" "}
          {moment(event.end).format("h:mm A")} GMT+7
        </div>
        {event.type !== "event" && (<div className="event-bottom">
            <div className="event-avatar"><img src={me} alt="Profile"/></div>
            <button className="event-action-button" onClick={viewProfile}>View Client Profile</button>
        </div>)}
      </div>
      <div className="video" onClick={videoCall}>{event.type !== "event" && <HiOutlineVideoCamera />}</div>
    </div>
  );
};

// CustomAgendaToolbar
export const CustomAgendaToolbar = ({ onViewAllClick, ...event }) => {
    let today = new Date();
    return (
        <div className="custom-agenda-header">
            <div>
                <h2>Upcoming Events</h2>
                <h4>Today, {today.getDate()} {moment(today).format("MMM")}</h4>
            </div>
            <button className="view-all-button" onClick={onViewAllClick}>View All</button>
        </div>
    );
};
