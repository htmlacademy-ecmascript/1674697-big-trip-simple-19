import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic aSuGg42IWeHhas13';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const siteHeaderElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const eventsPresenter = new EventsPresenter({
  eventListContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  eventsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel,
  pointsModel
});

pointsModel.init().finally(() => {
  render(newPointButtonComponent, siteHeaderElement);
});

filterPresenter.init();
eventsPresenter.init();
