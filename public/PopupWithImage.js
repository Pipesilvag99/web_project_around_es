// PopupWithImage.ts
// Popup específico para mostrar la imagen ampliada de una tarjeta.
import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector('.popup__image');
        this._captionElement = this._popupElement.querySelector('.popup__caption');
    }
    // --- Sobrescribe open(): primero llena la imagen y la leyenda, luego abre ---
    // Los parámetros tienen valores por defecto para que la sobrescritura sea
    // compatible con la clase base (open() sin parámetros)
    open(name = '', link = '') {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }
}
