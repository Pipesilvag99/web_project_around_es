// Card.ts
// Construye una tarjeta individual a partir de datos + un template.

export interface CardData {
  name: string;
  link: string;
}

export type HandleCardClick = (name: string, link: string) => void;

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: HandleCardClick;
  private _element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: HandleCardClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // --- Clona el <template> del HTML para construir el marcado de la tarjeta ---
  private _getTemplate(): HTMLElement {
    const template = document.querySelector(
      this._templateSelector
    ) as HTMLTemplateElement;
    return template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;
  }

  // --- Alterna el estado "Me gusta" ---
  private _handleLikeClick(evt: Event): void {
    (evt.target as HTMLElement).classList.toggle('card__like-button_is-active');
  }

  // --- Elimina la tarjeta del DOM ---
  private _handleDeleteClick(): void {
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

    likeButton.addEventListener('click', (evt) => this._handleLikeClick(evt));
    deleteButton.addEventListener('click', () => this._handleDeleteClick());
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

    this._setEventListeners();

    return this._element;
  }
}