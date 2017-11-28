const URL = require("../package.json").serverURL

class PlaceFacade {
    constructor() {
        this._places = ""
    }

    setPlaceObserver = (handler) => {
        this._placeHandler = handler
    }

    fetchPlaces = () => {
        fetch(URL + 'api/all/places')
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                this._places = places
                if (this._placeHandler) {
                    this._placeHandler(places)
                }
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            })
    }

    sortByRating = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareRating);
        return sortedArray
    }

    sortByCity = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareCity);
        return sortedArray
    }

    sortByZip = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareZip);
        return sortedArray
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


let placeFacade = new PlaceFacade()
export default placeFacade
