import { FilterType } from './const';
import { isFuturePoint } from './common.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom, point.dateTo)),
};

function getFilteredEvents(points) {
  const pointsByFilter = {
    [FilterType.ALL]: points,
    [FilterType.FUTURE]: [],
  };
  for (const point of points) {
    if(isFuturePoint(point.dateFrom, point.dateTo)) {
      pointsByFilter[FilterType.FUTURE].push(point);
    }
  }
  return pointsByFilter;
}

export { filter, getFilteredEvents };
