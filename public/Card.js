// Card.ts
// Construye una tarjeta individual a partir de datos + un template.
export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    // --- Clona el <template> del HTML para construir el marcado de la tarjeta ---
    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        return template.content.querySelector('.card').cloneNode(true);
    }
    // --- Alterna el estado "Me gusta" ---
    _handleLikeClick(evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
    // --- Elimina la tarjeta del DOM ---
    _handleDeleteClick() {
        this._element.remove();
    }
    // --- Agrega los listeners de like, delete y clic en la imagen ---
    _setEventListeners() {
        const likeButton = this._element.querySelector('.card__like-button');
        const deleteButton = this._element.querySelector('.card__delete-button');
        const cardImage = this._element.querySelector('.card__image');
        likeButton.addEventListener('click', (evt) => this._handleLikeClick(evt));
        deleteButton.addEventListener('click', () => this._handleDeleteClick());
        cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
    // --- Método público: arma y devuelve el elemento completo, ya funcional ---
    getView() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}
