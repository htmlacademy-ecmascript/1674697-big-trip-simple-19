import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import NewPointButtonView from './view/new-point-button-view';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
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

render(new FilterView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => {}
}), tripFiltersElement);

render(new NewPointButtonView(), siteHeaderElement);

eventsPresenter.init();
