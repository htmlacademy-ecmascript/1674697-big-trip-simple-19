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
      this._notify(UpdateType.INIT);
    } catch (err) {
      this._notify(UpdateType.ERROR);
      throw new Error('Error loading data from server');
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
