// PopupWithForm.ts
// Popup específico para formularios (editar perfil, agregar tarjeta, avatar).

import { Popup } from './Popup.js';

export type FormValues = Record<string, string>;
export type HandleFormSubmit = (formValues: FormValues) => void;

export class PopupWithForm extends Popup {
  private _handleFormSubmit: HandleFormSubmit;
  private _formElement: HTMLFormElement;
  private _submitButton: HTMLButtonElement;
  private _defaultButtonText: string;

  constructor(popupSelector: string, handleFormSubmit: HandleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(
      '.popup__form'
    ) as HTMLFormElement;
    this._submitButton = this._formElement.querySelector(
      '.popup__button'
    ) as HTMLButtonElement;
    this._defaultButtonText = this._submitButton.textContent ?? 'Guardar';
  }

  // --- Recolecta los valores de todos los inputs del formulario ---
  private _getInputValues(): FormValues {
    const inputList = Array.from(
      this._formElement.querySelectorAll('.popup__input')
    ) as HTMLInputElement[];

    const formValues: FormValues = {};
    inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });

    return formValues;
  }

  // Cambia el texto del botón a "Guardando..." mientras la petición está en curso
  setLoading(isLoading: boolean): void {
    this._submitButton.textContent = isLoading ? 'Guardando...' : this._defaultButtonText;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt: SubmitEvent) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close(): void {
    super.close();
    this._formElement.reset();
  }
}