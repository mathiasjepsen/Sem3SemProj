import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import homeFacade from '../../facades/homeFacade'
import auth from "../../authorization/auth"
import './MapStyle.css'
import Map from './Map'

class CreateHome extends Component {
    constructor() {
        super();
        this.state = { city: "", zip: "", street: "", description: "", image: "", isGeocodingError:false}
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var input = document.querySelector('input[type="file"]');
        var data = new FormData();
        const splitPath = input.value.split("\\")
        const imageName = splitPath[splitPath.length - 1]
        data.append('file', input.files[0]);
        data.append("fileName", imageName)

        const home = {
            address: {
                city: this.state.city,
                zip: this.state.zip,
                street: this.state.street,
            },
            description: this.state.description,
            image: imageName
        }


        homeFacade.createHome(home, data)
        this.props.history.push("/homes");
        homeFacade.fetchHomes()
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        console.log("isGeocodingError", this.state.isGeocodingError)
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <div className="form-signin-heading text-center">
                            <h2>Create New Home</h2>
                        </div>
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
                            <input type="file" id="file" className="file" ref={input => this.fileUpload = input} onChange={() => {
                                this.imageFieldText.value = this.fileUpload.value.split('\\').pop().split('/').pop()
                            }} style={{ visibility: "hidden", position: "absolute" }} />
                            <div className="input-group col-xs-12">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-picture"></i></span>
                                <input type="text" className="form-control input-lg imageField" ref={input => this.imageFieldText = input} disabled placeholder="Upload Image" />
                                <span className="input-group-btn">
                                    <button className="browse btn btn-primary input-lg" type="button" onClick={() => {
                                        this.fileUpload.click();
                                    }}><i className="glyphicon glyphicon-search"></i> Browse</button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Map
                            city={this.state.city}
                            street={this.state.street}
                            zip={this.state.zip}
                            isgeoCodingError={this.state.isGeocodingError}
                        />
                        <br></br>
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

export default CreateHome