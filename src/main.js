import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from '../src/mock/filter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);
const eventsPresenter = new EventsPresenter({
  eventListContainer: tripEventsElement,
  pointsModel,
});

render(new FilterView({ filters }), tripFiltersElement);

eventsPresenter.init();
