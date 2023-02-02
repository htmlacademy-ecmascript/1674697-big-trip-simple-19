import dayjs from 'dayjs';

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

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const BLANK_POINT = {
  basePrice: '',
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: -1,
  offers: [],
  type: TYPES[0],
};

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

export { TYPES, POINT_TYPES, BLANK_POINT, Message, FilterType, SortType, UserAction, UpdateType };
