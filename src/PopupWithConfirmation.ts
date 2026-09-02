// PopupWithConfirmation.ts
// Popup de confirmación para eliminar una tarjeta. Subclase de Popup.

import { Popup } from './Popup.js';

export type HandleConfirm = (cardId: string) => void;

export class PopupWithConfirmation extends Popup {
  private _handleConfirm: HandleConfirm;
  private _cardId: string = '';
  private _confirmButton: HTMLButtonElement;

  constructor(popupSelector: string, handleConfirm: HandleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      '.popup__button'
    ) as HTMLButtonElement;
  }

  setCardId(cardId: string): void {
    this._cardId = cardId;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm(this._cardId);
    });
  }
}