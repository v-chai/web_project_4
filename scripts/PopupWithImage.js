import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photo = this._popup.querySelector(".element__photo");
        this._caption = this._popup.querySelector(".element__title");
    }

    open(photo_name, photo_src) {
        this._photo.src = photo_src;
        this._photo.alt = photo_name;
        this._caption.textContent = photo_name;
        super.open();
    }

}