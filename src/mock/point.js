import dayjs from 'dayjs';
import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { DESCRIPTION, HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION } from '../const.js';

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

// function getRandomDestination() {
//   return getRandomArrayElement(mockDestination);
// }

// const mockOffer = [
//   {
//     id: 0,
//     title: 'Upgrade to a business class',
//     price: 120,
//   },
//   {
//     id: 1,
//     title: 'Book tickets',
//     price: 40,
//   },
//   {
//     id: 2,
//     title: 'Lunch in city',
//     price: 30,
//   },
//   {
//     id: 3,
//     title: 'Order Uber',
//     price: 50,
//   },
//   {
//     id: 4,
//     title: 'Add breakfast',
//     price: 50,
//   },
//   {
//     id: 5,
//     title: 'Rent a car',
//     price: 200,
//   },
//   {
//     id: 6,
//     title: 'Switch to comfort',
//     price: 80,
//   },
//   {
//     id: 7,
//     title: 'Add luggage',
//     price: 30,
//   },
//   {
//     id: 8,
//     title: 'Switch to comfort class',
//     price: 100,
//   },
//   {
//     id: 9,
//     title: 'Add meal',
//     price: 15,
//   },
//   {
//     id: 10,
//     title: 'Choose seats',
//     price: 5,
//   },
//   {
//     id: 11,
//     title: 'Travel by train',
//     price: 40,
//   }
// ];

const mockOffersByType = [
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

const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
const endTime = dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate();

const mockPoint = [
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 0,
    destination: 1,
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 1,
    destination: 2,
    offers: [],
    type: 'bus'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 2,
    destination: 3,
    offers: [1, 2],
    type: 'train'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 3,
    destination: 5,
    offers: [0, 1],
    type: 'ship'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 4,
    destination: 8,
    offers: [0],
    type: 'drive'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 5,
    destination: 0,
    offers: [0, 1, 4],
    type: 'flight'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 6,
    destination: 6,
    offers: [1],
    type: 'check-in'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 7,
    destination: 4,
    offers: [0, 2],
    type: 'sightseeing'
  },
  {
    basePrice: getRandomInteger(120, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    id: 8,
    destination: 7,
    offers: [],
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoint);
}

export { getRandomPoint, mockOffersByType, mockDestination };
