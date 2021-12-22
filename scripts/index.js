import { initialCards, validationConfig } from './data.js';
import Card from './card.js';
import FormValidator from './form-validator.js';
import { openModalWindow, closeModalWindow } from './utils.js';

/** General Popup Functions */
const popupScreen = document.querySelectorAll(".popup");

function handleOutsidePopupClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModalWindow(evt.currentTarget);
    };
};

popupScreen.forEach((popup) => { 
    popup.addEventListener('mousedown', handleOutsidePopupClick);
});

/** Cards */
const cardSection = document.querySelector(".elements");

function renderCard(cardData, section) {
    const newCard = new Card(cardData, "#card").createCard();
    section.prepend(newCard);
};

initialCards.forEach((cardObject) => {
    renderCard(cardObject, cardSection);
});

/** Profile edit form popup */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const profilePopupClose = profileEditPopup.querySelector(".popup__close-button");
const profileEditForm = profileEditPopup.querySelector(".form");
const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__subheading");
const nameInput = profileEditPopup.querySelector("#username-input");
const aboutMeInput = profileEditPopup.querySelector("#about-me-input");

function handleProfileEditClick() {
    openModalWindow(profileEditPopup);
    resetForm(profileEditForm);
    nameInput.value = userName.textContent;
    aboutMeInput.value = userDescription.textContent;
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userDescription.textContent = aboutMeInput.value;
    closeModalWindow(profileEditPopup);
    resetForm(profileEditForm);
};

profileEditButton.addEventListener("click", handleProfileEditClick);
profilePopupClose.addEventListener("click", function () { 
    closeModalWindow(profileEditPopup);
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

/** Add card form popup */
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector("#add-card-popup");
const addCardPopupClose = popupAddCard.querySelector(".popup__close-button");
const addCardForm = popupAddCard.querySelector("#add-photo-form");
const imageTitle = popupAddCard.querySelector("#image-title-input");
const imageUrl = popupAddCard.querySelector("#image-url-input");

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard({ name: imageTitle.value, link: imageUrl.value }, cardSection);
    closeModalWindow(popupAddCard);
    resetForm(addCardForm);
};

addCardButton.addEventListener("click", function () { 
    resetForm(addCardForm); 
    openModalWindow(popupAddCard) 
});
addCardPopupClose.addEventListener("click", function () { 
    closeModalWindow(popupAddCard);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

/**  Photo popup */
const photoPopupContainer = document.querySelector("#photo-popup");
const photoCloseButton = photoPopupContainer.querySelector(".popup__close-button");

photoCloseButton.addEventListener("click", function () { closeModalWindow(photoPopupContainer) });

/** Form reset */
// function resetValidation() {
//     FormValidator._inputList.forEach((inputElement) => {
//         FormValidator.hideInputError(inputElement)
//     });
// }

function resetForm(form) {
    form.reset();
//  FormValidator.resetValidation();
    const submitButton = form.querySelector(validationConfig.submitButtonSelector)
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.setAttribute("disabled", "");
};

function validateForms(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        new FormValidator(config, formElement).enableValidation()
    })
};

validateForms(validationConfig);