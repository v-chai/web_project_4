// Profile edit form //
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const popupClose = profileEditPopup.querySelector(".popup__close-button");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
let username = document.querySelector(".profile__name")
let userDescription = document.querySelector(".profile__subheading");
let nameInput = profileEditPopup.querySelector("#popup__form_username");
let aboutMeInput = profileEditPopup.querySelector("#popup__form_about-me");

function handleProfileEditClick() {

    profileEditPopup.classList.toggle("popup_opened");
    if (profileEditPopup.classList.contains("popup_opened")) {
        nameInput.defaultValue = username.textContent;
        aboutMeInput.defaultValue = userDescription.textContent;
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    username.textContent = nameInput.value;
    userDescription.textContent = aboutMeInput.value;
    handleProfileEditClick();
}

profileEditButton.addEventListener("click", handleProfileEditClick);
popupClose.addEventListener("click", handleProfileEditClick);
profileEditForm.addEventListener("submit", handleProfileFormSubmit)


// Cards //
const initialCards = [
    {
        name: "Oakland Bay Bridge",
        link: "../images/oakland.jpg"
    },
    {
        name: "Washington DC Metro",
        link: "../images/dc.jpg"
    },
    {
        name: "Manhattan Bridge",
        link: "../images/new-york.jpg"
    },
    {
        name: "Portland, OR",
        link: "../images/portland.jpg"
    },
    {
        name: "Minneapolis Stone Arch",
        link: "../images/minneapolis.jpg"
    },
    {
        name: "New Haven, CT",
        link: "../images/new-haven.jpg"
    }
];

function addCard(cardName, cardLink) {
    const cardTemplate = document.querySelector("#card").content;
    const cardElements = document.querySelector('.elements');

    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector(".element__photo").src = cardLink;
    cardElement.querySelector(".element__photo").alt = cardName;
    cardElement.querySelector(".element__text").textContent = cardName;

    cardElements.prepend(cardElement);

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
}

initialCards.forEach(card => addCard(card['name'], card['link']));

// Add card form //
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_add-card");
const cardPopupClose = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector(".popup__form");
let imageTitle = addCardPopup.querySelector("#popup__form_title");
let imageUrl = addCardPopup.querySelector("#popup__form_image-url");

function handleAddCardClick() {
    addCardPopup.classList.toggle("popup_opened");
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    console.log(imageTitle.value)
    addCard(imageTitle.value, imageUrl.value);
    handleAddCardClick();
}

addCardButton.addEventListener("click", handleAddCardClick);
cardPopupClose.addEventListener("click", handleAddCardClick);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);


// Photo popup //
const photoPopupContainer = document.querySelector(".popup_type_photo");
const photoCloseButton = photoPopupContainer.querySelector(".popup__close-button")
const popupImage = photoPopupContainer.querySelector(".popup__image");

function handlePhotoClick(photo) {
    popupImage.src = photo.src;
    popupImage.alt = photo.alt;
    photoPopupContainer.classList.toggle("popup_opened");
}

photoCloseButton.addEventListener("click", handlePhotoClick);






