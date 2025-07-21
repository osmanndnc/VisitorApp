import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';

const Stack = createNativeStackNavigator();


const UserStack = () => {
  return (

    <Stack.Navigator
    screenOptions={{
    }}>
        <Stack.Screen name ="Home" component={Home} />
    </Stack.Navigator>


)
}

export default UserStack

const styles = StyleSheet.create({})