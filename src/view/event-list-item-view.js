import { createElement } from '../render.js';
import { humanizeEventDueDate } from '../utils.js';

function createEventListItemTemplate(point) {
  const { basePrice, destination, type, offers, dateFrom, dateTo } = point;

  const date = humanizeEventDueDate(dateFrom, 'MMM DD');
  const timeStart = humanizeEventDueDate(dateFrom, 'HH:mm');
  const timeEnd = humanizeEventDueDate(dateTo, 'HH:mm');
  const timeStartInDateTime = humanizeEventDueDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const timeEndInDateTime = humanizeEventDueDate(dateTo, 'YYYY-MM-DDTHH:mm');

  const createOfferElement = (offers) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offers.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers.price}</span>
    </li>`;

  const offersList = offers.map((item) => createOfferElement(item)).join(' ');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${timeStartInDateTime}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${timeStartInDateTime}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${timeEndInDateTime}">${timeEnd}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventListItemView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate() {
    return createEventListItemTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
