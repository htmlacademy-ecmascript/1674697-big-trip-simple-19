import AbstractView from '../framework/view/abstract-view';
import { Message } from '../utils/const';

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
