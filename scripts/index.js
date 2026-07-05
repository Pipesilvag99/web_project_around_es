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

// --- Elementos del modal "Editar perfil" ---
const editPopup = document.querySelector('#edit-popup');
const closeButton = editPopup.querySelector('.popup__close');
const editProfileForm = editPopup.querySelector('#edit-profile-form');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');

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

// --- Event listeners ---
editButton.addEventListener('click', handleOpenEditModal);
closeButton.addEventListener('click', function () {
  closeModal(editPopup);
});
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// --- Muestra en consola el nombre de cada tarjeta inicial ---
initialCards.forEach(function (card) {
  console.log(card.name);
});