import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventsEmptyView from '../view/events-empty-view.js';
import PointPresenter from './point-presenter.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortByPrice, sortByDay } from '../utils/sort.js';
import { SortType } from '../utils/const.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #eventPoints = [];
  #pointPresenter = new Map();
  #eventDestinations = null;
  #eventOffersByType = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedEventPoints = [];
  #eventsComponent = new EventListView();
  #noPointComponent = new EventsEmptyView();

  constructor({ eventListContainer, pointsModel }) {
    this.#eventsContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = this.#pointsModel.points.sort(sortByDay);
    this.#sourcedEventPoints = [...this.#pointsModel.points];
    this.#eventDestinations = [...this.#pointsModel.tripDestinations];
    this.#eventOffersByType = [...this.#pointsModel.offersByType];
    this.#renderEvents();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#sourcedEventPoints = updateItem(this.#sourcedEventPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#eventDestinations, this.#eventOffersByType);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#eventPoints.sort(sortByDay);
        break;
      case SortType.PRICE:
        this.#eventPoints.sort(sortByPrice);
        break;
      default:
        this.#eventPoints.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, tripDestinations, tripTypes) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, tripDestinations, tripTypes);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point, this.#eventDestinations, this.#eventOffersByType);
    });
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
    this.#renderPoints();
  }

  #renderEvents() {
    if (this.#eventPoints.length > 0) {
      this.#renderSort();
      this.#renderPointList();
    } else {
      this.#renderNoPoints();
    }
  }
}
