import AbstractView from '../framework/view/abstract-view';
import { humanizeEventDueDate } from '../utils/common';

function createEventListItemTemplate(point, destinations, tripOffers) {
  const { basePrice, type, dateFrom, dateTo, destination, offers } = point;

  const date = humanizeEventDueDate(dateFrom, 'MMM DD');
  const timeStart = humanizeEventDueDate(dateFrom, 'HH:mm');
  const timeEnd = humanizeEventDueDate(dateTo, 'HH:mm');
  const timeStartInDateTime = humanizeEventDueDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const timeEndInDateTime = humanizeEventDueDate(dateTo, 'YYYY-MM-DDTHH:mm');

  const destinationName = destinations.find((item) => item.id === destination);
  const offersType = tripOffers.find((offer) => offer.type === type);
  const offersChecked = offersType.offers.filter((offer) => offers.includes(offer.id));

  const createOffersList = () => {
    if (point.offers.length === 0) {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">No additional offers</span>
        </li>`
      );
    } else {
      return offersChecked.map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('');
    }
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${timeStartInDateTime}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName ? destinationName.name : ''}</h3>
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
          ${createOffersList()}
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
  #destinations = null;
  #offers = null;
  #handleEditClick = null;

  constructor({ point, destinations, offers, onEditClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editBtnHandler);
  }

  get template() {
    return createEventListItemTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
