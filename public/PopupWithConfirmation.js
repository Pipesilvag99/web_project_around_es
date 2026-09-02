// PopupWithConfirmation.ts
// Popup de confirmación para eliminar una tarjeta. Subclase de Popup.
import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._cardId = '';
        this._handleConfirm = handleConfirm;
        this._confirmButton = this._popupElement.querySelector('.popup__button');
    }
    setCardId(cardId) {
        this._cardId = cardId;
    }
    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handleConfirm(this._cardId);
        });
    }
}
