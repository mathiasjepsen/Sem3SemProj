import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Places from './screens/Places'
import PlacesDetail from './screens/PlacesDetail'
import CreateHome from './screens/CreateHome'

export default class App extends React.Component {
    render() {
        return (
            <TabNav />
        )
    }
}

const Navigator = StackNavigator({
    Places: {
        screen: Places,
        navigationOptions: {
            headerTitle: 'Homes'
        }
    },
    PlacesDetail: {
        screen: PlacesDetail,
        navigationOptions: {
            headerTitle: 'Places Detail'
        }
    }
})

const TabNav = TabNavigator({
    Homes: {
        screen: Navigator,
        navigationOptions: {
            title: "Homes"
        }
    },
    CreateHome: {
        screen: CreateHome,
        navigationOptions: {
            title: "Create Home"
        }
    }
})