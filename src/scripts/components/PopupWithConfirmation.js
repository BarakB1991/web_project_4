import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // this._popup
    this._form = this._popup.querySelector('.popup__form');
  }

  submitHandler(call) {
    this._submitHandler = call;
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler();
      this.close();
    });
  };

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
