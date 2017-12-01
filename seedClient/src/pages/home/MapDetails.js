import homeFacade from '../../facades/homeFacade'

var React = require('react');

var INITIAL_LOCATION = {
    address: 'London, United Kingdom',
    position: {
        latitude: 51.5085300,
        longitude: -0.1257400
    }
};

var INITIAL_MAP_ZOOM_LEVEL = 16;

var ATLANTIC_OCEAN = {
    latitude: 29.532804,
    longitude: -55.491477
};

export default class MapDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundAddress: INITIAL_LOCATION.address,
            isGeocodingError: false,
            address: {
                city: props.city,
                street: props.street,
                zip: props.zip
            }
        }
    }
/*
    componentWillReceiveProps() {
        var address = this.state.address
        address.city = this.props.city
        address.street = this.props.street
        address.zip = this.props.zip
        
        this.setState({
            address
        })

    }
*/
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
homeMapHandler = (address) => {
    var address = this.state.address
    address.city = this.props.city
    address.street = this.props.street
    address.zip = this.props.zip
    
    this.setState({
        address
    })

 address = `${this.state.address.city}, ${this.state.address.street}, ${this.state.address.zip}`
    this.geocodeAddress(address);
    console.log("in home map handler", address)
    
}

    componentDidMount = () => {
        var mapElement = this.mapElement;
        homeFacade.setHomeMapObserver(this.homeMapHandler)
        
        this.map = new window.google.maps.Map(mapElement, {
            zoom: INITIAL_MAP_ZOOM_LEVEL,
            center: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        })

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
                        </div>

                    </div>
                    <div className="row">
                        <div className="map" ref={this.setMapElementReference}></div>
                    </div>
            </div>

        )
    }
}