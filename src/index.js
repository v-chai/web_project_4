import "./pages/index.css"
import { initialCards, validationConfig } from './scripts/data.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { 
        handleProfileEditClick,
        handleProfileFormSubmit
    } from './scripts/utils.js';
import Section from './scripts/Section.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';

/** Populate Initial Cards */
const cardSection = new Section({ items: initialCards, renderer: (item) => {
    const card = new Card(item, 
                        "#card", 
                        (cardImage) => {
                            new PopupWithImage({
                                popupSelector: "#photo-popup"
                            }).open(cardImage);
                        }
    )
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
    }
}, ".elements");

/** Profile edit form popup */

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector("#profile_edit_form");

profileEditButton.addEventListener("click", function () {
    profileEditForm.reset();
    formValidators['profile_edit_form'].resetValidation();   
    handleProfileEditClick();
    const profileEditPopup = new PopupWithForm("#profile-edit-popup", handleProfileFormSubmit)
    profileEditPopup.setEventListeners();
    profileEditPopup.open();
    });

/** Add card form popup */
const newCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#add-photo-form");
const imageTitle = newCardForm.querySelector("#image-title-input");
const imageUrl = newCardForm.querySelector("#image-url-input");

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const new_card = new Card({ name: imageTitle.value, link: imageUrl.value }, "#card", (cardImage) => {
        new PopupWithImage({
            popupSelector: "#photo-popup"
        }).open(cardImage);
    }
    )
    cardSection.addItem(new_card.createCard())
};

newCardButton.addEventListener("click", function () { 
    newCardForm.reset();
    formValidators['add-photo-form'].resetValidation();
    const addPhotoPopup = new PopupWithForm("#add-card-popup", handleAddCardFormSubmit);
    addPhotoPopup.setEventListeners();
    addPhotoPopup.open();
});

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