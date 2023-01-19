import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventsEmptyView from '../view/events-empty-view.js';
import PointPresenter from './point-presenter.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import { sortByPrice, sortByDay } from '../utils/sort.js';
import { SortType, FilterType, UpdateType, UserAction } from '../utils/const.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #pointPresenter = new Map();
  #eventDestinations = null;
  #eventOffersByType = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #eventsComponent = new EventListView();
  #noPointComponent = null;
  #filterType = FilterType.ALL;

  constructor({ eventListContainer, pointsModel }) {
    this.#eventsContainer = eventListContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#eventDestinations = [...this.#pointsModel.tripDestinations];
    this.#eventOffersByType = [...this.#pointsModel.offersByType];
    this.#renderEvents();
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortByDay);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
    }
    return this.#pointsModel.points;
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#eventDestinations, this.#eventOffersByType);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({ resetSortType: true });
        this.#renderEvents();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderEvents();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, tripDestinations, tripTypes) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, tripDestinations, tripTypes);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPointComponent = new EventsEmptyView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointList(points) {
    render(this.#eventsComponent, this.#eventsContainer);
    points.forEach((point) => this.#renderPoint(point, this.#eventDestinations, this.#eventOffersByType));
  }

  #clearEvents({ resetSortType = false } = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEvents() {
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList(points);
  }
}
