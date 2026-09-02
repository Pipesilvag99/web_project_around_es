// Card.ts
// Construye una tarjeta individual a partir de datos + un template.

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  isLiked: boolean;
  createdAt?: string;
}

export type HandleCardClick = (name: string, link: string) => void;
export type HandleLikeClick = (cardId: string, isLiked: boolean) => void;
export type HandleDeleteClick = (cardId: string) => void;

export class Card {
  private _id: string;
  private _name: string;
  private _link: string;
  private _owner: string;
  private _isLiked: boolean;
  private _userId: string;
  private _templateSelector: string;
  private _handleCardClick: HandleCardClick;
  private _handleLikeClick: HandleLikeClick;
  private _handleDeleteClick: HandleDeleteClick;
  private _element!: HTMLElement;

  constructor(
    data: CardData,
    userId: string,
    templateSelector: string,
    handleCardClick: HandleCardClick,
    handleLikeClick: HandleLikeClick,
    handleDeleteClick: HandleDeleteClick
  ) {
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

  getId(): string {
    return this._id;
  }

  // --- Clona el <template> del HTML para construir el marcado de la tarjeta ---
  private _getTemplate(): HTMLElement {
    const template = document.querySelector(
      this._templateSelector
    ) as HTMLTemplateElement;
    return template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;
  }

  private _toggleLikeIcon(): void {
    const likeButton = this._element.querySelector(
      '.card__like-button'
    ) as HTMLElement;
    likeButton.classList.toggle('card__like-button_is-active', this._isLiked);
  }

  // Se llama después de recibir la respuesta del servidor al dar/quitar like
  updateLikeStatus(isLiked: boolean): void {
    this._isLiked = isLiked;
    this._toggleLikeIcon();
  }

  // Elimina la tarjeta del DOM (se llama tras confirmar el DELETE en el servidor)
  remove(): void {
    this._element.remove();
  }

  // --- Agrega los listeners de like, delete y clic en la imagen ---
  private _setEventListeners(): void {
    const likeButton = this._element.querySelector(
      '.card__like-button'
    ) as HTMLElement;
    const deleteButton = this._element.querySelector(
      '.card__delete-button'
    ) as HTMLElement;
    const cardImage = this._element.querySelector(
      '.card__image'
    ) as HTMLImageElement;

    likeButton.addEventListener('click', () =>
      this._handleLikeClick(this._id, this._isLiked)
    );

    // Solo el dueño de la tarjeta ve el botón de eliminar
    if (this._owner === this._userId) {
      deleteButton.addEventListener('click', () =>
        this._handleDeleteClick(this._id)
      );
    } else {
      deleteButton.remove();
    }

    cardImage.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  // --- Método público: arma y devuelve el elemento completo, ya funcional ---
  getView(): HTMLElement {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(
      '.card__image'
    ) as HTMLImageElement;
    const cardTitle = this._element.querySelector('.card__title') as HTMLElement;

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._toggleLikeIcon();
    this._setEventListeners();

    return this._element;
  }
}