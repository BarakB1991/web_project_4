import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  editProfilePopup,
  addCardPopup,
  editAvatarPopup,
  professionInput,
  nameInput,
  profileName,
  profileProfession,
  profileEditButton,
  profileAddCardFormButton,
  cardTemplateSelector,
  profileAvatar,
  profileContainer,
  profileAvatarButton,
  formSettings
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../utils/Api.js';

const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileProfession,
  avatar: profileAvatar,
  userId: profileContainer
});

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  token: 'c785e696-84a9-4aca-b3d2-750b2694b444'
});

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirm');
confirmationPopup.setEventListeners();

const imagePopupWindow = new PopupWithImage('.popup_type_image');

function fillProfileForm() {
  const {userName, userAbout} = userInfo.getUserInfo(); // get object of current name and profession
  nameInput.value = userName;
  professionInput.value = userAbout;
}
// Initialize  cards
function renderCard(item) {
  const newCard = new Card({
    cardData: item,
    cardTemplateSelector,
    onImageClick: imagePopupWindow.open,
    userId: profileContainer.id,
    handleDeleteCardClick: id => {
      confirmationPopup.open();
      confirmationPopup.setSubmitHandler(() => {
        confirmationPopup.renderLoadingOnButton();
        api
          .removeUserCard(id)
          .then(() => {
            newCard.removeCardElement();
            confirmationPopup.close();
          })
          .catch(err => console.log(err))
          .finally(() => {
            confirmationPopup.removeLoadingOnButton();
          });
      });
    },
    handleLikeCardClick: id => {
      const isLikedByUser = newCard.isLikedByUser();
      if (isLikedByUser == true) {
        api
          .removeLike(id)
          .then(card => newCard.updateLikeCounter(card))
          .catch(err => console.log(err));
      } else {
        api
          .addLike(id)
          .then(card => newCard.updateLikeCounter(card))
          .catch(err => console.log(err));
      }
    }
  });
  const cardElement = newCard.renderCard();
  cardSection.addItem(cardElement);
}

//Initializa Cards
const cardSection = new Section('.cards__list', {
  renderer: renderCard
});

const profilePopupWindow = new PopupWithForm('.popup_type_edit-profile', async ({name: userName, profession: userAbout}) => {
  profilePopupWindow.renderLoadingOnButton();
  try {
    const getuserInfo = await api.editProfile(userName, userAbout);
    if (getuserInfo) {
      userInfo.setUserInfo({userName, userAbout});
      profilePopupWindow.close();
      profilePopupWindow.removeLoadingOnButton();
    }
  } catch (error) {
    console.log(`Could not perform request: ${error}`);
    profilePopupWindow.removeLoadingOnButton();
  }
});

const addCardPopupWindow = new PopupWithForm('.popup_type_add-card', async data => {
  const {cardtitle: name, imagelink: link} = data;
  addCardPopupWindow.renderLoadingOnButton();
  try {
    const card = await api.addNewCard(name, link);
    if (card) {
      renderCard(card);
      addCardPopupWindow.close();
      addCardPopupWindow.removeLoadingOnButton();
    }
  } catch (error) {
    console.log(`Could not perform request: ${error}`);
    addCardPopupWindow.removeLoadingOnButton();
  }
});

const editAvatarPopupWindow = new PopupWithForm('.popup_type_edit-avatar', async avatar => {
  const {avatar: avatarUrl} = avatar;
  editAvatarPopupWindow.renderLoadingOnButton();
  try {
    const sendAvatar = await api.editAvatar(avatarUrl);
    if (sendAvatar) {
      userInfo.setUserAvatar(avatarUrl);
      editAvatarPopupWindow.close();
      editAvatarPopupWindow.removeLoadingOnButton();
    }
  } catch (error) {
    console.log(`Could not perform request: ${error}`);
    editAvatarPopupWindow.removeLoadingOnButton();
  }
});

profilePopupWindow.setEventListeners();
addCardPopupWindow.setEventListeners();
editAvatarPopupWindow.setEventListeners();

const cardFormValidator = new FormValidator(formSettings, addCardPopup);
const profileFormValidator = new FormValidator(formSettings, editProfilePopup);
const avatarFormValidator = new FormValidator(formSettings, editAvatarPopup);

profileAvatarButton.addEventListener('click', () => {
  editAvatarPopupWindow.open();
  avatarFormValidator.resetValidation();
});

profileEditButton.addEventListener('click', () => {
  profilePopupWindow.open();
  fillProfileForm();
  profileFormValidator.resetValidation();
});

profileAddCardFormButton.addEventListener('click', () => {
  addCardPopupWindow.open();
  cardFormValidator.resetValidation();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

api
  .getCardsAndUserData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      userName: userData.name,
      userAbout: userData.about
    });
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserId(userData._id);
    cardSection.renderer(cards);
  })
  .catch(err => console.log(err));
