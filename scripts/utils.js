/** Profile Edit Form Event Handlers */ 
const profileEditPopup = document.querySelector("#profile-edit-popup");
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

export { 
    handleProfileEditClick,
    handleProfileFormSubmit
}