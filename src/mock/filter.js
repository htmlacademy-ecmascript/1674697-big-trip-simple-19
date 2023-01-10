import { filter } from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterName, filteredPoints]) => ({
      name: filterName,
      count: filteredPoints(points).length,
    }),
  );
}

export { generateFilter };
