export default class Section {
  constructor(containerSelector, {renderer}) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer(items) {
    this._items = items;
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
