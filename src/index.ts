import { FormValidator } from './FormValidator.js';
import { defaultFormConfig } from './utils/constants.js';
import { Card } from './Card.js';
import type { CardData } from './Card.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithConfirmation } from './PopupWithConfirmation.js';
import { UserInfo } from './UserInfo.js';
import { api } from './Api.js';

const cardTemplateSelector = '#card-template';
const cardsListSelector = '.cards__list';

// --- Instancia de UserInfo (una sola vez) ---
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__image',
});

// --- Popup de imagen ampliada ---
const popupWithImage = new PopupWithImage('#image-popup');
popupWithImage.setEventListeners();

function handleCardClick(name: string, link: string): void {
  popupWithImage.open(name, link);
}

// --- Guardamos las instancias de Card para poder actualizarlas/eliminarlas ---
const cardInstances = new Map<string, Card>();

// --- Popup de confirmación para eliminar tarjeta ---
async function handleConfirmDelete(cardId: string): Promise<void> {
  try {
    await api.deleteCard(cardId);
    cardInstances.get(cardId)?.remove();
    cardInstances.delete(cardId);
    confirmDeletePopup.close();
  } catch (err) {
    console.error(err);
  }
}

const confirmDeletePopup = new PopupWithConfirmation(
  '#confirm-delete-popup',
  handleConfirmDelete
);
confirmDeletePopup.setEventListeners();

function handleDeleteClick(cardId: string): void {
  confirmDeletePopup.setCardId(cardId);
  confirmDeletePopup.open();
}

async function handleLikeClick(cardId: string, isLiked: boolean): Promise<void> {
  try {
    const updatedCard = await api.changeLikeCardStatus(cardId, isLiked);
    cardInstances.get(cardId)?.updateLikeStatus(updatedCard.isLiked);
  } catch (err) {
    console.error(err);
  }
}

function createCard(data: CardData): HTMLElement {
  const card = new Card(
    data,
    userInfo.getUserId(),
    cardTemplateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  );
  cardInstances.set(data._id, card);
  return card.getView();
}

// --- Section para el contenedor de tarjetas ---
// Se crea en initializeApp, cuando ya tenemos las tarjetas del servidor,
// y se renderiza usando su propio renderer (Section.renderItems()).
let cardSection: Section<CardData>;

// --- Formulario y validador: Editar perfil ---
const editFormElement = document.querySelector('#edit-profile-form') as HTMLFormElement;
const nameInput = editFormElement.querySelector('.popup__input_type_name') as HTMLInputElement;
const descriptionInput = editFormElement.querySelector(
  '.popup__input_type_description'
) as HTMLInputElement;

const editProfileValidator = new FormValidator(defaultFormConfig, editFormElement);
editProfileValidator.enableValidation();

const editProfilePopup = new PopupWithForm('#edit-popup', async (formValues) => {
  editProfilePopup.setLoading(true);
  try {
    const updatedUser = await api.updateUserInfo({
      name: formValues.name,
      about: formValues.description,
    });
    userInfo.setUserInfo({ name: updatedUser.name, description: updatedUser.about });
    editProfilePopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    editProfilePopup.setLoading(false);
  }
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
const newCardFormElement = document.querySelector('#new-card-form') as HTMLFormElement;
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();

const newCardPopup = new PopupWithForm('#new-card-popup', async (formValues) => {
  newCardPopup.setLoading(true);
  try {
    const newCard = await api.addCard({
      name: formValues['place-name'],
      link: formValues.link,
    });
    cardSection.addItem(createCard(newCard));
    newCardPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    newCardPopup.setLoading(false);
  }
});
newCardPopup.setEventListeners();

const addButton = document.querySelector('.profile__add-button') as HTMLElement;
addButton.addEventListener('click', () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

// --- Formulario y validador: Cambiar avatar ---
const avatarFormElement = document.querySelector('#avatar-form') as HTMLFormElement;
const avatarValidator = new FormValidator(defaultFormConfig, avatarFormElement);
avatarValidator.enableValidation();

const avatarPopup = new PopupWithForm('#avatar-popup', async (formValues) => {
  avatarPopup.setLoading(true);
  try {
    const updatedUser = await api.updateAvatar({ avatar: formValues.avatar });
    userInfo.setAvatar(updatedUser.avatar);
    avatarPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    avatarPopup.setLoading(false);
  }
});
avatarPopup.setEventListeners();

const avatarEditButton = document.querySelector('.profile__avatar-overlay') as HTMLElement;
avatarEditButton.addEventListener('click', () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

// --- Carga inicial: usuario + tarjetas juntos, antes de renderizar nada ---
async function initializeApp(): Promise<void> {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userInfo.setUserId(userData._id);
    userInfo.setUserInfo({ name: userData.name, description: userData.about });
    userInfo.setAvatar(userData.avatar);

    // Solo después de tener el id del usuario se crea la Section y se renderizan las tarjetas
    cardSection = new Section<CardData>(
      {
        items: initialCards,
        renderer: (item) => {
          cardSection.addItem(createCard(item));
        },
      },
      cardsListSelector
    );
    cardSection.renderItems();
  } catch (err) {
    console.error('Fallo al cargar datos iniciales:', err);
  }
}

initializeApp();