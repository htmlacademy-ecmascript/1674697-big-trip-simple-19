import Observable from '../framework/observable';
import {UpdateType} from '../utils/const';

export default class DestinationsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.offers;
    } catch (err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }
}
