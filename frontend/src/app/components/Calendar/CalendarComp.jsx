import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComp.css';

const CalendarComp = ({ attendance }) => {
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const day = (`0${date.getDate()}`).slice(-2);
      const dateString = `${year}-${month}-${day}`;
      if (attendance[dateString] === 'present') {
        return 'react-calendar__tile present';
      } else if (attendance[dateString] === 'absent') {
        return 'react-calendar__tile absent';
      }
    }
  };

  return (
    <div>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarComp;