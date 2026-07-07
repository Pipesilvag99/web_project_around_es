const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// --- Elementos del perfil ---
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// --- Elementos del modal "Editar perfil" ---
const editPopup = document.querySelector('#edit-popup');
const editCloseButton = editPopup.querySelector('.popup__close');
const editProfileForm = editPopup.querySelector('#edit-profile-form');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');

// --- Elementos del modal "Agregar tarjeta" ---
const newCardPopup = document.querySelector('#new-card-popup');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('#new-card-form');
const placeNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const linkInput = newCardPopup.querySelector('.popup__input_type_url');

// --- Elementos del modal "Imagen ampliada" ---
const imagePopup = document.querySelector('#image-popup');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// --- Template y contenedor de tarjetas ---
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

// --- Funciones reutilizables del modal ---
function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

// --- Rellena el formulario con los datos actuales del perfil ---
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// --- Rellena el formulario y abre el modal "Editar perfil" ---
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// --- Maneja el envío del formulario "Editar perfil" ---
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

// --- Maneja el envío del formulario "Agregar tarjeta" ---
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, linkInput.value, cardsList);
  closeModal(newCardPopup);
  newCardForm.reset();
}

// --- Alterna el estado "Me gusta" del botón ---
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// --- Elimina la tarjeta del DOM ---
function handleDeleteButtonClick(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

// --- Abre el modal de imagen ampliada ---
function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// --- Crea el elemento de una tarjeta a partir de sus datos ---
function getCardElement({ name = "Sin título", link = "/images/placeholder.jpg" } = {}) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', handleLikeButtonClick);
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  cardImage.addEventListener('click', () => handleImageClick(name, link));

  return cardElement;
}

// --- Crea y antepone una tarjeta al contenedor indicado ---
function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

// --- Event listeners: perfil ---
editButton.addEventListener('click', handleOpenEditModal);
editCloseButton.addEventListener('click', () => closeModal(editPopup));
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// --- Event listeners: agregar tarjeta ---
addButton.addEventListener('click', () => openModal(newCardPopup));
newCardCloseButton.addEventListener('click', () => closeModal(newCardPopup));
newCardForm.addEventListener('submit', handleCardFormSubmit);

// --- Event listeners: imagen ampliada ---
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

// --- Renderiza las tarjetas iniciales ---
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});