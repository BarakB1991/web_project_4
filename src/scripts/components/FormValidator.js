class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  resetValidation() {
    const inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputElements.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputElements, buttonElement);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputElements, buttonElement) {
    const hasInvalidInput = inputElements.some(inputElement => !inputElement.validity.valid);
    if (hasInvalidInput) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputElements = [...this._formElement.querySelectorAll(this._inputSelector)]; // made array of nodeList
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputElements.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElements, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
