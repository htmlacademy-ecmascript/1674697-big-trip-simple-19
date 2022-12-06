import FilterView from './view/filter-view';
import {render} from './render.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), tripFiltersElement);
