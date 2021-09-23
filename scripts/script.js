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
