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
    });
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
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    });
  }

  removeUserCard = cardId => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    });
  };

  // getOwnerLikeStatus = (cardId, userId) => {
  //   return fetch(`${this._url}/cards/${cardId}/likes/${userId}`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: this._token,
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       return Promise.reject(`Error: ${response.status}`);
  //     }
  //   });
  // };

  addLike = cardId => {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    });
  };

  removeLike = cardId => {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    });
  };

  changeLikeStatus = () => {};

  patchAvatar = () => {};
}
