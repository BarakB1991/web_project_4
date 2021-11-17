// Elements
export const editProfilePopup = document.querySelector('.popup_type_edit-profile');
export const addCardPopup = document.querySelector('.popup_type_add-card');
export const profileContainer = document.querySelector('.profile');
export const profileName = profileContainer.querySelector('.profile__name');
export const profileProfession = profileContainer.querySelector('.profile__about');

// Forms elements
export const cardAddForm = document.querySelector('#add-card-form');
export const editProfileForm = document.querySelector('#edit-profile-form');

export const nameInput = editProfileForm.querySelector('#input-name');
export const professionInput = editProfileForm.querySelector('#input-profession');

export const cardInputTitle = cardAddForm.querySelector('#input-card-title');
export const imageInputLink = cardAddForm.querySelector('#input-image-link');

// Image Popup Elements
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupTitleElement = imagePopup.querySelector('.popup__title_type_image');
export const imagePopupImageElement = imagePopup.querySelector('.popup__image');

//Buttons
export const profileEditButton = profileContainer.querySelector('.profile__edit-btn');
export const profileAddCardFormButton = profileContainer.querySelector('.profile__add-btn');

export function openPopup(popupBox) {
  popupBox.classList.add('popup_visible');
  setClosePopupEventListeners();
}

export function closePopup(popupBox) {
  popupBox.classList.remove('popup_visible');

  removeClosePopupEventListeners();
}

function closePopupViaOutsideClick(evt) {
  if (evt.target.classList.contains(`popup`)) {
    closePopup(evt.target);
  }
}

function closePopupViaEscButton(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_visible'));
  }
}

export function matchProfileValues() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

export function resetNewCardForm(formElement, inputElement, settings) {
  cardAddForm.reset(); // refactored Reset values, with quick reset() method on form
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

const allCloseButtons = document.querySelectorAll('.popup__close-btn');
allCloseButtons.forEach(btn =>
  btn.addEventListener('click', evt => {
    const openedPopup = evt.target.closest('.popup_visible');
    closePopup(openedPopup);
  })
);

// Submit handlers
