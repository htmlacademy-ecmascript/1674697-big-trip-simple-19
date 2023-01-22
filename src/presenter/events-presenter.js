import { RenderPosition, render, remove } from '../framework/render';
import { filter } from '../utils/filter';
import { SortType, FilterType, UpdateType, UserAction } from '../utils/const';
import { sortByPrice, sortByDay } from '../utils/sort';
import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EventsEmptyView from '../view/events-empty-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;

  #sortComponent = null;
  #eventsComponent = new EventListView();
  #noPointComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.ALL;

  constructor({ eventListContainer, pointsModel, filterModel, offersModel, destinationsModel, onNewPointDestroy }) {
    this.#eventsContainer = eventListContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventsComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderEvents();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        filteredPoints.sort(sortByDay);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortByPrice);
        break;
    }
    return filteredPoints;
  }

  createPoint() {
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      render(this.#eventsComponent, this.#eventsContainer);
    }
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);

    this.#newPointPresenter.init();
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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
        this.#pointPresenter.get(data.id).init(data);
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

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPointComponent = new EventsEmptyView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventsContainer);
  }

  #renderPointList(points) {
    render(this.#eventsComponent, this.#eventsContainer);
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearEvents({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
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
    if (!points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList(points);
  }
}
