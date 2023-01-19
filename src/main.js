import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import NewPointButtonView from './view/new-point-button-view';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const filters = [
  {
    type: 'everything',
    name: 'ALL',
    count: 0,
  },
];

const eventsPresenter = new EventsPresenter({
  eventListContainer: tripEventsElement,
  pointsModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel,
  pointsModel
});

render(new NewPointButtonView(), siteHeaderElement);

filterPresenter.init();
eventsPresenter.init();
