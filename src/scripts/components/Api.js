export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards = () => {
    fetch('https://around.nomoreparties.co/v1/group-12/cards', {
      headers: {
        authorization: 'c785e696-84a9-4aca-b3d2-750b2694b444'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
    // fetch(`${this.baseUrl}/cards`, this.headers)
    //   .then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     return Promise.reject(`Error: ${res.status}`);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  getUserData = () => {};

  editProfile = () => {};

  addNewCard = () => {};

  removeUserCard = () => {};

  getLikeCount = () => {};

  changeLikeStatus = () => {};

  patchAvatar = () => {};
}
