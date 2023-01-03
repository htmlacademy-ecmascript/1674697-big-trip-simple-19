import dayjs from 'dayjs';

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function isStartDateExpired(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isEndDateExpired(dateTo) {
  return dayjs(dateTo).isAfter(dayjs());
}

function isFuturePoint(dateFrom, dateTo) {
  return isStartDateExpired(dateFrom) && isEndDateExpired(dateTo);
}

function isEscapeKey(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { humanizeEventDueDate, isFuturePoint, isEscapeKey, updateItem };
