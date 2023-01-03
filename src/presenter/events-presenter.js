import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventsEmptyView from '../view/events-empty-view.js';
import PointPresenter from './point-presenter';
import { RenderPosition, render, replace } from '../framework/render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #eventPoints = null;
  #pointPresenter = new Map();
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
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsComponent.element,
    });
    pointPresenter.init(point, tripDestinations, tripTypes);
    this.#pointPresenter.set(point.id, pointPresenter);
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

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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
