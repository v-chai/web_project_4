import { initialCards, validationConfig } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openModalWindow, 
        closeModalWindow, 
        handleOutsidePopupClick,
        handleProfileEditClick,
        handleProfileFormSubmit
    } from './utils.js';

/** Popup event listeners */
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => { 
    popup.addEventListener('mousedown', handleOutsidePopupClick);
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-button')) {
            closeModalWindow(popup)
        } 
    });
});

/** Card Functions */
const cardSection = document.querySelector(".elements");

function addCard(cardData) {
    return new Card(cardData, "#card").createCard();
}

function renderCard(card, section) {
    section.prepend(card);
};

/** Populate initial cards */
initialCards.forEach((initialCard) => {
    renderCard(addCard(initialCard), cardSection);
});

/** Profile edit form popup */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector("#profile_edit_form");

profileEditButton.addEventListener("click", function () {
    profileEditForm.reset();
    formValidators['profile_edit_form'].resetValidation();   
    handleProfileEditClick();
    });
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

/** Add card form popup */
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#add-card-popup");
const newCardForm = newCardPopup.querySelector("#add-photo-form");
const imageTitle = newCardForm.querySelector("#image-title-input");
const imageUrl = newCardForm.querySelector("#image-url-input");

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard(
        addCard({ name: imageTitle.value, link: imageUrl.value }),
        cardSection);
    closeModalWindow(newCardPopup);
};

newCardButton.addEventListener("click", function () { 
    newCardForm.reset();
    formValidators['add-photo-form'].resetValidation()
    openModalWindow(newCardPopup) 
});

newCardForm.addEventListener("submit", handleAddCardFormSubmit);

/** Form validation */
const formValidators = {}

function validateForms(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    })
};

validateForms(validationConfig);