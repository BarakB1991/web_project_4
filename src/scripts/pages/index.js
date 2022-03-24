import '../../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import Popup from '../components/Popup.js';
import {
  editProfilePopup,
  addCardPopup,
  professionInput,
  nameInput,
  profileName,
  profileProfession,
  profileEditButton,
  profileAddCardFormButton,
  cardTemplateSelector,
  profileAvatar
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  token: 'c785e696-84a9-4aca-b3d2-750b2694b444'
});

const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileProfession,
  avatar: profileAvatar
});

const imagePopupWindow = new PopupWithImage('.popup_type_image');
// Initialize  cards

function renderCard(item) {
  const card = new Card(item, cardTemplateSelector, imagePopupWindow.open);
  const cardElement = card.renderCard();
  cardSection.addItem(cardElement);
}

const cardSection = new Section('.cards__list', {
  renderer: renderCard
});

const profilePopupWindow = new PopupWithForm('.popup_type_edit-profile', async ({name: userName, profession: userAbout}) => {
  const promiseInfo = await api.editProfile(userName, userAbout);
  if (Promise.resolve(promiseInfo)) {
    userInfo.setUserInfo({userName, userAbout});
  }
});

// const confirmationPopup = new Popup('.popup_type_confirm');

const addCardPopupWindow = new PopupWithForm('.popup_type_add-card', async data => {
  const {cardtitle: name, imagelink: link} = data;
  const card = await api.addNewCard(name, link);
  if (card) {
    renderCard({name, link, likes: []});
  }
});

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
  const {userName, userAbout} = userInfo.getUserInfo(); // get object of current name and profession
  nameInput.value = userName;
  professionInput.value = userAbout;
});

profileAddCardFormButton.addEventListener('click', () => {
  addCardPopupWindow.open();
  cardFormValidator.resetValidation();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

api
  .promiseCardsAndUserData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      userName: userData.name,
      userAbout: userData.about
    });
    userInfo.setUserAvatar(userData.avatar);
    cardSection.renderer(cards);
  })
  .catch(err => console.log(err.status));
