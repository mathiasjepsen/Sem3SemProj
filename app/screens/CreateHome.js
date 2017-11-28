import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Home = t.struct({
    city: t.String,
    zip: t.String,
    street: t.String,
    description: t.String,
    location: t.String,
    image: t.String
  });

export default class CreateHome extends Component {
    constructor() {
        super()
    }

    render() {
        return (
          <View style={styles.container}>
            <Form type={Home} /> 
          </View>
        );
    }
}    


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
  });
