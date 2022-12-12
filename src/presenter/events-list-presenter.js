import EventListView from '../view/event-list-view';
import FormNewEventView from '../view/form-new-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import { render } from '../render.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({ eventListContainer, pointsModel }) {
    this.eventListContainer = eventListContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventPoints = [...this.pointsModel.getPoints()];

    render(this.eventListComponent, this.eventListContainer);
    render(new FormEditEventView({ point: this.eventPoints[0] }), this.eventListComponent.getElement());
    render(new FormNewEventView(), this.eventListComponent.getElement());

    for (let i = 1; i < this.eventPoints.length; i++) {
      render(new EventListItemView({ point: this.eventPoints[i] }), this.eventListComponent.getElement());
    }
  }
}
