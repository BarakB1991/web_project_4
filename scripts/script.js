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

// Grab card template content
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card) {
  // { name, link}
  //  Cloning .card node
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardLinkElement = cardElement.querySelector('.card__img');

  cardTitleElement.textContent = card.name;
  cardLinkElement.src = card.link;
  cardLinkElement.alt = card.name;

  // Click like
  const likeButton = cardElement.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });

  // Delete Button
  const deleteCardButton = cardElement.querySelector('.card__delete-btn');
  deleteCardButton.addEventListener('click', function (evt) {
    deleteCardButton.closest('.card').remove();
  });

  const imagePopup = document.querySelector('.popup_type_image');
  const imagePopupButton = cardLinkElement;
  const imagePopupTitleElement = imagePopup.querySelector('.popup__title_type_image');
  const imagePopupImageElement = imagePopup.querySelector('.popup__image');

  imagePopupButton.addEventListener('click', function (evt) {
    imagePopup.classList.add('popup_visible');
    imagePopupTitleElement.textContent = card.name;
    imagePopupImageElement.src = card.link;
    imagePopupImageElement.alt = card.name;
  });
  return cardElement;
}

// Initialize 6 cards in cards container on page
const cardsContainer = document.querySelector('.cards__list');

initialCards.forEach(card => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

// Elements
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const allThePopups = document.querySelectorAll('.popup');
const profileContainer = document.querySelector('.profile');
const profileName = profileContainer.querySelector('.profile__name');
const profileProfession = profileContainer.querySelector('.profile__about');

// Buttons
const profileEditButton = profileContainer.querySelector('.profile__edit-btn');
const profileAddButton = profileContainer.querySelector('.profile__add-btn');

// Forms
const editProfileForm = document.querySelector('#edit-profile-form');
const nameInput = editProfileForm.querySelector('#input-name');
const professionInput = editProfileForm.querySelector('#input-profession');

const cardAddForm = document.querySelector('#add-card-form');
const cardInputTitle = cardAddForm.querySelector('#card-title');
const imageInputLink = cardAddForm.querySelector('#image-link');

// Add new card
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardElement = createCard({name: cardInputTitle.value, link: imageInputLink.value});
  cardsContainer.prepend(cardElement);
  allThePopups.forEach(popup => popup.classList.remove('popup_visible'));
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  allThePopups.forEach(popup => popup.classList.remove('popup_visible'));
}

function openPopup(popupBox) {
  popupBox.classList.add('popup_visible');
}

function matchProfileValues() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function resetNewCardForm() {
  cardInputTitle.value = '';
  imageInputLink.value = '';
}

// event handler for all popup close buttons
const allCloseButtons = document.querySelectorAll('.popup__close-btn');
allCloseButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    const allThePopups = document.querySelectorAll('.popup');
    allThePopups.forEach(popup => popup.classList.remove('popup_visible'));
  })
);

profileEditButton.addEventListener('click', () => {
  matchProfileValues();
  openPopup(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  resetNewCardForm();
  openPopup(addCardPopup);
});

// Submit handlers
editProfileForm.addEventListener('submit', submitEditProfileForm);
cardAddForm.addEventListener('submit', submitAddCardForm);
