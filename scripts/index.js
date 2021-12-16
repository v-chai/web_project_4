import { initialCards } from './initial-cards.js';
import { resetValidation, validationConfig } from './validate.js';

/** General Popup Functions */
const popupScreen = document.querySelectorAll(".popup");

function openModalWindow(modalWindow) {
    modalWindow.classList.add("popup_opened");
    document.addEventListener("keyup", handleEscape);
};

function closeModalWindow(modalWindow) {
    document.removeEventListener("keyup", handleEscape);
    modalWindow.classList.remove("popup_opened");
};

function handleEscape(evt) {
    evt.preventDefault();
    const activePopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closeModalWindow(activePopup);
    };
};

function handleOutsidePopupClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModalWindow(evt.currentTarget);
    };
};

popupScreen.forEach((popup) => { 
    popup.addEventListener('click', handleOutsidePopupClick);
});

/** Cards */
const cardTemplate = document.querySelector("#card").content;
const cardElements = document.querySelector(".elements");

function createCard(cardObject) {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    const cardPhoto = cardElement.querySelector(".element__photo");

    cardPhoto.src = cardObject["link"];
    cardPhoto.alt = cardObject["name"];
    cardElement.querySelector(".element__text").textContent = cardObject["name"];
    cardElement.querySelector(".element__delete-icon").addEventListener("click", function (evt) {
        const cardItem = evt.target.closest(".element");
        cardItem.remove();
    });

    cardElement.querySelector(".element__heart").addEventListener("click", function (evt) {
        evt.target.classList.toggle('element__heart_like_true');
    });

    cardElement.querySelector(".element__photo").addEventListener("click", function (evt) {
        handlePhotoClick(evt.target);
    });

    return cardElement;
};

function renderCard(cardObject) {
    const newCard = createCard(cardObject)
    cardElements.prepend(newCard);
};

initialCards.forEach(renderCard);

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
    renderCard( {name: imageTitle.value, link: imageUrl.value} );
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
const photoCloseButton = photoPopupContainer.querySelector(".popup__close-button")
const popupImage = photoPopupContainer.querySelector(".popup__image");
const popupCaption = photoPopupContainer.querySelector(".popup__caption")

function handlePhotoClick(photo) {
    popupImage.src = photo.src;
    popupImage.alt = photo.alt;
    popupCaption.textContent = photo.alt;
    openModalWindow(photoPopupContainer);
};

photoCloseButton.addEventListener("click", function () { closeModalWindow(photoPopupContainer) });

/** Form reset */
function resetForm(form) {
    form.reset();
    resetValidation(form);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector)
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.setAttribute("disabled", "");
};