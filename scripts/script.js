import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {
  openPopup,
  closePopup,
  editProfilePopup,
  addCardPopup,
  matchProfileValues,
  resetNewCardForm,
  editProfileForm,
  cardAddForm,
  cardInputTitle,
  imageInputLink,
  profileName,
  profileProfession,
  nameInput,
  professionInput,
  profileEditButton,
  profileAddCardFormButton
} from './utils.js';

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }
];

// Initialize 6 cards in cards container on page & Grab card template content
const cardTemplateSelector = '#card-template';
const cardsContainer = document.querySelector('.cards__list');

initialCards.forEach(cardData => {
  const card = new Card(cardData, cardTemplateSelector);
  cardsContainer.prepend(card.renderCard());
});

// Submit "add new card" form
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardElement = {name: cardInputTitle.value, link: imageInputLink.value};
  const newCard = new Card(cardElement, cardTemplateSelector);
  cardsContainer.prepend(newCard.renderCard());
  closePopup(addCardPopup);
}

// Submit "profile" form
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(editProfilePopup);
}

const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardFormValidator = new FormValidator(formSettings, addCardPopup);
const profileFormValidator = new FormValidator(formSettings, editProfilePopup);

profileEditButton.addEventListener('click', () => {
  matchProfileValues();
  profileFormValidator.resetValidityWhenPopupOpen();
  openPopup(editProfilePopup);
});

profileAddCardFormButton.addEventListener('click', () => {
  resetNewCardForm();
  openPopup(addCardPopup);
  cardFormValidator.resetValidityWhenPopupOpen();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

editProfileForm.addEventListener('submit', submitEditProfileForm);
cardAddForm.addEventListener('submit', submitAddCardForm);
