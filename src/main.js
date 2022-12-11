import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventListPresenter from './presenter/events-list-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const eventListPresenter = new EventListPresenter({
  eventListContainer: tripEventElement,
  pointsModel,
});

render(new FilterView(), tripFiltersElement);
render(new SortView(), tripEventElement);

eventListPresenter.init();
