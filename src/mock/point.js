import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import { HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION } from '../utils/const.js';
import { getPhotoOfDestination, getRandomInteger, getRandomArrayElement, startTime } from './utils.js';

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

const tripPoints = [
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [1],
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [2],
    offers: [],
    type: 'bus'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [3],
    offers: [1, 2],
    type: 'train'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [5],
    offers: [0, 1],
    type: 'ship'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [8],
    offers: [0],
    type: 'drive'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [0],
    offers: [0, 1, 4],
    type: 'flight'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [6],
    offers: [1],
    type: 'check-in'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [4],
    offers: [0, 2],
    type: 'sightseeing'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate(),
    dateTo: dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate(),
    id: nanoid(),
    destination: [7],
    offers: [],
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(tripPoints);
}

export { getRandomPoint, offersByType, tripDestinations };
