import dayjs from 'dayjs';
import { HOURS_GAP, MIN_EVENT_DURATION, MAX_EVENT_DURATION } from '../utils/const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function generatePhotoOfDestination() {
  const photosNumber = getRandomInteger(1, 200);
  return {
    src: `https://loremflickr.com/248/152?random=${photosNumber}`,
    description: 'Some beautiful place',
  };
}

function getPhotoOfDestination() {
  return new Array(getRandomInteger(0, 5)).fill().map(() => generatePhotoOfDestination());
}

const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
const endTime = dayjs(startTime).add(getRandomInteger(MIN_EVENT_DURATION, MAX_EVENT_DURATION), 'minute').toDate();

export { getPhotoOfDestination, getRandomInteger, getRandomArrayElement, startTime, endTime };
