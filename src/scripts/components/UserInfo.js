export default class UserInfo {
  constructor({name, profession}) {
    this._name = name;
    this._profession = profession;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent
    };
  }

  setUserInfo({name, profession}) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}
