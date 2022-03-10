export default class Card {
  constructor(cardData, cardTemplateSelector, onImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.card');

    this._onImageClick = onImageClick;
  }

  _addEventListeners() {
    this._setLikeBtnEvtLstnr();
    this._setCardDeleteButton();
    this._element.querySelector('.card__img').addEventListener('click', () => this._handlePreviewPicture());
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

  _handlePreviewPicture() {
    this._onImageClick({link: this._link, name: this._name});
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
