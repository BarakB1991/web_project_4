import {openPopup, closePopup} from 'utils.js';

export default class Card {
  constructor(cardData, cardTemplateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.card');
  }

  _addEventListeners() {
    const cardImage = this._element.querySelector('.card__img');
    const cardTitleElement = this._element.querySelector('.card__title');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitleElement.textContent = this._name;

    this._setLikeBtnEvtLstnr();
    this._setCardDeleteButton();
    this._setCardImagePopup(cardImage);
  }

  _setLikeBtnEvtLstnr() {
    const likeButton = this._element.querySelector('.card__like-btn');
    likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-btn_active');
    });
  }

  _setCardDeleteButton() {
    const deleteCardButton = this._element.querySelector('.card__delete-btn');
    deleteCardButton.addEventListener('click', function () {
      deleteCardButton.closest('.card').remove();
    });
  }

  _setCardImagePopup(cardImage) {
    cardImage.addEventListener('click', function (evt) {
      imagePopupTitleElement.textContent = this._name;
      imagePopupImageElement.src = this._link;
      imagePopupImageElement.alt = this._name;
      openPopup(imagePopup);
    });
  }

  renderCard() {
    this._element = this._template.cloneNode(true);

    this._addEventListeners();

    return this._element;

    _setLikeBtnEvtLstnr(cardElement);

    _setCardDeleteButton(cardElement);

    _setCardImagePopup(cardImage);
  }
}
