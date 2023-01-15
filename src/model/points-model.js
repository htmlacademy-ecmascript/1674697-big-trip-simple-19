import { getRandomPoint, offersByType, tripDestinations } from '../mock/point.js';
import { getRandomInteger } from '../mock/utils.js';
import Observable from '../framework/observable';

const TASK_COUNT = 10;

export default class PointsModel extends Observable {
  #points = Array.from({ length: getRandomInteger(0, TASK_COUNT) }, getRandomPoint);
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
