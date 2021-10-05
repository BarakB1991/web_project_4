// initialize cards on page

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
  // grabbing template and copying .card node
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardLinkElement = cardElement.querySelector('.card__img');
  cardTitleElement.textContent = card.name;
  cardLinkElement.src = card.link;
  return cardElement;
}

const cardsContainer = document.querySelector('.cards__list');

initialCards.forEach(card => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

// popup
let profileContainer = document.querySelector('.profile');
let profileName = profileContainer.querySelector('.profile__name');
let profileProfession = profileContainer.querySelector('.profile__about');
let profileEditButton = profileContainer.querySelector('.profile__edit-btn');

let popupBox = document.querySelector('.popup');
let closePopupButton = popupBox.querySelector('.popup__close-btn');
let formElement = popupBox.querySelector('.popup__form');

let nameInput = formElement.querySelector('#input-name');
let professionInput = formElement.querySelector('#input-profession');

function openPopup() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  popupBox.classList.toggle('popup_visible');
}

function closePopup() {
  popupBox.classList.toggle('popup_visible');
}

function formHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formHandler);
