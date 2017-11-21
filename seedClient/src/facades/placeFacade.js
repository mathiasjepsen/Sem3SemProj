import fetchHelper, { errorChecker } from "./fetchHelpers"
import React from 'react';
const URL = require("../../package.json").serverURL

class placeFacade extends React.Component {
    constructor() {
        super()
    }

    setSortObserver = (handler) => {
        this._sortHandler = handler
    }

    setPlaceObserver = (handler) => {
        this._placeHandler = handler
    }

    setRatingObserver = (handler) => {
        this._ratingHandler = handler
    }

    createPlace = (place, data) => {
        const options = fetchHelper.makeOptions("POST", true);
        fetch(URL + 'api/place', {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify({
                description: place.description,
                image: place.image,
                address: {
                    city: place.address.city,
                    zip: place.address.zip,
                    street: place.address.street,
                    location: place.address.location
                },
                ratings: {
                    "lovro": 3.0
                }
            })
        }).then((res) => {
            return res.json()
        }).then((place) => {
            this.saveImage(data)
        })
    }

    fetchPlaces = () => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + 'api/place', options)
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                this._places = places
                if (this._placeHandler) {
                    this._placeHandler(places)
                }
            })
    }

    fetchPlace = (id) => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + 'api/place/' + id, options)
            .then((res) => {
                return res.json()
            })
            .then((place) => {
                this._place = place
                if (this._ratingHandler) {
                    this._ratingHandler(place)
                }
            })
    }

    addRating = (place) => {
        const options = fetchHelper.makeOptions("PUT", true, place);
        fetch(URL + 'api/place/rate', {
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
        this._sortHhandler(sortedArray);
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


let pf = new placeFacade();

export default pf;

