import EventsListView from '../view/events-list-view';
// import FormNewEventView from '../view/form-new-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import EventsListItemView from '../view/events-list-item-view.js';
import {render} from '../render.js';

const ITEMS_COUNT = 3;

export default class EventsListPresenter {
  eventsListComponent = new EventsListView();

  constructor({eventsListContainer}) {
    this.eventsListContainer = eventsListContainer;
  }

  init() {
    render(this.eventsListComponent, this.eventsListContainer);
    // render(new FormNewEventView(), this.eventsListComponent.getElement());
    render(new FormEditEventView(), this.eventsListComponent.getElement());

    for (let i = 0; i < ITEMS_COUNT; i++) {
      render(new EventsListItemView(), this.eventsListComponent.getElement());
    }
  }
}
