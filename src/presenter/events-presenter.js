import EventListView from '../view/event-list-view.js';
import FormNewEventView from '../view/form-new-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #eventPoints = null;
  #eventDestinations = null;
  #eventOffersByType = null;
  #eventListComponent = new EventListView();

  // #eventPoints = [];
  // #eventDestinations = [];
  // #eventOffersByType = [];

  constructor({ eventListContainer, pointsModel }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventDestinations = this.#pointsModel.tripDestinations;
    this.#eventOffersByType = this.#pointsModel.offersByType;

    render(this.#eventListComponent, this.#eventListContainer);
    // render(new FormEditEventView({ point: this.#eventPoints[0], tripDestinations: this.#eventDestinations, tripTypes: this.#eventOffersByType }), this.#eventListComponent.element);
    // render(new FormNewEventView(), this.#eventListComponent.element);

    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point, this.#eventDestinations, this.#eventOffersByType);
    });
  }

  #renderPoint(point, tripDestinations, tripTypes) {
    const pointComponent = new EventListItemView({point, tripDestinations, tripTypes});

    render(pointComponent, this.#eventListComponent.element);
  }
}
