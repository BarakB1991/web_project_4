import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = ({link, name}) => {
    const imagePopupTitleElement = this._popup.querySelector('.popup__title_type_image');
    const imagePopupImageElement = this._popup.querySelector('.popup__image');

    imagePopupTitleElement.textContent = name;
    imagePopupImageElement.src = link;
    imagePopupImageElement.alt = name;

    super.open();
  };
}
