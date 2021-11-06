const profileEdit = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup__container");
const popupClose = popupContainer.querySelector(".popup__close-button");
const profileEditFormSave = popupContainer.querySelector(".popup__save-button");



function handleProfileEditClick() {
    let username = document.querySelector(".profile__name")
    let userDescription = document.querySelector(".profile__subheading");
    popupContainer.classList.toggle("popup_opened");
    popupContainer.querySelector("#popup__form_username").defaultValue = username.textContent;
    popupContainer.querySelector("#popup__form_about-me").defaultValue = userDescription.textContent;

}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let username = document.querySelector(".profile__name");
    let userDescription = document.querySelector(".profile__subheading");
    let nameInput = popupContainer.querySelector("#popup__form_username");
    let jobInput = popupContainer.querySelector("#popup__form_about-me");
    username.textContent = nameInput.value;
    userDescription.textContent = jobInput.value;
    handleProfileEditClick();
}


profileEdit.addEventListener("click", handleProfileEditClick);
popupClose.addEventListener("click", handleProfileEditClick);
profileEditFormSave.addEventListener("click", handleProfileFormSubmit)