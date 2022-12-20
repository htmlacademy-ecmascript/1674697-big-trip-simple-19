import FilterView from './view/filter-view.js';

import EventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  eventListContainer: tripEventsElement,
  pointsModel,
});

render(new FilterView(), tripFiltersElement);

eventsPresenter.init();
