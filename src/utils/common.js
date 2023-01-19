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

function getOffersId(point, tripTypes) {
  return tripTypes.find((offer) => offer.type === point.type).offers;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export { humanizeEventDueDate, isFuturePoint, isEscapeKey, getOffersId, isDatesEqual };
