export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
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

  getUserData = () => {};

  editProfile = () => {};

  addNewCard = () => {};

  removeUserCard = () => {};

  getLikeCount = () => {};

  changeLikeStatus = () => {};

  patchAvatar = () => {};
}
