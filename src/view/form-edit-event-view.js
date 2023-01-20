import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEventDueDate, getOffersId } from '../utils/common.js';
import { TYPES } from '../utils/const.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: -1,
  offers: [],
  type: TYPES[0],
};

function createFormEditEventTemplate(point, tripDestinations, tripTypes) {
  const { basePrice, type, destination, offers, dateFrom, dateTo, id } = point;
  const isNewPoint = !('id' in point);

  const dateStart = humanizeEventDueDate(dateFrom, 'DD/MM/YY HH:mm');
  const dateEnd = humanizeEventDueDate(dateTo, 'DD/MM/YY HH:mm');

  const destinations = tripDestinations.find((item) => item.id === destination);
  const cities = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');

  const createTripTypeTemplate = () =>
    TYPES.map((eventType, index) => {
      const currentType = eventType.toLowerCase();
      const isChecked = currentType === type;

      return `<div class="event__type-item">
        <input id="event-type-${currentType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-${index}">${eventType}</label>
      </div>`;
    }).join('');

  const createOffersTemplate =
    getOffersId(point, tripTypes).map((offer, index) => {
      const checked = offers.includes(offer.id) ? 'checked' : '';
      const offerName = offer.title.toLowerCase().replaceAll(' ', '-');
      return `
        <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${offerName}" ${checked} data-offer-id="${offer.id}">
        <label class="event__offer-label" for="event-offer-${index}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join('');

  const createPointEditOffersTemplate = () =>
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersTemplate}
      </div>
    </section>`;

  const createDestinationPictures = (pictures) => {
    if (!pictures.length) {
      return '';
    }
    const destinationPictures = pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('');

    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">${destinationPictures}</div>
      </div>`
    );
  };

  const createPointDestinationTemplate = () =>
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${(destinations.description !== '') ? `<p class="event__destination-description">${destinations.description}</p>` : ''}
      ${createDestinationPictures(destinations.pictures)}
    </section>`;

  const createPointEditInfoTemplate = () => {
    if (getOffersId(point, tripTypes).length === 0 && destinations.description === '') {
      return '';
    }
    return (`
      <section class="event__details">
        ${(getOffersId(point, tripTypes).length > 0) ? `${createPointEditOffersTemplate()}` : ''}
        ${(destinations !== -1) ? `${createPointDestinationTemplate()}` : ''}
      </section>
    `);
  };

  const createCloseButtonTemplate = () =>
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

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
            <label class="event__label  event__type-output" for="event-destination-${point.id}">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinations.name}" list="destination-list-${point.id}">
            <datalist id="destination-list-${point.id}">
              ${cities}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${dateStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
          ${isNewPoint ? '' : createCloseButtonTemplate()}
        </header>
        ${createPointEditInfoTemplate()}
      </form>
    </li>`
  );
}

export default class FormEditEventView extends AbstractStatefulView {
  #tripDestinations = null;
  #tripTypes = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = {...BLANK_POINT} , tripDestinations, tripTypes, onFormSubmit, onEditClick, onDeleteClick }) {
    super();
    this.#tripDestinations = tripDestinations;
    this.#tripTypes = tripTypes;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;
    this.#handleDeleteClick = onDeleteClick;
    this._setState(FormEditEventView.parsePointToState(point));

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editBtnHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    if (getOffersId(this._state, this.#tripTypes).length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.#setDatepicker();
  }

  get template() {
    return createFormEditEventTemplate(this._state, this.#tripDestinations, this.#tripTypes);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    const tripType = evt.target.value;
    this.updateElement({
      type: tripType,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const destination = this.#tripDestinations.find((item) => item.name === evt.target.value);
    if (destination === undefined) {
      this.reset(this._state);
    } else {
      this.updateElement({ destination: destination.id });
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    let offers = this._state.offers;
    const currentOffer = parseInt(evt.target.dataset.offerId, 10);

    if (evt.target.checked) {
      offers.push(currentOffer);
      offers.sort();
    } else {
      offers = this._state.offers.filter((e) => e !== currentOffer);
    }
    this.updateElement({ offers });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const price = Number(evt.target.value);
    evt.target.value = isNaN(price) ? this._state.basePrice : price;
    this._setState({ basePrice: evt.target.value });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditEventView.parseStateToPoint(this._state));
  };

  #editBtnHandler = () => {
    this.#handleEditClick();
  };

  #deleteClickHandler = () => {
    this.#handleDeleteClick(FormEditEventView.parseStateToPoint(this._state));
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset(point) {
    this.updateElement(
      FormEditEventView.parsePointToState(point),
    );
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
