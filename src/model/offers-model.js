import Observable from '../framework/observable';
import {UpdateType} from '../utils/const';

export default class OffersModel extends Observable {
  #pointsApiService = null;
  #offers = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiService.offers;
      this._notify(UpdateType.INIT);
    } catch (err) {
      this._notify(UpdateType.ERROR);
      throw new Error('Error loading data from server');
    }
  }

  get offers() {
    return this.#offers;
  }
}
