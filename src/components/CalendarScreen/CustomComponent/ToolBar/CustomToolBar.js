import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight, BsChevronDown } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import Button from '~/components/Button/Button';
import './CustomToolBar.scss';

const CustomToolbar = ({ label, onNavigate, view, onView, localizer, isMobile, labelFormat}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const views = ["month", "week", "day", "agenda"];
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  console.log(days);

  const handleViewChange = (newView) => {
    onView(newView);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const goToToday = () => {
    const now = new Date();
    onNavigate('TODAY', now);
  };

  return (
    <div>
      <div className="custom-toolbar">

        {/* {!isMobile && (<span className="custom-toolbar">
          <Button onClick={goToToday}>Today</Button>
          <Button onClick={() => onNavigate("PREV")} className="navigatePrev"><BsChevronLeft /></Button>
          <Button onClick={() => onNavigate("NEXT")} className="navigateNext"><BsChevronRight /></Button>
        </span>)} */}
        
        {isMobile ? (
          <span className="" style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button onClick={() => onNavigate("PREV")} className="navigatePrev"><FaChevronLeft /></Button>
            <div
              className="dropdown-wrapper"
              //onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="toolbar-label dropdown-toggle">{view == 'month' || view == 'week' || view == 'day' ? labelFormat: label}</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {views.map((viewOption) => (
                    viewOption !== 'agenda' ?(
                    <div
                      key={viewOption}
                      className="dropdown-item"
                      onClick={() => handleViewChange(viewOption)}
                    >
                      {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
                    </div>) : ""
                  ))}
                </div>
              )}
            </div>
            <Button onClick={() => onNavigate("NEXT")} className="navigateNext"><FaChevronRight /></Button>
          </span>
        ) : (
          <span className="custom-toolbar">
            <Button onClick={goToToday} className="navigateToday">Today</Button>
            <Button onClick={() => onNavigate("PREV")} className="navigatePrev"><FaChevronLeft /></Button>
            <Button onClick={() => onNavigate("NEXT")} className="navigateNext"><FaChevronRight /></Button>
            <span className="toolbar-label">{label}</span>
          </span>
        )}
        
        {/* Existing dropdown for view selection remains unchanged */}
        {!isMobile && (<div className="dropdown-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Button className="dropdown-toggle">
            {view.charAt(0).toUpperCase() + view.slice(1)} <FaChevronDown />
          </Button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {views.map((viewOption) => (
                <div
                  key={viewOption}
                  className="dropdown-item"
                  onClick={() => handleViewChange(viewOption)}
                >
                  {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>)}
      </div>
      {/* <div className="rbc-row rbc-month-header">
        {days && days.map((e, key) => <div key={key} className="rbc-header"><div className="custom-day">{e}</div></div>)}
      </div> */}
    </div>
  );
};

export default CustomToolbar;
