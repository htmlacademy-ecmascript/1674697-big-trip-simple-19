import {getRandomPoint} from '../mock/point.js';

const ITEMS_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: ITEMS_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
