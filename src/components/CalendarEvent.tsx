import { parse } from 'date-fns';
import { Event } from '../context/Events';
import { cc } from '../utils/cc';
import { formatDate } from '../utils/formatDate';

const CalendarEvent = ({ event }: { event: Event }) => {
    return (
        <button
            className={cc(
                'event',
                event.color,
                event.allDay && 'all-day-event',
            )}
        >
            {event.allDay ? (
                <div className="event-name">{event.name}</div>
            ) : (
                <>
                    <div className={`color-dot ${event.color}`}></div>
                    <div className="event-time">
                        {formatDate(
                            parse(event.startTime, 'HH:mm', event.date),
                            { timeStyle: 'short' },
                        )}
                    </div>
                    <div className="event-name">{event.name}</div>
                </>
            )}
        </button>
    );
};

export default CalendarEvent;
