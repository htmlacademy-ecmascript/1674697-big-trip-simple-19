import {getRandomArrayElement} from '../utils.js';
import {OFFER_TYPE, CITIES, DESCRIPTION, PHOTOS} from '../const.js';

const mockDestination = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
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

const mockPoint = [
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '0',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'bus'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '1',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'taxi'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '2',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'train'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '3',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'ship'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '4',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'drive'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '5',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'flight'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '6',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'check-in'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '7',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'sightseeing'
  },
  {
    base_price: 1100,
    // date_from: '2019-07-10T22:55:56.845Z',
    // date_to: '2019-07-11T11:22:13.375Z',
    id: '8',
    destination:  mockDestination,
    offers:  Array.from({length: 5}, getRandomOffers),
    type: 'restaurant'
  }
];

console.log(mockPoint);

const mockLocalPoint = {
  base_price: 222,
  // date_from: '2019-07-10T22:55:56.845Z',
  // date_to: '2019-07-11T11:22:13.375Z',
  // destination: $Destination.id$,
  // offers: $Array<Offer.id>$,
  // type: 'taxi'
  destination:  mockDestination,
  offers:  Array.from({length: 5}, getRandomOffers),
  type: getRandomArrayElement(OFFER_TYPE),
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

