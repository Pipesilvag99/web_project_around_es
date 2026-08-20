// PopupWithImage.ts
// Popup específico para mostrar la imagen ampliada de una tarjeta.

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  private _imageElement: HTMLImageElement;
  private _captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      '.popup__image'
    ) as HTMLImageElement;
    this._captionElement = this._popupElement.querySelector(
      '.popup__caption'
    ) as HTMLElement;
  }

  // --- Sobrescribe open(): primero llena la imagen y la leyenda, luego abre ---
  // Los parámetros tienen valores por defecto para que la sobrescritura sea
  // compatible con la clase base (open() sin parámetros)
  open(name: string = '', link: string = ''): void {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}