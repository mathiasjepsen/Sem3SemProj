import React, { Component } from 'react';
import { View, StyleSheet , Button , stylesheet , ScrollView} from 'react-native';
import t from 'tcomb-form-native';

//var ScrollingMenu = require('react-native-scrolling-menu');


const Form = t.form.Form;

const Home = t.struct({
    city: t.String,
    zip: t.String,
    street: t.String,
    description: t.String,
    location: t.String,
    image: t.String
  });

  const options = {
    fields:{
      city:{
      error:'You need a city'
      },
      zip:{
        label:'zip code' ,
        error: 'You need a zip code'
      },
      street:{
        error:'You need a Street'
      },
      description:{
        error:'You need a description'
      },
      location:{
        error:'You need a Location'
      },
      image:{
        error:'You need an image'
      }
  },
  }

  

export default class CreateHome extends Component {
  handleSubmit = () =>{ const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }  
  constructor() {
        super()
    }

    render() {
        return (
          <View style={styles.container}>
          <ScrollView>
            <Form 
              ref ={c => this._form = c}
              type={Home}
              options = {options}
               />
          <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
          </ScrollView>
        </View>
        );
    }
}    

const formStyles = {
 ...Form.styleSheet ,
 controlLabel: {
  normal: {
    color: 'blue',
    fontSize: 18,
    marginBottom: 7,
    fontWeight: '600'
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginBottom: 7,
    fontWeight: '600'
  }
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
