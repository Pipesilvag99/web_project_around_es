// Card.ts
// Construye una tarjeta individual a partir de datos + un template.
export class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._isLiked = data.isLiked;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }
    getId() {
        return this._id;
    }
    // --- Clona el <template> del HTML para construir el marcado de la tarjeta ---
    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        return template.content.querySelector('.card').cloneNode(true);
    }
    _toggleLikeIcon() {
        const likeButton = this._element.querySelector('.card__like-button');
        likeButton.classList.toggle('card__like-button_is-active', this._isLiked);
    }
    // Se llama después de recibir la respuesta del servidor al dar/quitar like
    updateLikeStatus(isLiked) {
        this._isLiked = isLiked;
        this._toggleLikeIcon();
    }
    // Elimina la tarjeta del DOM (se llama tras confirmar el DELETE en el servidor)
    remove() {
        this._element.remove();
    }
    // --- Agrega los listeners de like, delete y clic en la imagen ---
    _setEventListeners() {
        const likeButton = this._element.querySelector('.card__like-button');
        const deleteButton = this._element.querySelector('.card__delete-button');
        const cardImage = this._element.querySelector('.card__image');
        likeButton.addEventListener('click', () => this._handleLikeClick(this._id, this._isLiked));
        // Solo el dueño de la tarjeta ve el botón de eliminar
        if (this._owner === this._userId) {
            deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
        }
        else {
            deleteButton.remove();
        }
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
        this._toggleLikeIcon();
        this._setEventListeners();
        return this._element;
    }
}
