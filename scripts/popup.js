const profileEdit = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupClose = popupContainer.querySelector(".popup__close-button");
const profileEditForm = popupContainer.querySelector(".popup__form");
let username = document.querySelector(".profile__name")
let userDescription = document.querySelector(".profile__subheading");
let nameInput = popupContainer.querySelector("#popup__form_username");
let aboutMeInput = popupContainer.querySelector("#popup__form_about-me");



function handleProfileEditClick() {

    popupContainer.classList.toggle("popup_opened");
    if (popupContainer.classList.contains("popup_opened")) {
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


profileEdit.addEventListener("click", handleProfileEditClick);
popupClose.addEventListener("click", handleProfileEditClick);
profileEditForm.addEventListener("submit", handleProfileFormSubmit)