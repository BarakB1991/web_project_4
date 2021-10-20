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
  const cardImage = cardElement.querySelector('.card__img');

  cardTitleElement.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

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

  // Card image popup
  cardImage.addEventListener('click', function (evt) {
    imagePopupTitleElement.textContent = card.name;
    imagePopupImageElement.src = card.link;
    imagePopupImageElement.alt = card.name;
    openPopup(imagePopup);
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
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupTitleElement = imagePopup.querySelector('.popup__title_type_image');
const imagePopupImageElement = imagePopup.querySelector('.popup__image');

// Buttons
const profileEditButton = profileContainer.querySelector('.profile__edit-btn');
const profileAddCardFormButton = profileContainer.querySelector('.profile__add-btn');

// Forms
const editProfileForm = document.querySelector('#edit-profile-form');
const nameInput = editProfileForm.querySelector('#input-name');
const professionInput = editProfileForm.querySelector('#input-profession');

const cardAddForm = document.querySelector('#add-card-form');
const cardInputTitle = cardAddForm.querySelector('#input-card-title');
const imageInputLink = cardAddForm.querySelector('#input-image-link');

// Submit "add new card" form
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardElement = createCard({name: cardInputTitle.value, link: imageInputLink.value});
  cardsContainer.prepend(cardElement);
  closePopup(addCardPopup);
}

// Submit "profile" form
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(editProfilePopup);
}

function openPopup(popupBox) {
  popupBox.classList.add('popup_visible');
  setClosePopupEventListeners();
}

function closePopup(popupBox) {
  popupBox.classList.remove('popup_visible');
  removeClosePopupEventListeners();
}

function setClosePopupEventListeners() {
  document.addEventListener('keydown', closePopupViaEscButton);
  document.addEventListener('mousedown', closePopupViaOutsideClick);
  // mousedown is most suited for when clicking inside input and dragging mouse to mark all text (before deletion)
}

function removeClosePopupEventListeners() {
  document.removeEventListener('keydown', closePopupViaEscButton);
  document.removeEventListener('mousedown', closePopupViaOutsideClick);
}

function closePopupViaOutsideClick(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains(`popup`)) {
    closePopup(evt.target);
  }
}

function closePopupViaEscButton(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_visible'));
  }
}

function matchProfileValues() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function resetNewCardForm(formElement) {
  cardAddForm.reset(); // refactored Reset values, with quick reset() method on form
}

const allCloseButtons = document.querySelectorAll('.popup__close-btn');

allCloseButtons.forEach(btn =>
  btn.addEventListener('click', evt => {
    const openedPopup = evt.target.closest('.popup_visible');
    closePopup(openedPopup);
  })
);

profileEditButton.addEventListener('click', () => {
  matchProfileValues();
  checkInitialFormValidity(editProfileForm, pageSettings);
  openPopup(editProfilePopup);
});

profileAddCardFormButton.addEventListener('click', () => {
  resetNewCardForm();
  checkInitialFormValidity(cardAddForm, pageSettings);
  openPopup(addCardPopup);
});

// Submit handlers
editProfileForm.addEventListener('submit', submitEditProfileForm);
cardAddForm.addEventListener('submit', submitAddCardForm);
