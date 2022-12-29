import AbstractView from '../framework/view/abstract-view.js';
import { Message } from '../utils/const.js';

function createEmptyMessageTemplate() {
  return `<p class="trip-events__msg">${Message.EVERYTHING}</p>`;
}

export default class EventListEmptyView extends AbstractView {
  get template() {
    return createEmptyMessageTemplate();
  }
}
