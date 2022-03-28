// Elements
export const editProfilePopup = document.querySelector('.popup_type_edit-profile');
export const addCardPopup = document.querySelector('.popup_type_add-card');
export const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');

export const profileContainer = document.querySelector('.profile');
export const profileName = profileContainer.querySelector('.profile__name');
export const profileProfession = profileContainer.querySelector('.profile__about');
export const profileAvatar = profileContainer.querySelector('.profile__img');

// Image Popup Elements
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupTitleElement = imagePopup.querySelector('.popup__title_type_image');
export const imagePopupImageElement = imagePopup.querySelector('.popup__image');

//Buttons
export const profileEditButton = profileContainer.querySelector('.profile__edit-btn');
export const profileAddCardFormButton = profileContainer.querySelector('.profile__add-btn');
export const profileAvatarButton = document.querySelector('.profile__img-button');

export const cardTemplateSelector = '#card-template';
export const cardsContainer = document.querySelector('.cards__list');

export const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Forms elements
export const cardAddForm = document.querySelector('#add-card-form');
export const editProfileForm = document.querySelector('#edit-profile-form');

export const nameInput = editProfileForm.querySelector('#input-name');
export const professionInput = editProfileForm.querySelector('#input-profession');
