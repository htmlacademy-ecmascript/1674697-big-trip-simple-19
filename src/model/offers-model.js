import { getOffersByType } from '../mock/point.js';
import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #offers = getOffersByType();

  get offers() {
    return this.#offers;
  }
}
