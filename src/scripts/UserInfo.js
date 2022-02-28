export default class UserInfo {
    constructor( { userName, userTitle } ) {
        this.userName = userName;
        this.userTitle = userTitle;
    }

    getUserInfo() {
        return { userName: this.userName, userTitle: this.userTitle };
    }
    
    setUserInfo() {
        document.querySelector("#username-input").textContent = this._userName;
        document.querySelector("#about-me-input").textContent = this._userJob;
    }
}