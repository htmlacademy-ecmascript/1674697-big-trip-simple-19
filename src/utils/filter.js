import { FilterType } from './const';
import { isFuturePoint } from './utils.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom)),
};

export { filter };
