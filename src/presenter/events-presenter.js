import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { isEscapeKey } from '../utils.js';
import { render } from '../render.js';

export default class EventsPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #eventPoints = null;
  #eventDestinations = null;
  #eventOffersByType = null;
  #eventsSortComponent = new SortView();
  #eventListComponent = new EventListView();
  #emptyViewMessageComponent = new EventListEmptyView();

  constructor({ eventListContainer, pointsModel }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventDestinations = this.#pointsModel.tripDestinations;
    this.#eventOffersByType = this.#pointsModel.offersByType;

    if (this.#eventPoints.length > 0) {
      render(this.#eventsSortComponent, this.#eventListContainer);
      render(this.#eventListComponent, this.#eventListContainer);
      this.#eventPoints.forEach((point) => {
        this.#renderPoint(point, this.#eventDestinations, this.#eventOffersByType);
      });
    } else {
      render(this.#emptyViewMessageComponent, this.#eventListContainer);
    }
  }

  #renderPoint(point, tripDestinations, tripTypes) {
    const pointComponent = new EventListItemView({ point, tripDestinations, tripTypes });
    const pointEditEventComponent = new FormEditEventView({ point, tripDestinations, tripTypes });

    const replaceFormToPoint = () => {
      this.#eventListComponent.element.replaceChild(pointComponent.element, pointEditEventComponent.element);
    };

    const replacePointToForm = () => {
      this.#eventListComponent.element.replaceChild(pointEditEventComponent.element, pointComponent.element);
    };

    const escapeKeydownHandler = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    };

    pointEditEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.addEventListener('keydown', escapeKeydownHandler);
    });

    pointEditEventComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escapeKeydownHandler);
    });

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replacePointToForm);

    render(pointComponent, this.#eventListComponent.element);
  }
}
