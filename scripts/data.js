/** Initial cards */
export const initialCards = [
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

export const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
};