export default class Card {

    constructor(cardData, templateSelector, handleCardClick) {
        this._photoLink = cardData.link;
        this._title = cardData.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;

    }
 
    createCard() {
        this._element = this._createCardElement();
        this._photo = this._element.querySelector(".element__photo");
        this._photoCaption = this._element.querySelector(".element__title");
        this._deleteIcon = this._element.querySelector(".element__delete-icon");
        this._heartIcon = this._element.querySelector(".element__heart");
        this._populateCardElement();
        this._setEventListeners();

        return this._element;
    }

    _createCardElement() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
    }

    _populateCardElement() {
        this._element.querySelector(".element__text").textContent = this._title;
        this._photo.src = this._photoLink;
        this._photo.alt = this._title;

    }

    _setEventListeners() {
        this._deleteIcon.addEventListener("click", () => this._handleDeleteCard());
        this._heartIcon.addEventListener("click", () => this._handlePhotoLike());
        this._photo.addEventListener("click", () => this._handleCardClick());
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handlePhotoLike() {
        this._heartIcon.classList.toggle('element__heart_like_true');
    }
}
