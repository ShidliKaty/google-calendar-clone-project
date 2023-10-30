import { parse } from 'date-fns';
import { Event } from '../context/Events';
import { cc } from '../utils/cc';
import { formatDate } from '../utils/formatDate';
import EventFormModal from './EventFormModal';
import { useState } from 'react';
import { useEvents } from '../context/useEvents';

const CalendarEvent = ({ event }: { event: Event }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { updateEvent, deleteEvent } = useEvents();
    return (
        <>
            <button
                onClick={() => setIsEditModalOpen(true)}
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
            <EventFormModal
                event={event}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={e => updateEvent(event.id, e)}
                onDelete={() => deleteEvent(event.id)}
            />
        </>
    );
};

export default CalendarEvent;
