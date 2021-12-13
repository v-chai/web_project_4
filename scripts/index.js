/** General Popup Functions */
function openModalWindow(modalWindow) {
    modalWindow.classList.add("popup_opened");
};

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove("popup_opened");
};

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

/** Initial cards */
const initialCards = [
    {
        name: "Oakland Bay Bridge",
        link: "./images/oakland.jpg"
    },
    {
        name: "Washington DC Metro",
        link: "./images/dc.jpg"
    },
    {
        name: "Manhattan Bridge",
        link: "./images/new-york.jpg"
    },
    {
        name: "Portland, OR",
        link: "./images/portland.jpg"
    },
    {
        name: "Minneapolis Stone Arch",
        link: "./images/minneapolis.jpg"
    },
    {
        name: "New Haven, CT",
        link: "./images/new-haven.jpg"
    }
];
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
    nameInput.value = userName.textContent;
    aboutMeInput.value = userDescription.textContent;
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userDescription.textContent = aboutMeInput.value;
    closeModalWindow(profileEditPopup);
};

profileEditButton.addEventListener("click", handleProfileEditClick);
profilePopupClose.addEventListener("click", function () { closeModalWindow(profileEditPopup) });
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

/** Add card form popup */
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#add-card-popup");
const addCardPopupClose = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector("#add-photo-form");
const imageTitle = addCardPopup.querySelector("#image-title-input");
const imageUrl = addCardPopup.querySelector("#image-url-input");

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard( {name: imageTitle.value, link: imageUrl.value} );
    closeModalWindow(addCardPopup);
    addCardForm.reset();
};

addCardButton.addEventListener("click", function () { openModalWindow(addCardPopup) });
addCardPopupClose.addEventListener("click", function () { closeModalWindow(addCardPopup) });
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

/** Form validation */
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
}; 

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}; 

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("form__submit_inactive");
        buttonElement.setAttribute("disabled", "");
    } else {
        buttonElement.classList.remove("form__submit_inactive");
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};


function enableValidation() {
    const formList = Array.from(document.querySelectorAll(".form"));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();