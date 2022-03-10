import '../../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';

import {
  initialCards,
  editProfilePopup,
  addCardPopup,
  professionInput,
  nameInput,
  profileName,
  profileProfession,
  profileEditButton,
  profileAddCardFormButton,
  cardsContainer,
  cardTemplateSelector
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({name: profileName, profession: profileProfession});
userInfo.setUserInfo({name: 'Abraham Lincoln', profession: 'A founding Father'});

const imagePopupWindow = new PopupWithImage('.popup_type_image');
// Initialize 6 cards

function renderCard(item) {
  const card = new Card(item, cardTemplateSelector, imagePopupWindow.open);
  const cardElement = card.renderCard();
  cardSection.addItem(cardElement);
}

const cardSection = new Section('.cards__list', {
  items: initialCards,
  renderer: renderCard
});
cardSection.renderer();

const profilePopupWindow = new PopupWithForm('.popup_type_edit-profile', data => {
  userInfo.setUserInfo(data);
});

const addCardPopupWindow = new PopupWithForm('.popup_type_add-card', data => {
  const {cardtitle: name, imagelink: link} = data;
  renderCard({name, link});
});

imagePopupWindow.setEventListeners();
profilePopupWindow.setEventListeners();
addCardPopupWindow.setEventListeners();

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
  profilePopupWindow.open();
  const {name, profession} = userInfo.getUserInfo(); // get object of current name and profession
  nameInput.value = name;
  professionInput.value = profession;
});

profileAddCardFormButton.addEventListener('click', () => {
  addCardPopupWindow.open();
  cardFormValidator.resetValidation();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
