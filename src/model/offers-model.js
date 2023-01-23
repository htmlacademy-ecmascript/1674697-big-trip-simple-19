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
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }
}
