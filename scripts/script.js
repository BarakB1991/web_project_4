import FormValidator from './FormValidator.js';
import Card from './card.js';
import {
  openPopup,
  closePopup,
  editProfilePopup,
  addCardPopup,
  profileContainer,
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

// Elements
// const editProfilePopup = document.querySelector('.popup_type_edit-profile');
// const addCardPopup = document.querySelector('.popup_type_add-card');
// const allThePopups = document.querySelectorAll('.popup');

// const imagePopupTitleElement = imagePopup.querySelector('.popup__title_type_image');
// const imagePopupImageElement = imagePopup.querySelector('.popup__image');

// Buttons
// Buttons

// Forms elements
// const editProfileForm = document.querySelector('#edit-profile-form');
// const nameInput = editProfileForm.querySelector('#input-name');
// const professionInput = editProfileForm.querySelector('#input-profession');

// const cardAddForm = document.querySelector('#add-card-form');
// const cardInputTitle = cardAddForm.querySelector('#input-card-title');
// const imageInputLink = cardAddForm.querySelector('#input-image-link');

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

// function openPopup(popupBox) {
//   popupBox.classList.add('popup_visible');
//   setClosePopupEventListeners();
// }

// function closePopup(popupBox) {
//   popupBox.classList.remove('popup_visible');

//   removeClosePopupEventListeners();
// }

// function setClosePopupEventListeners() {
//   document.addEventListener('keydown', closePopupViaEscButton);
//   document.addEventListener('mousedown', closePopupViaOutsideClick);
//   // mousedown is most suited for when clicking inside input and dragging mouse to mark all text (before deletion)
// }

// function removeClosePopupEventListeners() {
//   document.removeEventListener('keydown', closePopupViaEscButton);
//   document.removeEventListener('mousedown', closePopupViaOutsideClick);
// }

// function closePopupViaOutsideClick(evt) {
//   if (evt.target.classList.contains(`popup`)) {
//     closePopup(evt.target);
//   }
// }

// function closePopupViaEscButton(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_visible'));
//   }
// }

// function matchProfileValues() {
//   nameInput.value = profileName.textContent;
//   professionInput.value = profileProfession.textContent;
// }

// function resetNewCardForm(formElement, inputElement, settings) {
//   cardAddForm.reset(); // refactored Reset values, with quick reset() method on form
// }

const allCloseButtons = document.querySelectorAll('.popup__close-btn');

const formSelector = '.popup__form';
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
