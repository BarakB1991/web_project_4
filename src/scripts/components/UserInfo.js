export default class UserInfo {
  constructor({name, profession, avatar}) {
    this._name = name;
    this._profession = profession;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent,
      avatar: this._avatar
    };
  }

  setUserInfo({name, profession}) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
