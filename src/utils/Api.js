export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  getCardsAndUserData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {authorization: this._token}
    }).then(res => this._getResponseData(res));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: {authorization: this._token}
    }).then(res => this._getResponseData(res));
  }

  editProfile(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    }).then(res => this._getResponseData(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._getResponseData(res));
  }

  removeUserCard = cardId => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  };

  addLike = cardId => {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  };

  removeLike = cardId => {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  };

  editAvatar = avatar => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar})
    }).then(res => this._getResponseData(res));
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}
