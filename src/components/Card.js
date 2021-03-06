export default class Card {
  constructor({cardData, cardTemplateSelector, onImageClick, userId, handleDeleteCardClick, handleLikeCardClick}) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardUserId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likeCounter = cardData.likes;
    this._userId = userId;

    this._onImageClick = onImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeCardClick = handleLikeCardClick;

    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.card');
  }

  isLikedByUser() {
    return this._likeCounter.some(like => like._id === this._userId);
  }

  updateLikeCounter(cardData) {
    this._likeCounter = cardData.likes;
    this._renderLikeContainer();
  }

  _renderLikeContainer = () => {
    const likeCounter = this._element.querySelector('.card__like-counter');
    likeCounter.textContent = this._likeCounter.length;

    !this.isLikedByUser() ? this._removeLikeButton() : this._addLikeButton();
  };

  removeCardElement = () => {
    this._element.remove();
    this._element = null;
  };

  _addEventListeners = () => {
    this._likeButton.addEventListener('click', () => this._handleLikeCardClick(this._cardId));

    const deleteCardButton = this._element.querySelector('.card__delete-btn');
    if (this._cardUserId === this._userId) {
      deleteCardButton.addEventListener('click', () => this._handleDeleteCardClick(this._cardId));
    } else {
      deleteCardButton.remove();
    }

    const previewPicture = this._element.querySelector('.card__img');
    previewPicture.addEventListener('click', () => this._handlePreviewPicture());
  };

  _removeLikeButton = () => {
    this._likeButton.classList.remove('card__like-btn_active');
  };

  _addLikeButton = () => {
    this._likeButton.classList.add('card__like-btn_active');
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
    cardLikeCounter.textContent = this._likeCounter.length;
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._addEventListeners();

    this._renderLikeContainer();

    return this._element;
  };
}
