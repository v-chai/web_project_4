/** General Popup Functions & Event Handlers */ 
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
    if (evt.key === "Escape") {
        const activePopup = document.querySelector(".popup_opened");
        closeModalWindow(activePopup);
    };
};

function handleOutsidePopupClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModalWindow(evt.currentTarget);
    };
};

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
    openModalWindow, 
    closeModalWindow, 
    handleOutsidePopupClick,
    handleProfileEditClick,
    handleProfileFormSubmit
}