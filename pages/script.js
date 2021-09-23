let profileContainer = document.querySelector('.profile');
let profileName = profileContainer.querySelector('.profile__name');
let profileProfession = profileContainer.querySelector('.profile__about');
let profileEditButton = profileContainer.querySelector('.profile__edit-btn');

let popupBox = document.querySelector('.popup');
let closeForm = popupBox.querySelector('.popup__close-btn');

let formElement = popupBox.querySelector('.popup__form');
let nameInput = formElement.querySelector('#input-name');
let professionInput = formElement.querySelector('#input-profession');

let submitForm = formElement.querySelector('.popup__submit-btn');

function toggleForm() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  popupBox.classList.toggle('popup_visible');
}

profileEditButton.addEventListener('click', toggleForm);
closeForm.addEventListener('click', toggleForm);

function formHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupBox.classList.toggle('popup_visible');
}

submitForm.addEventListener('submit', formHandler);
