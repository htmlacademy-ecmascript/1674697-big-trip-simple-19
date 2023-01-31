import dayjs from 'dayjs';

const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');

const formatTime = (date) => dayjs(date).format('HH:mm');

const formatFormDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

function isFuturePoint(dateFrom) {
  return dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));
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

export { formatDate, formatTime, formatFormDate, isFuturePoint, isEscapeKey, getOffersId, isDatesEqual };
