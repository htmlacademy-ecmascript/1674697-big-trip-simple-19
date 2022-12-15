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

export { getPhotoOfDestination, getRandomInteger, getRandomArrayElement };
