import he from 'he';
import AbstractView from '../framework/view/abstract-view';
import { humanizeEventDueDate } from '../utils/common';

function createEventListItemTemplate(point, tripDestinations, tripTypes) {
  const { basePrice, destination, type, dateFrom, dateTo, id } = point;

  const date = humanizeEventDueDate(dateFrom, 'MMM DD');
  const timeStart = humanizeEventDueDate(dateFrom, 'HH:mm');
  const timeEnd = humanizeEventDueDate(dateTo, 'HH:mm');
  const timeStartInDateTime = humanizeEventDueDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const timeEndInDateTime = humanizeEventDueDate(dateTo, 'YYYY-MM-DDTHH:mm');

  const destinations = tripDestinations.find((item) => item.id === destination);
  const offersType = tripTypes.find((offer) => offer.type === type);
  // const offersChecked = offersType.offers.filter((offer) => offers.includes(offer.id));
  const offersChecked = offersType.filter((offer) => offer.id === id).offers;

  const offersList = () => {
    if (!offersChecked.length) {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">No additional offers</span>
        </li>`
      );
    } else {
      const offersCheckedTemplate = offersChecked.map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('');
      return offersCheckedTemplate;
    }
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${timeStartInDateTime}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${he.encode(destinations.name)}</h3>
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
          ${offersList()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventListItemView extends AbstractView {
  #point = null;
  #tripDestinations = null;
  #tripTypes = null;
  #handleEditClick = null;

  constructor({ point, tripDestinations, tripTypes, onEditClick }) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#tripTypes = tripTypes;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editBtnHandler);
  }

  get template() {
    return createEventListItemTemplate(this.#point, this.#tripDestinations, this.#tripTypes);
  }

  #editBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
