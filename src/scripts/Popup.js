export default class Popup {
    constructor(popupSelector) {
        this._popop = document.querySelector(popupSelector);

    }

    open() {
        this._popup.classList.add("popup_opened")
        document.addEventListener("keydown", this._handleEscapeClose())
    }

    close() {
        document.removeEventListener("keyup", this._handleEscapeClose());
        this._popup.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        evt.preventDefault();
        if (evt.key === "Escape") {
            this.close();
        };
    }

    setEventListeners() {
        this.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close-button')) {
                this.close()
            } 
            else if (evt.target === this._popup) {
                this.close();
            }
        })
    }
}