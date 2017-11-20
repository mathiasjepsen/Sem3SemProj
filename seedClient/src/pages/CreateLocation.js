import React, { Component } from 'react'
import placeFacade from '../facades/placeFacade'
import auth from "../authorization/auth";

class CreateLocation extends Component {
    constructor() {
        super();
        this.state = { city: "", zip: "", location: "", street: "", description: "", image: "" }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        var input = document.querySelector('input[type="file"]');
        var data = new FormData();
        const splitPath = input.value.split("\\")
        const imageName = splitPath[splitPath.length - 1]
        data.append('file', input.files[0]);        
        data.append("fileName", imageName)

        const place = {
            address: {
                city: this.state.city,
                zip: this.state.zip,
                street: this.state.street,
                location: this.state.location,
            },
            description: this.state.description,
            image: imageName
        }

        placeFacade.createPlace(place, data)
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                            <h2 className="form-signin-heading col-sm-offset-4">Create New Place</h2>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="text" value={this.state.description} onChange={this.onChange} className="form-control" id="description" placeholder="Description" required autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="text" value={this.state.street} onChange={this.onChange} className="form-control" id="street" placeholder="Street" required autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="text" value={this.state.city} onChange={this.onChange} className="form-control" id="city" placeholder="City" required autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="text" value={this.state.zip} onChange={this.onChange} className="form-control" id="zip" placeholder="Zip" required autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="text" value={this.state.location} onChange={this.onChange} className="form-control" id="location" placeholder="Location" required autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="file" id="file" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-6">
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateLocation;