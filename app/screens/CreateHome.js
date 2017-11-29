import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, TextInput, Alert } from 'react-native';
import placeFacade from './../facades/placeFacade';

export default class CreateHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            zip: '',
            street: '',
            description: '',
            location: '',
            image: ''
        };
    }

    onSubmit(){
        placeFacade.createHome()
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(city) => this.setState({ city })}
                    placeholder='enter city'
                    value={this.state.city}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    keyboardType = 'numeric'
                    onChangeText={(zip) => this.setState({ zip })}
                    placeholder='enter zip'
                    value={this.state.zip}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(street) => this.setState({ street })}
                    placeholder='enter street'
                    value={this.state.street}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(description) => this.setState({ description })}
                    placeholder='enter description'
                    value={this.state.description}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(location) => this.setState({ location })}
                    placeholder='enter location'
                    value={this.state.location}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(image) => this.setState({ image })}
                    placeholder='enter imageryhyj'
                    value={this.state.image}
                />
                <Button
                onPress={this.onSubmit}
                title="Submit"
                color="#841584"
                />
            </View>
        );
    }

}