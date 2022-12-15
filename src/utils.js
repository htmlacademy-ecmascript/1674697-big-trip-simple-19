import dayjs from 'dayjs';

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

export { humanizeEventDueDate };
