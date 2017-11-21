import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class UserStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
        this._places = ""
    }

    setUsersObserver = (handler) => {
        this._usersHandler = handler
    }

    setSignupObserver = (handler) => {
        this._signupHandler = handler
    }

    getAllUsers = () => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/user", options)
            .then((res) => {
                return res.json()
            })
            .then((users) => {
                this._users = users
                if (this._usersHandler) {
                    this._usersHandler(users)
                }
            })
    }

    signUp = (user) => {
        fetch(URL + 'api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.firstname,
                lName: user.lastname,
                phone: user.phone,
                email: user.email
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (this._signupHandler) {
                this._signupHandler(data)
            }
        })
    }
    edit = (user) => {
        fetch(URL + 'api/user/edit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.firstname,
                lName: user.lastname,
                phone: user.phone,
                email: user.email
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (this._signupHandler) {
                this._signupHandler(data)
            }
        })
    }
}

let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
