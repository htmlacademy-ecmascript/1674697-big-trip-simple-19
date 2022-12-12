import dayjs from 'dayjs';
import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { OFFER_TYPE, DESCRIPTION, HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION } from '../const.js';

const generatePhotoOfDestination = () => {
  const photosNumber = getRandomInteger(1, 200);
  return {
    src: `https://loremflickr.com/248/152?random=${photosNumber}`,
    description: 'Some beautiful place',
  };
};

const getPhotoOfDestination = function () {
  return new Array(getRandomInteger(0, 5)).fill().map(() => generatePhotoOfDestination());
};

const mockDestination = [
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

function getRandomDestination() {
  return getRandomArrayElement(mockDestination);
}

const mockOffer = [
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

function getRandomOffers() {
  return getRandomArrayElement(mockOffer);
}

const mockOffersByType = {
  type: getRandomArrayElement(OFFER_TYPE),
  offers: Array.from({ length: getRandomInteger(0, 5) }, getRandomOffers),
};

const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
const endTime = dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate();

const mockPoint = [
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '0',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'taxi'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '1',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'bus'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '2',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'train'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '3',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'ship'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '4',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'drive'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '5',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'flight'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '6',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'check-in'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '7',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'sightseeing'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: '8',
    destination: getRandomDestination(),
    offers: mockOffersByType.offers,
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoint);
}

export { getRandomPoint };
