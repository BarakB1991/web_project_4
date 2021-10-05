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

function createCard(card) {
  // { name, link}
  // grabbing template and cloning .card node
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardLinkElement = cardElement.querySelector('.card__img');

  cardTitleElement.textContent = card.name;
  cardLinkElement.src = card.link;
  cardLinkElement.alt = card.name;

  // click like
  const clickLike = cardElement.querySelector('.card__like-btn');
  clickLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });

  // delete Button
  const cardDeleteButton = cardElement.querySelector('.card__delete-btn');
  cardDeleteButton.addEventListener('click', function (evt) {
    cardDeleteButton.closest('.card').remove();
  });

  return cardElement;
}
// initial cards on page
const cardsContainer = document.querySelector('.cards__list');

initialCards.forEach(card => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

// Buttons
const profileContainer = document.querySelector('.profile');
const profileName = profileContainer.querySelector('.profile__name');
const profileProfession = profileContainer.querySelector('.profile__about');
const profileEditButton = profileContainer.querySelector('.profile__edit-btn');
const profileAddButton = profileContainer.querySelector('.profile__add-btn');
const closePopupButton = document.querySelector('.popup__close-btn');

// Elements
const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const addCardPopup = document.querySelector('.popup__type_add-card');

// Forms
const editProfileForm = document.querySelector('#edit-profile-form');
const nameInput = editProfileForm.querySelector('#input-name');
const professionInput = editProfileForm.querySelector('#input-profession');

const cardAddForm = document.querySelector('#add-card-form');
const cardInputTitle = cardAddForm.querySelector('#card-title');
const imageInputLink = cardAddForm.querySelector('#image-link');

function togglePopup(popupBox) {
  if (!popupBox.classList.contains('popup_visible')) {
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
  }

  popupBox.classList.toggle('popup_visible');
}

function formHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  const allThePopups = document.querySelectorAll('.popup');
  allThePopups.forEach(popup => popup.classList.remove('popup_visible'));
}

profileEditButton.addEventListener('click', () => togglePopup(editProfilePopup));
profileAddButton.addEventListener('click', () => togglePopup(addCardPopup));

// close all buttons
const allCloseButtons = document.querySelectorAll('.popup__close-btn');
allCloseButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    const allThePopups = document.querySelectorAll('.popup');
    allThePopups.forEach(popup => popup.classList.remove('popup_visible'));
  })
);

editProfileForm.addEventListener('submit', formHandler);
cardAddForm.addEventListener('submit', () => createCard());
