export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(containerSelector);
    }

    renderer(items) {
        items.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._containerSelector === ".elements" ? this._container.prepend(element) : this._container.append(element);
    }
}