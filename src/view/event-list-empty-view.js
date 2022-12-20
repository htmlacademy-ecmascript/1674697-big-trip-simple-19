import { createElement } from '../render.js';

const messages = {
  everthing: 'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now'
};

function createMessageTemplate() {
  return `<p class="trip-events__msg">${messages.everthing}</p>`;
}

export default class EventsMessageView {
  #element = null;
  get template() {
    return createMessageTemplate();
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
