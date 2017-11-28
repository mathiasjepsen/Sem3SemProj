var React = require('react');

var INITIAL_LOCATION = {
    address: 'London, United Kingdom',
    position: {
        latitude: 51.5085300,
        longitude: -0.1257400
    }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

var ATLANTIC_OCEAN = {
    latitude: 29.532804,
    longitude: -55.491477
};

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            isGeocodingError: false,
            foundAddress: INITIAL_LOCATION.address
        }
    }

    geocodeAddress = (address) => {
        this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

            if (status === window.google.maps.GeocoderStatus.OK) {

                this.setState({
                    foundAddress: results[0].formatted_address,
                    isGeocodingError: false
                });

                this.map.setCenter(results[0].geometry.location);
                this.marker.setPosition(results[0].geometry.location);

                return;
            }

            this.setState({
                foundAddress: null,
                isGeocodingError: true
            });

            this.map.setCenter({
                lat: ATLANTIC_OCEAN.latitude,
                lng: ATLANTIC_OCEAN.longitude
            });

            this.marker.setPosition({
                lat: ATLANTIC_OCEAN.latitude,
                lng: ATLANTIC_OCEAN.longitude
            });

        }.bind(this));
    }

    handleFormSubmit = (submitEvent) => {
        submitEvent.preventDefault();

        var address = this.searchInputElement.value;

        this.geocodeAddress(address);
    }

    componentDidMount = () => {
        var mapElement = this.mapElement;

        this.map = new window.google.maps.Map(mapElement, {
            zoom: INITIAL_MAP_ZOOM_LEVEL,
            center: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        this.marker = new window.google.maps.Marker({
            map: this.map,
            position: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        this.geocoder = new window.google.maps.Geocoder();
    }

    setSearchInputElementReference = (inputReference) => {
        this.searchInputElement = inputReference;
    }

    setMapElementReference = (mapElementReference) => {
        this.mapElement = mapElementReference;
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-12">

                        <form className="form-inline" onSubmit={this.handleFormSubmit}>
                            <div className="row">
                                <div className="col-xs-8 col-sm-10">

                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="address">Address</label>
                                        <input type="text" className="form-control input-lg" id="address" placeholder="London, United Kingdom" ref={this.setSearchInputElementReference} required />
                                    </div>

                                </div>
                                <div className="col-xs-4 col-sm-2">

                                    <button type="submit" className="btn btn-default btn-lg">
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>

                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">

                        {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}

                        <div className="map" ref={this.setMapElementReference}></div>

                    </div>
                </div>
            </div>

        )
    }
}

module.exports = Map