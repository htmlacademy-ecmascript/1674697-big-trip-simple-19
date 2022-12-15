import EventListView from '../view/event-list-view.js';
import FormNewEventView from '../view/form-new-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventListComponent = new EventListView();

  constructor({ eventListContainer, pointsModel }) {
    this.eventListContainer = eventListContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventPoints = this.pointsModel.getPoints();
    this.eventDestinations = this.pointsModel.getTripDestinations();
    this.eventOffersByType = this.pointsModel.getOffersByType();

    render(this.eventListComponent, this.eventListContainer);
    render(new FormEditEventView({ point: this.eventPoints[0], tripDestinations: this.eventDestinations, tripTypes: this.eventOffersByType }), this.eventListComponent.getElement());
    render(new FormNewEventView(), this.eventListComponent.getElement());

    this.eventPoints.forEach((event) => {
      render(new EventListItemView({ point: event, tripDestinations: this.eventDestinations, tripTypes: this.eventOffersByType }), this.eventListComponent.getElement());
    });
  }
}
