// Elements
export const editProfilePopup = document.querySelector('.popup_type_edit-profile');
export const addCardPopup = document.querySelector('.popup_type_add-card');
export const profileContainer = document.querySelector('.profile');
export const profileName = profileContainer.querySelector('.profile__name');
export const profileProfession = profileContainer.querySelector('.profile__about');

// Forms elements
export const cardAddForm = document.querySelector('#add-card-form');
export const editProfileForm = document.querySelector('#edit-profile-form');

export const nameInput = editProfileForm.querySelector('#input-name');
export const professionInput = editProfileForm.querySelector('#input-profession');

export const cardInputTitle = cardAddForm.querySelector('#input-card-title');
export const imageInputLink = cardAddForm.querySelector('#input-image-link');

// Image Popup Elements
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupTitleElement = imagePopup.querySelector('.popup__title_type_image');
export const imagePopupImageElement = imagePopup.querySelector('.popup__image');

//Buttons
export const profileEditButton = profileContainer.querySelector('.profile__edit-btn');
export const profileAddCardFormButton = profileContainer.querySelector('.profile__add-btn');

export const cardTemplateSelector = '#card-template';
export const cardsContainer = document.querySelector('.cards__list');

export const initialCards = [
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
