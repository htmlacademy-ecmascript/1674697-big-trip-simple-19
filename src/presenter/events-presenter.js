import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { isEscapeKey } from '../utils/utils.js';
import { render, replace } from '../framework/render.js';

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
    const escKeydownHandler = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const pointComponent = new EventListItemView({
      point,
      tripDestinations,
      tripTypes,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeydownHandler);
      },
    });

    const pointEditComponent = new FormEditEventView({
      point,
      tripDestinations,
      tripTypes,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      },
      onEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }
}
