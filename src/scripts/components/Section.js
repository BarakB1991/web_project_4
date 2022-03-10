export default class Section {
  constructor(containerSelector, {items, renderer}) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
