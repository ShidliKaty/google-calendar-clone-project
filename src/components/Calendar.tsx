import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import { formatDate } from "../utils/formatDate";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const weekStart = startOfWeek(startOfMonth(selectedMonth), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(endOfMonth(selectedMonth), { weekStartsOn: 1 });
  const calendarDays = useMemo(() => {
    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
  }, [selectedMonth]);

  return (
    <div className='calendar'>
      <div className='header'>
        <button className='btn'>Today</button>
        <div>
          <button className='month-change-btn'>&lt;</button>
          <button className='month-change-btn'>&gt;</button>
        </div>
        <span className='month-title'>June 2023</span>
      </div>
      <div className='days'>
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            showWeekName={index < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
};

type CalendatDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
};


const CalendarDay = ({
  day,
  showWeekName,
  selectedMonth,
}: CalendatDayProps) => {
  return (
    <div className='day non-month-day old-month-day'>
      <div className='day-header'>
        {showWeekName && <div className='week-name'>{formatDate(day, {weekday: "short"})}</div>}
        <div className='day-number'>{formatDate(day, {day: "numeric"})}</div>
        <button className='add-event-btn'>+</button>
      </div>
      {/* <div className="events">
          <button className="all-day-event blue event">
            <div className="event-name">Short</div>
          </button>
          <button className="all-day-event green event">
            <div className="event-name">
              Long Event Name That Just Keeps Going
            </div>
          </button>
          <button className="event">
            <div className="color-dot blue"></div>
            <div className="event-time">7am</div>
            <div className="event-name">Event Name</div>
          </button>
        </div> */}
    </div>
  );
};

export default Calendar;
