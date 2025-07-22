import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Detail from '../pages/Details/Detail';

const Stack = createNativeStackNavigator();


const UserStack = () => {
  return (

    <Stack.Navigator
    screenOptions={{
      headerShown:false,
    }}>
        <Stack.Screen name ="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>


)
}

export default UserStack

const styles = StyleSheet.create({})