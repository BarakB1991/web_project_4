import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector); // this._popup
    this.handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll('.popup__input')];
    const inputValues = {};

    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.handleSubmit(this._getInputValues());
      this.close();
    });
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
