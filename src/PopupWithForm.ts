// PopupWithForm.ts
// Popup específico para formularios (editar perfil, agregar tarjeta).

import { Popup } from './Popup.js';

export type FormValues = Record<string, string>;
export type HandleFormSubmit = (formValues: FormValues) => void;

export class PopupWithForm extends Popup {
  private _handleFormSubmit: HandleFormSubmit;
  private _formElement: HTMLFormElement;

  constructor(popupSelector: string, handleFormSubmit: HandleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(
      '.popup__form'
    ) as HTMLFormElement;
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

  // --- Sobrescribe setEventListeners(): añade además el envío del formulario ---
  setEventListeners(): void {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt: SubmitEvent) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // --- Sobrescribe close(): además de cerrar, resetea el formulario ---
  close(): void {
    super.close();
    this._formElement.reset();
  }
}