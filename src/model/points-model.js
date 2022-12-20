import { getRandomPoint, offersByType, tripDestinations } from '../mock/point.js';

const TASK_COUNT = 10;

export default class PointsModel {
  #points = Array.from({ length: TASK_COUNT }, getRandomPoint);
  #tripDestinations = tripDestinations;
  #offersByType = offersByType;

  get points() {
    return this.#points;
  }

  get tripDestinations() {
    return this.#tripDestinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
