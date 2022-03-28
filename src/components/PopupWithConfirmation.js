import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // this._popup
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitgHandler(call) {
    this._handleSubmit = call;
  }

  _setEventListeners = evt => {
    evt.preventDefault();
    this._handleSubmit();
  };

  renderLoadingOnButton() {
    this._form.querySelector('button[type="submit"]').textContent = 'Loading...';
  }

  removeLoadingOnButton() {
    this._form.querySelector('button[type="submit"]').textContent = 'Yes';
  }

  open() {
    super.open();
    this._form.addEventListener('submit', this._setEventListeners);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._setEventListeners);
  }
}
