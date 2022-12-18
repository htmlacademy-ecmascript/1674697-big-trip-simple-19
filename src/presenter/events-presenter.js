import EventListView from '../view/event-list-view.js';
// import FormNewEventView from '../view/form-new-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import { isEscapeKey } from '../utils.js';
import { render } from '../render.js';

export default class EventsPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #eventPoints = null;
  #eventDestinations = null;
  #eventOffersByType = null;
  #eventListComponent = new EventListView();

  constructor({ eventListContainer, pointsModel }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventDestinations = this.#pointsModel.tripDestinations;
    this.#eventOffersByType = this.#pointsModel.offersByType;

    render(this.#eventListComponent, this.#eventListContainer);
    // render(new FormNewEventView(), this.#eventListComponent.element);

    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point, this.#eventDestinations, this.#eventOffersByType);
    });
  }

  #renderPoint(point, tripDestinations, tripTypes) {
    const pointComponent = new EventListItemView({ point, tripDestinations, tripTypes });
    const pointEditEventComponent = new FormEditEventView({ point, tripDestinations, tripTypes });

    const escapeKeydownHandler = (evt) => {
      if (isEscapeKey) {
        closeEditFormHandler(evt);
      }
    };

    const replaceFormToPoint = () => {
      this.#eventListComponent.element.replaceChild(pointComponent.element, pointEditEventComponent.element);
      pointEditEventComponent.element.querySelector('form').removeEventListener('submit', closeEditFormHandler);
      pointEditEventComponent.element.querySelector('.event__rollup-btn').removeEventListener('click', replaceFormToPoint);
      document.removeEventListener('keydown', escapeKeydownHandler);
    };

    const replacePointToForm = () => {
      this.#eventListComponent.element.replaceChild(pointEditEventComponent.element, pointComponent.element);
      pointEditEventComponent.element.querySelector('form').addEventListener('submit', closeEditFormHandler);
      pointEditEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceFormToPoint);
      document.addEventListener('keydown', escapeKeydownHandler);
    };

    function closeEditFormHandler(evt) {
      evt.preventDefault();
      replaceFormToPoint();
    }

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replacePointToForm);

    render(pointComponent, this.#eventListComponent.element);
  }
}
