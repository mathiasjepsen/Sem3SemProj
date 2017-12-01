import fetchHelper, { errorChecker } from "./fetchHelpers"
import React from 'react';
const URL = require("../../package.json").serverURL

class homeFacade {

    setSortObserver = (handler) => {
        this._sortHandler = handler
    }

    setHomeObserver = (handler) => {
        this._homeHandler = handler
    }
    setAddressObserver = (handler) => {
        this._addressHandler = handler
    }

    setDetailsObserver = (handler) => {
        this._detailsHandler = handler
    }

    setRatingObserver = (handler) => {
        this._ratingHandler = handler
    }
   
    setHomeMapObserver = (handler) => {
        this._homeMapHandler = handler
    }

    setIdObserver = (handler) => {
        this._homeIdHandler = handler
    }

    createHome = (home, data) => {
        const options = fetchHelper.makeOptions("POST", true);
        fetch(URL + 'api/home', {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify({
                description: home.description,
                image: home.image,
                address: {
                    city: home.address.city,
                    zip: home.address.zip,
                    street: home.address.street,
                }
            })
        }).then((res) => {
            return res.json()
        }).then((home) => {
            this.saveImage(data)
            this.fetchHomes()
            if (this._homeIdHandler) {
                this._homeIdHandler(home.id)
            }
        })
    }

    fetchHomes = () => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + 'api/home', options)
            .then((res) => {
                return res.json()
            })
            .then((homes) => {
                this._homes = homes
                if (this._homeHandler) {
                    this._homeHandler(homes)
                }
            })
    }

    fetchHome = (id) => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + 'api/home/' + id, options)
            .then((res) => {
                return res.json()
            })
            .then((home) => {
                this._home = home
                if (this._ratingHandler) {
                    this._ratingHandler(home)
                }
                console.log("Home in fetchHome testing", home)
                if (this._detailsHandler) {
                    this._detailsHandler(home)
                }
                if(this._homeMapHandler) {
                    this._homeMapHandler(home)
                }
            })
    }

    addRating = (home) => {
        const options = fetchHelper.makeOptions("PUT", true, home);
        fetch(URL + 'api/home/rate', {
            method: 'PUT',
            headers: options.headers,
            body: options.body
        })
    }

    saveImage = (data) => {
        const options = fetchHelper.makeOptions("POST");
        fetch(URL + 'api/upload/file', {
            method: 'POST',
            body: data
        })
    }

    sortByRating = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareRating);
        this._sortHandler(sortedArray);
    }

    sortByCity = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareCity);
        this._sortHandler(sortedArray);
    }

    sortByZip = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareZip);
        this._sortHandler(sortedArray);
    }
}

function compareRating(a, b) {
    if (parseInt(a.rating) > parseInt(b.rating))
        return -1;
    if (parseInt(a.rating) < parseInt(b.rating))
        return 1;
    return 0;
}

function compareCity(a, b) {
    if (a.address.city < b.address.city)
        return -1;
    if (a.address.city > b.address.city)
        return 1;
    return 0;
}

function compareZip(a, b) {
    if (a.address.zip < b.address.zip)
        return -1;
    if (a.address.zip > b.address.zip)
        return 1;
    return 0;
}


let hf = new homeFacade();

export default hf;

