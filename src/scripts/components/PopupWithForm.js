import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector); // this._popup
    this._submitHandler = handleSubmit;
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
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
