import {
    addMonths,
    eachDayOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek,
    isBefore,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { cc } from '../utils/cc';
import EventFormModal from './EventFormModal';
import { useEvents } from '../context/useEvents';
import { Event } from '../context/Events';
import CalendarEvent from './CalendarEvent';

const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const calendarDays = useMemo(() => {
        const weekStart = startOfWeek(startOfMonth(selectedMonth), {
            weekStartsOn: 1,
        });
        const weekEnd = endOfWeek(endOfMonth(selectedMonth), {
            weekStartsOn: 1,
        });
        return eachDayOfInterval({
            start: weekStart,
            end: weekEnd,
        });
    }, [selectedMonth]);

    const { events } = useEvents();

    return (
        <div className="calendar">
            <div className="header">
                <button
                    onClick={() => setSelectedMonth(new Date())}
                    className="btn"
                >
                    Today
                </button>
                <div>
                    <button
                        onClick={() => setSelectedMonth(c => subMonths(c, 1))}
                        className="month-change-btn"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => setSelectedMonth(c => addMonths(c, 1))}
                        className="month-change-btn"
                    >
                        &gt;
                    </button>
                </div>
                <span className="month-title">
                    {formatDate(selectedMonth, {
                        month: 'long',
                        year: 'numeric',
                    })}
                </span>
            </div>
            <div className="days">
                {calendarDays.map((day, index) => (
                    <CalendarDay
                        key={day.getTime()}
                        day={day}
                        showWeekName={index < 7}
                        selectedMonth={selectedMonth}
                        events={events.filter(event =>
                            isSameDay(day, event.date),
                        )}
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
    events: Event[];
};

const CalendarDay = ({
    day,
    showWeekName,
    selectedMonth,
    events,
}: CalendatDayProps) => {
    const { addEvent } = useEvents();
    const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

    const sortedEvents = useMemo(() => {
        const timeToNumber = (time: string) =>
            parseFloat(time.replace(':', '.'));

        return [...events].sort((a, b) => {
            if (a.allDay && b.allDay) {
                return 0;
            } else if (a.allDay) {
                return -1;
            } else if (b.allDay) {
                return 1;
            } else {
                return timeToNumber(a.startTime) - timeToNumber(b.startTime);
            }
        });
    }, [events]);

    return (
        <div
            className={cc(
                'day',
                !isSameMonth(day, selectedMonth) && 'non-month-day',
                isBefore(endOfDay(day), new Date()) && 'old-month-day',
            )}
        >
            <div className="day-header">
                {showWeekName && (
                    <div className="week-name">
                        {formatDate(day, { weekday: 'short' })}
                    </div>
                )}
                <div className={cc('day-number', isToday(day) && 'today')}>
                    {formatDate(day, { day: 'numeric' })}
                </div>
                <button
                    className="add-event-btn"
                    onClick={() => setIsNewEventModalOpen(true)}
                >
                    +
                </button>
            </div>
            {events.length > 0 && (
                <div className="events">
                    {sortedEvents.map(event => (
                        <CalendarEvent key={event.id} event={event} />
                    ))}
                </div>
            )}
            <EventFormModal
                date={day}
                isOpen={isNewEventModalOpen}
                onClose={() => setIsNewEventModalOpen(false)}
                onSubmit={addEvent}
            />
        </div>
    );
};

export default Calendar;
