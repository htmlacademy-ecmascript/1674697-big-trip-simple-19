import { RenderPosition, render, remove } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { filter } from '../utils/filter';
import { SortType, FilterType, UpdateType, UserAction } from '../utils/const';
import { sortByPrice, sortByDay } from '../utils/sort';
import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EventsEmptyView from '../view/events-empty-view';
import LoadingView from '../view/loading-view';
import ErrorView from '../view/error-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;

  #sortComponent = null;
  #eventsComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #ErrorView = new ErrorView();
  #noPointComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.ALL;
  #isLoading = true;

  #onNewPointDestroy = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ eventListContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#eventsContainer = eventListContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

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
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  #createNewPointPresenter() {
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventsComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointDestroy,
    });
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#createNewPointPresenter();
        remove(this.#loadingComponent);
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

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderError() {
    render(this.#ErrorView, this.#eventsContainer);
  }

  #renderPointList(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearEvents({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEvents() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.offers.length && !this.destinations.length) {
      this.#renderError();
      return;
    }

    const points = this.points;
    if (!points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#eventsComponent, this.#eventsContainer);
    this.#renderPointList(points);
  }
}
