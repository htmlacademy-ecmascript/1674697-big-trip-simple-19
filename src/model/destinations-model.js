import { getTripDestinations } from '../mock/point.js';
import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #destinations = getTripDestinations();

  get destinations() {
    return this.#destinations;
  }
}
