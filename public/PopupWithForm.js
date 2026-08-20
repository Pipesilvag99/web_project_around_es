// PopupWithForm.ts
// Popup específico para formularios (editar perfil, agregar tarjeta).
import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.popup__form');
    }
    // --- Recolecta los valores de todos los inputs del formulario ---
    _getInputValues() {
        const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        const formValues = {};
        inputList.forEach((inputElement) => {
            formValues[inputElement.name] = inputElement.value;
        });
        return formValues;
    }
    // --- Sobrescribe setEventListeners(): añade además el envío del formulario ---
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    // --- Sobrescribe close(): además de cerrar, resetea el formulario ---
    close() {
        super.close();
        this._formElement.reset();
    }
}
