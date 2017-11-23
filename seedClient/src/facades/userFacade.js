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
    setEditObserver = (handler) => {
        this._editHandler = handler
    }

    setEditUserObserver = (handler) => {
        this._editHandler = handler
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
    getUser = (username) => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/user/" + username, options)
            .then((res) => {
                return res.json()
            })
    }


    getUser = (username) => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/user/" + username, options)
        .then((res) => {
            return res.json()
        })
        .then((user) => {
                this._user = user
                if (this._editHandler) {
                    this._editHandler(user)
                }        })
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
    editUser = (user) => {
        const options = fetchHelper.makeOptions("PUT", true);
        console.log("user", user)
        fetch(URL + "api/user/edit", {
            method: 'PUT',
            headers: options.headers,
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.fName,
                lName: user.lName,
                phone: user.phone,
                email: user.email,          
                password: user.password
            })
        })
    }
}
let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
