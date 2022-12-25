import { createElement } from '../render.js';
import { Message } from '../const.js';

function createEmptyMessageTemplate() {
  return `<p class="trip-events__msg">${Message.EVERYTHING}</p>`;
}

export default class EventListEmptyView {
  #element = null;
  get template() {
    return createEmptyMessageTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
