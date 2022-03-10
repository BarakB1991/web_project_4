export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }

  _handleEscClose = evt => {
    evt.preventDefault();

    if (evt.key === 'Escape') {
      this.close();
    }
  };
}
