import { FormValidator } from './FormValidator.js';
import { defaultFormConfig } from './utils/constants.js';
import { Card, CardData } from './Card.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const cardTemplateSelector = '#card-template';
const cardsListSelector = '.cards__list';

const initialCards: CardData[] = [
  {
    name: 'Valle de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
  },
  {
    name: 'Montañas Calvas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
  },
  {
    name: 'Parque Nacional de la Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
  },
];

// --- Instancia de UserInfo (una sola vez) ---
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description',
});

// --- Popup de imagen ampliada ---
const popupWithImage = new PopupWithImage('#image-popup');
popupWithImage.setEventListeners();

function handleCardClick(name: string, link: string): void {
  popupWithImage.open(name, link);
}

// --- Función que crea la vista de una tarjeta (usa la clase Card) ---
function createCard(data: CardData): HTMLElement {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.getView();
}

// --- Instancia de Section para el contenedor de tarjetas ---
const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  cardsListSelector
);
cardSection.renderItems();

// --- Formulario y validador: Editar perfil ---
const editFormElement = document.querySelector(
  '#edit-profile-form'
) as HTMLFormElement;
const nameInput = editFormElement.querySelector(
  '.popup__input_type_name'
) as HTMLInputElement;
const descriptionInput = editFormElement.querySelector(
  '.popup__input_type_description'
) as HTMLInputElement;

const editProfileValidator = new FormValidator(defaultFormConfig, editFormElement);
editProfileValidator.enableValidation();

const editProfilePopup = new PopupWithForm('#edit-popup', (formValues) => {
  userInfo.setUserInfo({
    name: formValues.name,
    description: formValues.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const editButton = document.querySelector('.profile__edit-button') as HTMLElement;
editButton.addEventListener('click', () => {
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  descriptionInput.value = currentInfo.description;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

// --- Formulario y validador: Agregar tarjeta ---
const newCardFormElement = document.querySelector(
  '#new-card-form'
) as HTMLFormElement;

const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();

const newCardPopup = new PopupWithForm('#new-card-popup', (formValues) => {
  const newCard = createCard({
    name: formValues['place-name'],
    link: formValues.link,
  });
  cardSection.addItem(newCard);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

const addButton = document.querySelector('.profile__add-button') as HTMLElement;
addButton.addEventListener('click', () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});