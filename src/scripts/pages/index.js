import '../../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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
  profileAvatar,
  profileContainer,
  formSettings
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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

// Initialize  cards
function renderCard(item) {
  const newCard = new Card({
    cardData: item,
    cardTemplateSelector,
    onImageClick: imagePopupWindow.open,
    userId: profileContainer.id,
    handleDeleteCardClick: id => {
      confirmationPopup.open();
      confirmationPopup.submitHandler(() => {
        api
          .removeUserCard(id)
          .then(confirmationPopup.renderLoadingOnButton())
          .then(() => {
            newCard.removeCardElement();
          })
          .catch(err => console.log(err))
          .finally(() => {
            confirmationPopup.close();
            confirmationPopup.removeLoadingOnButton();
          });
      });
    },
    handleLikeCardClick: (cardId, userId, evt) => {
      api
        .getInitialCards()
        .then(cards => {
          cards.forEach(card => {
            if (card._id === cardId) {
              card.likes.forEach(like => {
                if (like._id === userId) {
                  api.removeLike(cardId);
                  newCard.removeLikeButton(evt);
                } else {
                  api.addLike(cardId);
                  newCard.addLikeButton(evt);
                }
              });
            }
          });
        })
        // .then(cardID => {
        //   console.log(cardID);
        //   if (cardID) {
        //     api.removeLike(cardId);
        //   } else {
        //     api.addLike(cardId);
        //   }
        // })
        .catch(err => console.log(err));
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
  const promiseInfo = await api.editProfile(userName, userAbout);
  if (Promise.resolve(promiseInfo)) {
    userInfo.setUserInfo({userName, userAbout});
  }
});

const addCardPopupWindow = new PopupWithForm('.popup_type_add-card', async data => {
  const {cardtitle: name, imagelink: link} = data;
  const card = await api.addNewCard(name, link);
  if (card) {
    renderCard(card);
  }
});

profilePopupWindow.setEventListeners();
addCardPopupWindow.setEventListeners();

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
    userInfo.setUserId(userData._id);
    cardSection.renderer(cards);
  })
  .catch(err => console.log(err));
