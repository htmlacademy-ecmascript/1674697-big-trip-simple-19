import dayjs from 'dayjs';

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { humanizeEventDueDate, isEscapeKey };
