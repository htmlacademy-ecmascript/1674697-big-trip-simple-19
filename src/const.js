const OFFER_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const CITIES = [
  'Venice',
  'Florence',
  'Lucca',
  'Pisa',
  'Volterra',
  'Siena',
  'Milan',
  'Verona',
  'Rim'
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const PHOTOS = [
  'https://loremflickr.com/248/152?random=54',
  'https://loremflickr.com/248/152?random=250',
  'https://loremflickr.com/248/152?random=118',
  'https://loremflickr.com/248/152?random=73',
  'https://loremflickr.com/248/152?random=152',
  'https://loremflickr.com/248/152?random=154',
  'https://loremflickr.com/248/152?random=350',
  'https://loremflickr.com/248/152?random=18',
  'https://loremflickr.com/248/152?random=93',
  'https://loremflickr.com/248/152?random=172',
  'https://loremflickr.com/248/152?random=194',
  'https://loremflickr.com/248/152?random=450',
  'https://loremflickr.com/248/152?random=109',
  'https://loremflickr.com/248/152?random=403',
  'https://loremflickr.com/248/152?random=32'
];

const HOURS_GAP = 24;
const MIN_EVENT_DURATION = 1; // 1 час
const MAX_EVENT_DURATION = 168; // 7 дней в часах

export { OFFER_TYPE, CITIES, DESCRIPTION, PHOTOS, HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION };
