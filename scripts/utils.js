const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

function openPopup(popupBox) {
  popupBox.classList.add('popup_visible');
  setClosePopupEventListeners();
}

function closePopup(popupBox) {
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

function matchProfileValues() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function resetNewCardForm(formElement, inputElement, settings) {
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
