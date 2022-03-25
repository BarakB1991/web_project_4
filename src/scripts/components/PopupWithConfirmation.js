import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // this._popup
    this._form = this._popup.querySelector('.popup__form');
  }

  submitHandler(call, evt) {
    this._submitHandler = call;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
