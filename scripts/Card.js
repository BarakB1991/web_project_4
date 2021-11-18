import {openPopup, imagePopup, imagePopupTitleElement, imagePopupImageElement} from './utils.js';

export default class Card {
  constructor(cardData, cardTemplateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.card');
  }

  _addEventListeners() {
    this._setLikeBtnEvtLstnr();
    this._setCardDeleteButton();
    this._setCardImagePopup();
  }

  _setLikeBtnEvtLstnr() {
    const likeButton = this._element.querySelector('.card__like-btn');
    likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-btn_active');
      evt.stopPropagation();
    });
  }

  _setCardDeleteButton() {
    const deleteCardButton = this._element.querySelector('.card__delete-btn');
    deleteCardButton.addEventListener('click', function (evt) {
      evt.stopPropagation();
      deleteCardButton.closest('.card').remove();
    });
  }

  _setCardImagePopup() {
    this._element.addEventListener('click', evt => {
      if (evt.target.classList.contains(`card__img`)) {
        imagePopupTitleElement.textContent = this._name;
        imagePopupImageElement.src = this._link;
        imagePopupImageElement.alt = this._name;
        openPopup(imagePopup);
      }
    });
  }

  renderCard() {
    this._element = this._template.cloneNode(true);
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__title').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._addEventListeners();

    return this._element;
  }
}
