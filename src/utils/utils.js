import dayjs from 'dayjs';

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}
function isFuturePoint(dateFrom) {
  return dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));
}

function isEscapeKey(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { humanizeEventDueDate, isFuturePoint, isEscapeKey };
