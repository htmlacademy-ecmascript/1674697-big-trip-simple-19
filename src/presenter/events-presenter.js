import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventsEmptyView from '../view/events-empty-view.js';
import PointPresenter from './point-presenter.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortByPrice, sortByDay } from '../utils/sort.js';
import { SortType, FilterType } from '../utils/const.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #eventPoints = [];
  #pointPresenter = new Map();
  #pointsCommonData = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #eventsComponent = new EventListView();
  #noPointComponent = null;
  #filterType = FilterType.ALL;

  constructor({ eventListContainer, pointsModel }) {
    this.#eventsContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsCommonData = {
      tripDestinations: [...this.#pointsModel.tripDestinations],
      offersByType: [...this.#pointsModel.offersByType],
    };
    this.#eventPoints = [...this.#pointsModel.points];
    this.#eventPoints.forEach((point) => {
      point.tripDestinations = this.#pointsCommonData.tripDestinations;
      point.offersByType = this.#pointsCommonData.offersByType;
    });
    this.#renderEvents();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
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

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPointComponent = new EventsEmptyView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList() {
    render(this.#eventsComponent, this.#eventsContainer);
    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEvents() {
    if (this.#eventPoints.length > 0) {
      this.#sortPoints(this.#currentSortType);
      this.#renderSort();
      this.#renderPointList();
    } else {
      this.#renderNoPoints();
    }
  }
}
