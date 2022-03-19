export default class UserInfo {
  constructor({userName, userAbout, avatar}) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      profession: this._profession.textContent,
      avatar: this._avatar
    };
  }

  setUserInfo({userName, userAbout}) {
    this._userName.textContent = userName;
    this._userAbout.textContent = userAbout;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
