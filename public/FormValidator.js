// FormValidator.ts
// Encapsula toda la lógica que antes vivía en validate.js como funciones sueltas.
// Cada formulario que necesite validación crea su propia instancia de esta clase.
export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }
    // --- Muestra el mensaje de error debajo de un input ---
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }
    // --- Oculta el mensaje de error de un input ---
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }
    // --- Comprueba la validez de un input y muestra/oculta su error ---
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }
        else {
            this._hideInputError(inputElement);
        }
    }
    // --- Indica si al menos un input del formulario es inválido ---
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
    // --- Activa/desactiva el botón submit según la validez del formulario ---
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
    // --- Agrega los listeners de validación a cada input ---
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
                this._checkInputValidity(evt.target);
                this._toggleButtonState();
            });
        });
    }
    // --- Método público: activa la validación del formulario ---
    enableValidation() {
        this._setEventListeners();
    }
    // --- Método público: limpia errores visuales y resetea el botón ---
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}
