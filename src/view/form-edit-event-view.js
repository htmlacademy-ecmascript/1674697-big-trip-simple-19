import dayjs from 'dayjs';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeEventDueDate, getOffersId } from '../utils/common';
import { TYPES } from '../utils/const';

const BLANK_POINT = {
  basePrice: '',
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: -1,
  offers: [],
  type: TYPES[0],
};

const createTripTypeTemplate = (data) =>
  TYPES.map((eventType, index) => {
    const currentType = eventType.toLowerCase();
    const isChecked = currentType === data.type;

    return `<div class="event__type-item">
        <input id="event-type-${currentType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-${index}">${eventType}</label>
      </div>`;
  }).join('');

const createOffersTemplate = (data, tripTypes) => {
  const offersMarkup = getOffersId(data, tripTypes).map((offer, index) => {
    const checked = data.offers.includes(offer.id) ? 'checked' : '';
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

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>
  `);
};

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

const createPointDestinationTemplate = (data, tripDestinations) => {
  const destinations = tripDestinations.find((item) => item.id === data.destination);
  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${(destinations.description !== '') ? `<p class="event__destination-description">${destinations.description}</p>` : ''}
      ${createDestinationPictures(destinations.pictures)}
    </section>
  `);
};

const createPointEditInfoTemplate = (data, tripDestinations, tripTypes) => (`
      <section class="event__details">
        ${data.offers ? `${createOffersTemplate(data, tripTypes)}` : ''}
        ${(data.destination !== -1) ? `${createPointDestinationTemplate(data, tripDestinations)}` : ''}
      </section>
    `);

function createFormEditEventTemplate(data, tripTypes, tripDestinations) {
  const { basePrice, type, dateFrom, dateTo, isDisabled, isSaving, isDeleting } = data;
  const isNewPoint = !('id' in data);

  const dateStart = humanizeEventDueDate(dateFrom, 'DD/MM/YY HH:mm');
  const dateEnd = humanizeEventDueDate(dateTo, 'DD/MM/YY HH:mm');
  const cities = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');

  let isSubmitDisabled = true;
  let destName = '';
  if (data.destination !== -1) {
    destName = tripDestinations.find((item) => item.id === data.destination);

    isSubmitDisabled = false;
  }

  const createCloseButtonTemplate = () =>
    `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
      <span class="visually-hidden">Open event</span>
    </button>`;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${data.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${data.id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTripTypeTemplate(data)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${data.id}">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${data.id}" type="text" name="event-destination" value="${destName ? he.encode(destName.name) : ''}" list="destination-list-${data.id}" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-${data.id}">
              ${cities}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${data.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${data.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${data.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${data.id}" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isNewPoint ? 'Cancel' : `${isDeleting ? 'Deleting...' : 'Delete'}`}</button>
          ${isNewPoint ? '' : createCloseButtonTemplate()}
        </header>
        ${createPointEditInfoTemplate(data, tripDestinations, tripTypes)}
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

  constructor({ point = BLANK_POINT, tripDestinations, tripTypes, onFormSubmit, onEditClick, onDeleteClick }) {
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
    const rollupBtnElement = this.element.querySelector('.event__rollup-btn');
    if (rollupBtnElement) {
      rollupBtnElement.addEventListener('click', this.#editBtnHandler);
    }
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
    return createFormEditEventTemplate(this._state, this.#tripTypes, this.#tripDestinations);
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
    if (isNaN(price)) {
      evt.target.value = this._state.basePrice;
    } else {
      this._state.basePrice = price;
    }
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
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
