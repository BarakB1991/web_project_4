export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  promiseCardsAndUserData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {authorization: this._token}
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: {authorization: this._token}
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  editProfile = () => {};

  addNewCard = () => {};

  removeUserCard = () => {};

  getLikeCount = () => {};

  changeLikeStatus = () => {};

  patchAvatar = () => {};
}
