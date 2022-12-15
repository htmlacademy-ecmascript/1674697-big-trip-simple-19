import dayjs from 'dayjs';
import { HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION } from '../const.js';
import { getPhotoOfDestination, getRandomInteger, getRandomArrayElement } from './utils.js';

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

const tripDestinations = [
  {
    id: 0,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Venice',
    pictures: getPhotoOfDestination()
  },
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Florence',
    pictures: getPhotoOfDestination()
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Lucca',
    pictures: getPhotoOfDestination()
  },
  {
    id: 3,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Pisa',
    pictures: getPhotoOfDestination()
  },
  {
    id: 4,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Volterra',
    pictures: getPhotoOfDestination()
  },
  {
    id: 5,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Siena',
    pictures: getPhotoOfDestination()
  },
  {
    id: 6,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Milan',
    pictures: getPhotoOfDestination()
  },
  {
    id: 7,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Verona',
    pictures: getPhotoOfDestination()
  },
  {
    id: 8,
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Rim',
    pictures: getPhotoOfDestination()
  }
];

function getDestinations() {
  return tripDestinations;
}

const offers = [
  {
    id: 0,
    title: 'Upgrade to a business class',
    price: 120,
  },
  {
    id: 1,
    title: 'Book tickets',
    price: 40,
  },
  {
    id: 2,
    title: 'Lunch in city',
    price: 30,
  },
  {
    id: 3,
    title: 'Order Uber',
    price: 50,
  },
  {
    id: 4,
    title: 'Add breakfast',
    price: 50,
  },
  {
    id: 5,
    title: 'Rent a car',
    price: 200,
  },
  {
    id: 6,
    title: 'Switch to comfort',
    price: 80,
  },
  {
    id: 7,
    title: 'Add luggage',
    price: 30,
  },
  {
    id: 8,
    title: 'Switch to comfort class',
    price: 100,
  },
  {
    id: 9,
    title: 'Add meal',
    price: 15,
  },
  {
    id: 10,
    title: 'Choose seats',
    price: 5,
  },
  {
    id: 11,
    title: 'Travel by train',
    price: 40,
  }
];

const offersByType1 = [
  {
    type: 'taxi',
    offers: [0, 7],
  },
  {
    type: 'bus',
    offers: [],
  },
  {
    type: 'train',
    offers: [1, 7, 10],
  },
  {
    type: 'ship',
    offers: [0, 1, 7, 9],
  },
  {
    type: 'drive',
    offers: [5]
  },
  {
    type: 'flight',
    offers: [4, 6, 7, 9, 10]
  },
  {
    type: 'check-in',
    offers: [3, 4]
  },
  {
    type: 'sightseeing',
    offers: [1, 2, 11]
  },
  {
    type: 'restaurant',
    offers: [],
  }
];

const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: 0,
        title: 'Upgrade to a business class',
        price: 120,
      },
      {
        id: 1,
        title: 'Add luggage',
        price: 30,
      },
    ],
  },
  {
    type: 'bus',
    offers: [],
  },
  {
    type: 'train',
    offers: [
      {
        id: 0,
        title: 'Book tickets',
        price: 40,
      },
      {
        id: 1,
        title: 'Add luggage',
        price: 30,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 0,
        title: 'Book tickets',
        price: 40,
      },
      {
        id: 1,
        title: 'Add luggage',
        price: 30,
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 120,
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 0,
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 0,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 1,
        title: 'Switch to comfort',
        price: 80
      },
      {
        id: 2,
        title: 'Add meal',
        price: 15
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 5
      },
      {
        id: 4,
        title: 'Travel by train',
        price: 40
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 0,
        title: 'Add breakfast',
        price: 50
      },
      {
        id: 1,
        title: 'Order Uber',
        price: 50,
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 0,
        title: 'Book tickets',
        price: 40
      }, {
        id: 1,
        title: 'Lunch in city',
        price: 30
      },
      {
        id: 2,
        title: 'Travel by train',
        price: 40,
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [],
  }
];

function getOffersByType() {
  return offersByType;
}

const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
// const endTime = dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate();

const tripPoint = [
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 0,
    destination: 1,
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 1,
    destination: 2,
    offers: [],
    type: 'bus'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 2,
    destination: 3,
    offers: [1, 2],
    type: 'train'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 3,
    destination: 5,
    offers: [0, 1],
    type: 'ship'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 4,
    destination: 8,
    offers: [0],
    type: 'drive'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 5,
    destination: 0,
    offers: [0, 1, 4],
    type: 'flight'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 6,
    destination: 6,
    offers: [1],
    type: 'check-in'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 7,
    destination: 4,
    offers: [0, 2],
    type: 'sightseeing'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: 8,
    destination: 7,
    offers: [],
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(tripPoint);
}

export { getRandomPoint, offersByType, tripDestinations, getDestinations, getOffersByType };
