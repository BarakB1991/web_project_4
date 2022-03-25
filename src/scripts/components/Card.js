import {profileContainer} from '../utils/constants';

export default class Card {
  constructor({cardData, cardTemplateSelector, onImageClick, userId, handleDeleteCardclick}) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData.owner._id;
    this._cardId = cardData._id;
    this._likeCounter = cardData.likes;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.card');
    this._onImageClick = onImageClick;
    this._userId = userId;
    this._handleDeleteCardclick = handleDeleteCardclick;
  }

  getId = () => {
    return this._cardId;
  };

  _addEventListeners = () => {
    const likeButton = this._element.querySelector('.card__like-btn');
    likeButton.addEventListener('click', this._handleLikeButton);
    const deleteCardButton = this._element.querySelector('.card__delete-btn');
    if (this._id === this._userId) {
      deleteCardButton.addEventListener('click', this._handleDeleteCardclick());
    } else {
      deleteCardButton.remove();
    }
    const previewPicture = this._element.querySelector('.card__img');
    previewPicture.addEventListener('click', () => this._handlePreviewPicture());
  };

  removeCardElement = evt => {
    evt.preventDefault();
    this._element.remove();
    this._element = null;
  };

  _handleLikeButton = evt => {
    evt.stopPropagation();
    evt.target.classList.toggle('card__like-btn_active');
  };

  _handlePreviewPicture = () => {
    this._onImageClick({link: this._link, name: this._name});
  };

  renderCard = () => {
    this._element = this._template.cloneNode(true);
    const cardImage = this._element.querySelector('.card__img');
    const cardLikeCounter = this._element.querySelector('.card__like-counter');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.id = this._id;
    cardLikeCounter.textContent = this._likeCounter.length;
    this._element.querySelector('.card__title').textContent = this._name;
    this._addEventListeners();

    return this._element;
  };
}
