import { ReactNode, createContext, useState } from 'react';
import { UnionOmit } from '../utils/types';
import { EVENT_COLORS } from './useEvents';

export type Event = {
    id: string;
    name: string;
    color: (typeof EVENT_COLORS)[number];
    date: Date;
} & (
    | { allDay: false; startTime: string; endTime: string }
    | { allDay: true; startTime?: never; endTime?: never }
);

type EventContext = {
    events: Event[];
    addEvent: (eventDetails: UnionOmit<Event, 'id'>) => void;
    updateEvent: (id: string, event: UnionOmit<Event, 'id'>) => void;
    deleteEvent: (id: string) => void;
};

export const Context = createContext<EventContext | null>(null);

type EventsProviderProps = {
    children: ReactNode;
};

export const EventsProvider = ({ children }: EventsProviderProps) => {
    const [events, setEvents] = useState<Event[]>([]);

    function addEvent(eventDetails: UnionOmit<Event, 'id'>) {
        setEvents(e => [...e, { ...eventDetails, id: crypto.randomUUID() }]);
    }

    function updateEvent(id: string, eventDetails: UnionOmit<Event, 'id'>) {
        setEvents(e => {
            return e.map(event => {
                return event.id === id ? { id, ...eventDetails } : event;
            });
        });
    }

    function deleteEvent(id: string) {
        setEvents(e => e.filter(event => event.id !== id));
    }

    return (
        <Context.Provider
            value={{ events, addEvent, updateEvent, deleteEvent }}
        >
            {children}
        </Context.Provider>
    );
};
