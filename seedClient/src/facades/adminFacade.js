import fetchHelper, { errorChecker } from "./fetchHelpers";
import userFacade from "./userFacade"; //what if no handler in user facade
const URL = require("../../package.json").serverURL;


class AdminStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
        this._users = ""
    }

    addUser = (user) => {
        const options = fetchHelper.makeOptions("POST", true);
        fetch(URL + "api/admin/user", {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.fName,
                lName: user.lName,
                phone: user.phone,
                email: user.email
            })
        }).then(() => {
            userFacade.getAllUsers()
        })
    }

    deleteUser = (username) => {
        const options = fetchHelper.makeOptions("DELETE", true);
        fetch(URL + "api/admin/" + username, {
            method: 'DELETE',
            headers: options.headers
        }).then(() => {
            userFacade.getAllUsers()
        })
    }

    editUser = (user) => {
        const options = fetchHelper.makeOptions("PUT", true);
        fetch(URL + "api/admin/user", {
            method: 'PUT',
            headers: options.headers,
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.fName,
                lName: user.lName,
                phone: user.phone,
                email: user.email
            })
        }).then(() => {
            userFacade.getAllUsers()
        })
    }
}

let adminStore = new AdminStore();

//Only for debugging
//window.userStore = userStore;
export default adminStore;