import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDueDate } from '../utils/common.js';
import { TYPES } from '../utils/const.js';

function createFormEditEventTemplate(point, tripDestinations, tripTypes) {
  const { basePrice, type, destination, offers, dateFrom, dateTo, id } = point;

  const dateStart = humanizeEventDueDate(dateFrom, 'YY/MM/DD HH:mm');
  const dateEnd = humanizeEventDueDate(dateTo, 'YY/MM/DD HH:mm');

  const destinations = tripDestinations.find((item) => destination.includes(item.id));
  const offerByType = tripTypes.find((offer) => offer.type === type);
  const tripOffers = offerByType.offers;

  const createTripTypeTemplate = () =>
    TYPES.map((eventType, index) => {
      const currentType = eventType.toLowerCase();
      const isTypeChecked = currentType === type;

      return `<div class="event__type-item">
        <input id="event-type-${currentType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isTypeChecked ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-${index}">${eventType}</label>
      </div>`;
    }).join('');

  const createOffersTemplate =
    tripOffers.map((offer) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${offers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');

  const cities = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTripTypeTemplate(TYPES)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${destinations.id}" type="text" name="event-destination" value="${destinations.name}" list="destination-list-${destinations.id}">
            <datalist id="destination-list-${destinations.id}">
              ${cities}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            ${createOffersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinations.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class FormEditEventView extends AbstractView {
  #point = null;
  #tripDestinations = null;
  #tripTypes = null;
  #handleFormSubmit = null;
  #handleEditClick = null;

  constructor({ point, tripDestinations, tripTypes, onFormSubmit, onEditClick }) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#tripTypes = tripTypes;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editBtnHandler);
  }

  get template() {
    return createFormEditEventTemplate(this.#point, this.#tripDestinations, this.#tripTypes);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #editBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
