import AbstractView from '../framework/view/abstract-view.js';
import { Message } from '../utils/const.js';

function createNoPointTemplate(FilterType) {
  return `<p class="trip-events__msg">${Message[FilterType]}</p>`;
}

export default class EventsEmptyView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
