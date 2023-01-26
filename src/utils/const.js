const HOURS_GAP = 24;
const MIN_EVENT_DURATION = 60; // 1 час
const MAX_EVENT_DURATION = 10080; // 7 дней в часах

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future'
};

const Message = {
  [FilterType.ALL]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now'
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

export { HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION, TYPES, Message, FilterType, SortType, UserAction, UpdateType };
