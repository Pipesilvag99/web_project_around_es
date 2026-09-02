// PopupWithForm.ts
// Popup específico para formularios (editar perfil, agregar tarjeta, avatar).
import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        var _a;
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._formElement.querySelector('.popup__button');
        this._defaultButtonText = (_a = this._submitButton.textContent) !== null && _a !== void 0 ? _a : 'Guardar';
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
    // Cambia el texto del botón a "Guardando..." mientras la petición está en curso
    setLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Guardando...' : this._defaultButtonText;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
