import { Event } from '../context/Events';
import { UnionOmit } from '../utils/types';
import Modal, { ModalProps } from './Modal';
import { formatDate } from '../utils/formatDate';
import { Fragment, useId, useState } from 'react';
import { EVENT_COLORS } from '../context/useEvents';

type EventFormModalProps = {
    onSubmit: (event: UnionOmit<Event, 'id'>) => void;
} & (
    | { onDelete: () => void; event: Event; date?: never }
    | {
          onDelete?: never;
          event?: never;
          date: Date;
      }
) &
    Omit<ModalProps, 'children'>;

const EventFormModal = ({
    onSubmit,
    onDelete,
    event,
    date,
    ...modalProps
}: EventFormModalProps) => {
    const isNew = event == null;
    const formId = useId();
    const [selectedColor, setSelectedColor] = useState(
        event?.color || EVENT_COLORS[0],
    );
    const [isAllDayChecked, setIsAllDayChecked] = useState(
        event?.allDay || false,
    );
    const [startTime, setStartTime] = useState(event?.startTime || '');
    return (
        <Modal {...modalProps}>
            <div className="modal-title">
                <div>{isNew ? 'Add' : 'Edit'} Event</div>
                <small>
                    {formatDate(date || event.date, { dateStyle: 'short' })}
                </small>
                <button className="close-btn" onClick={modalProps.onClose}>
                    &times;
                </button>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor={`${formId}-name`}>Name</label>
                    <input required type="text" id={`${formId}-name`} />
                </div>
                <div className="form-group checkbox">
                    <input
                        onChange={e => setIsAllDayChecked(e.target.checked)}
                        checked={isAllDayChecked}
                        type="checkbox"
                        id={`${formId}-all-day`}
                    />
                    <label htmlFor={`${formId}-all-day`}>All Day?</label>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor={`${formId}-start-time`}>
                            Start Time
                        </label>
                        <input
                            required={!isAllDayChecked}
                            disabled={isAllDayChecked}
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            type="time"
                            id={`${formId}-start-time`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`${formId}-end-time`}>End Time</label>
                        <input
                            min={startTime}
                            required={!isAllDayChecked}
                            disabled={isAllDayChecked}
                            type="time"
                            id={`${formId}-end-time`}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Color</label>
                    <div className="row left">
                        {EVENT_COLORS.map(color => (
                            <Fragment key={color}>
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    id={`${formId}-${color}`}
                                    checked={selectedColor == color}
                                    onChange={() => setSelectedColor(color)}
                                    className="color-radio"
                                />
                                <label htmlFor={`${formId}-${color}`}>
                                    <span className="sr-only">{color}</span>
                                </label>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-success" type="submit">
                        {isNew ? 'Add' : 'Edit'}
                    </button>
                    {onDelete != null && (
                        <button
                            onClick={onDelete}
                            className="btn btn-delete"
                            type="button"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default EventFormModal;
