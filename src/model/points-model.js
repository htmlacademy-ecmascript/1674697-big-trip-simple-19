import {getRandomPoint} from '../mock/point.js';

const TASK_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: TASK_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
