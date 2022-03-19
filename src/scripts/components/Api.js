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

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    }).then(response => {
      if (response.ok) {
        return {name, link};
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  removeUserCard = () => {};

  getLikeCount = () => {};

  changeLikeStatus = () => {};

  patchAvatar = () => {};
}
