// utils/constants.ts
// Aquí centralizamos las constantes principales del proyecto.
// En vez de tener los selectores "quemados" dentro de FormValidator,
// los definimos una sola vez aquí y se los pasamos como configuración.
export const defaultFormConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};
