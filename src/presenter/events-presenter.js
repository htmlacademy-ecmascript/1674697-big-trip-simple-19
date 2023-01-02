import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import EventsEmptyView from '../view/events-empty-view.js';
import { isEscapeKey } from '../utils/utils.js';
import { RenderPosition, render, replace } from '../framework/render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #eventPoints = null;
  #eventDestinations = null;
  #eventOffersByType = null;
  #sortComponent = new SortView();
  #eventsComponent = new EventListView();
  #noPointComponent = new EventsEmptyView();

  constructor({ eventListContainer, pointsModel }) {
    this.#eventsContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#renderEvents();
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
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

    render(pointComponent, this.#eventsComponent.element);
  }

  #renderPoints(from, to) {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventDestinations = this.#pointsModel.tripDestinations;
    this.#eventOffersByType = this.#pointsModel.offersByType;

    this.#eventPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point, this.#eventDestinations, this.#eventOffersByType));
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointList() {
    render(this.#eventsComponent, this.#eventsContainer);
    this.#renderPoints(0, Math.min(this.#eventPoints.length));
  }

  #renderEvents() {
    this.#eventPoints = this.#pointsModel.points;

    if (this.#eventPoints.length > 0) {
      this.#renderSort();
      this.#renderPointList();
    } else {
      this.#renderNoPoints();
    }
  }
}
