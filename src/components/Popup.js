export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMouseDown);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleMouseDown);
  }

  _handleMouseDown = evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  };

  _handleEscClose = evt => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      this.close();
    }
  };
}
