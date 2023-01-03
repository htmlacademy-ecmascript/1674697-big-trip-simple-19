import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import EventListItemView from '../view/event-list-item-view';
import FormEditEventView from '../view/form-edit-event-view';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #tripDestinations = null;
  #tripTypes = null;

  constructor({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init(point, tripDestinations, tripTypes) {
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#tripTypes = tripTypes;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventListItemView({
      point: this.#point,
      tripDestinations: this.#tripDestinations,
      tripTypes: this.#tripTypes,
      onEditClick: this.#handleEditClick,
    });
    this.#pointEditComponent = new FormEditEventView({
      point: this.#point,
      tripDestinations: this.#tripDestinations,
      tripTypes: this.#tripTypes,
      onFormSubmit: this.#handleFormSubmit,
      onEditClick: this.#handleFormSubmit,
    });

    render(this.#pointComponent, this.#pointListContainer);
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
