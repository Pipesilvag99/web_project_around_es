// FormValidator.ts
// Encapsula toda la lógica que antes vivía en validate.js como funciones sueltas.
// Cada formulario que necesite validación crea su propia instancia de esta clase.

import { FormValidatorConfig } from './utils/constants.js';

export class FormValidator {
  private _config: FormValidatorConfig;
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _buttonElement: HTMLButtonElement;

  constructor(config: FormValidatorConfig, formElement: HTMLFormElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  // --- Muestra el mensaje de error debajo de un input ---
  private _showInputError(inputElement: HTMLInputElement): void {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ) as HTMLElement;
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // --- Oculta el mensaje de error de un input ---
  private _hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ) as HTMLElement;
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  // --- Comprueba la validez de un input y muestra/oculta su error ---
  private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // --- Indica si al menos un input del formulario es inválido ---
  private _hasInvalidInput(): boolean {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // --- Activa/desactiva el botón submit según la validez del formulario ---
  private _toggleButtonState(): void {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // --- Agrega los listeners de validación a cada input ---
  private _setEventListeners(): void {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt: Event) => {
        this._checkInputValidity(evt.target as HTMLInputElement);
        this._toggleButtonState();
      });
    });
  }

  // --- Método público: activa la validación del formulario ---
  enableValidation(): void {
    this._setEventListeners();
  }

  // --- Método público: limpia errores visuales y resetea el botón ---
  resetValidation(): void {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}