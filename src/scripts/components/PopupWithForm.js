import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector); // this._popup
    this.handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._originalButtonText = this._form.querySelector('button[type="submit"]').textContent;
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll('.popup__input')];
    const inputValues = {};

    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  renderLoadingOnButton() {
    this._form.querySelector('button[type="submit"]').textContent = 'Saving...';
  }

  removeLoadingOnButton() {
    this._form.querySelector('button[type="submit"]').textContent = this._originalButtonText;
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.handleSubmit(this._getInputValues());
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
