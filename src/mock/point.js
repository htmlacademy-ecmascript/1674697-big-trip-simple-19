import dayjs from 'dayjs';
import {getRandomArrayElement, getRandomInteger} from '../utils.js';
import {OFFER_TYPE, CITIES, DESCRIPTION, PHOTOS, HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION} from '../const.js';

const mockDestination = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: getRandomArrayElement(PHOTOS),
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: getRandomArrayElement(PHOTOS),
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: getRandomArrayElement(PHOTOS),
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: getRandomArrayElement(PHOTOS),
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: getRandomArrayElement(PHOTOS),
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  }
];

const mockOffer = [
  {
    id: 0,
    title: 'Upgrade to a business class',
    price: 120
  },
  {
    id: 1,
    title: 'Book tickets',
    price: 40
  },
  {
    id: 2,
    title: 'Lunch in city',
    price: 30
  },
  {
    id: 3,
    title: 'Order Uber',
    price: 50
  },
  {
    id: 4,
    title: 'Add breakfast',
    price: 50
  },
  {
    id: 5,
    title: 'Rent a car',
    price: 200
  },
  {
    id: 6,
    title: 'Switch to comfort',
    price: 80
  },
  {
    id: 7,
    title: 'Add luggage',
    price: 30
  },
  {
    id: 8,
    title: 'Switch to comfort class',
    price: 100
  },
  {
    id: 9,
    title: 'Add meal',
    price: 15
  },
  {
    id: 10,
    title: 'Choose seats',
    price: 5
  },
  {
    id: 11,
    title: 'Travel by train',
    price: 40
  }
];

function getRandomOffers() {
  return getRandomArrayElement(mockOffer);
}

const mockOffersByType = {
  type: getRandomArrayElement(OFFER_TYPE),
  offers: Array.from({length: 5}, getRandomOffers),
};

const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
const endTime = dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate();

const mockPoint = {
  basePrice: getRandomInteger(120, 1000),
  dateFrom: startTime,
  dateTo: endTime,
  id: '0',
  destination:  mockDestination,
  offers:  mockOffersByType.offers,
  type: mockOffersByType.type
};

console.log(mockPoint);

const mockLocalPoint = {
  basePrice: getRandomInteger(120, 1000),
  dateFrom: startTime,
  dateTo: endTime,
  destination:  mockDestination,
  offers:  mockOffersByType.offers,
  type: mockOffersByType.type
};

const mockAuthorizationError = {
  error: 401,
  message: 'Header Authorization is not correct'
};

const mockNotFoundError = {
  error: 404,
  message: 'Not found'
};

function getRandomPoint() {
  return getRandomArrayElement(mockPoint);
}

export {getRandomPoint};

