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

export {openModalWindow, closeModalWindow}