// Popup.ts
// Clase base para todas las ventanas emergentes.
// El HTML del popup ya existe en index.html; esta clase solo lo abre/cierra.
export class Popup {
    constructor(popupSelector) {
        // --- Cierra el popup abierto si se presiona la tecla Esc ---
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        };
        this._popupElement = document.querySelector(popupSelector);
    }
    // --- Abre el popup y activa el cierre con Esc ---
    open() {
        this._popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    // --- Cierra el popup y elimina el listener de Esc ---
    close() {
        this._popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    // --- Agrega los listeners para cerrar: icono de cerrar y clic en la superposición ---
    setEventListeners() {
        const closeButton = this._popupElement.querySelector('.popup__close');
        closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target === this._popupElement) {
                this.close();
            }
        });
    }
}
