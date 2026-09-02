var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from './FormValidator.js';
import { defaultFormConfig } from './utils/constants.js';
import { Card } from './Card.js';
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
function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}
// --- Guardamos las instancias de Card para poder actualizarlas/eliminarlas ---
const cardInstances = new Map();
// --- Popup de confirmación para eliminar tarjeta ---
function handleConfirmDelete(cardId) {
    api
        .deleteCard(cardId)
        .then(() => {
        var _a;
        (_a = cardInstances.get(cardId)) === null || _a === void 0 ? void 0 : _a.remove();
        cardInstances.delete(cardId);
        confirmDeletePopup.close();
    })
        .catch((err) => console.error(err));
}
const confirmDeletePopup = new PopupWithConfirmation('#confirm-delete-popup', handleConfirmDelete);
confirmDeletePopup.setEventListeners();
function handleDeleteClick(cardId) {
    confirmDeletePopup.setCardId(cardId);
    confirmDeletePopup.open();
}
function handleLikeClick(cardId, isLiked) {
    api
        .changeLikeCardStatus(cardId, isLiked)
        .then((updatedCard) => {
        var _a;
        (_a = cardInstances.get(cardId)) === null || _a === void 0 ? void 0 : _a.updateLikeStatus(updatedCard.isLiked);
    })
        .catch((err) => console.error(err));
}
function createCard(data) {
    const card = new Card(data, userInfo.getUserId(), cardTemplateSelector, handleCardClick, handleLikeClick, handleDeleteClick);
    cardInstances.set(data._id, card);
    return card.getView();
}
// --- Section para el contenedor de tarjetas ---
const cardSection = new Section({
    items: [],
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    },
}, cardsListSelector);
// --- Formulario y validador: Editar perfil ---
const editFormElement = document.querySelector('#edit-profile-form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');
const editProfileValidator = new FormValidator(defaultFormConfig, editFormElement);
editProfileValidator.enableValidation();
const editProfilePopup = new PopupWithForm('#edit-popup', (formValues) => {
    editProfilePopup.setLoading(true);
    api
        .updateUserInfo({ name: formValues.name, about: formValues.description })
        .then((updatedUser) => {
        userInfo.setUserInfo({ name: updatedUser.name, description: updatedUser.about });
        editProfilePopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => editProfilePopup.setLoading(false));
});
editProfilePopup.setEventListeners();
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
    const currentInfo = userInfo.getUserInfo();
    nameInput.value = currentInfo.name;
    descriptionInput.value = currentInfo.description;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});
// --- Formulario y validador: Agregar tarjeta ---
const newCardFormElement = document.querySelector('#new-card-form');
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();
const newCardPopup = new PopupWithForm('#new-card-popup', (formValues) => {
    newCardPopup.setLoading(true);
    api
        .addCard({ name: formValues['place-name'], link: formValues.link })
        .then((newCard) => {
        cardSection.addItem(createCard(newCard));
        newCardPopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => newCardPopup.setLoading(false));
});
newCardPopup.setEventListeners();
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
// --- Formulario y validador: Cambiar avatar ---
const avatarFormElement = document.querySelector('#avatar-form');
const avatarValidator = new FormValidator(defaultFormConfig, avatarFormElement);
avatarValidator.enableValidation();
const avatarPopup = new PopupWithForm('#avatar-popup', (formValues) => {
    avatarPopup.setLoading(true);
    api
        .updateAvatar({ avatar: formValues.avatar })
        .then((updatedUser) => {
        userInfo.setAvatar(updatedUser.avatar);
        avatarPopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => avatarPopup.setLoading(false));
});
avatarPopup.setEventListeners();
const avatarEditButton = document.querySelector('.profile__avatar-overlay');
avatarEditButton.addEventListener('click', () => {
    avatarValidator.resetValidation();
    avatarPopup.open();
});
// --- Carga inicial: usuario + tarjetas juntos, antes de renderizar nada ---
function initializeApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            userInfo.setUserId(userData._id);
            userInfo.setUserInfo({ name: userData.name, description: userData.about });
            userInfo.setAvatar(userData.avatar);
            // Solo después de tener el id del usuario se renderizan las tarjetas
            initialCards.forEach((item) => cardSection.addItem(createCard(item)));
        }
        catch (err) {
            console.error('Fallo al cargar datos iniciales:', err);
        }
    });
}
initializeApp();
