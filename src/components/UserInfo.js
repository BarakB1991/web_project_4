export default class UserInfo {
  constructor({userName, userAbout, avatar, userId}) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._avatar = avatar;
    this._userId = userId;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
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

  setUserId(userId) {
    this._userId.id = userId;
  }
}
