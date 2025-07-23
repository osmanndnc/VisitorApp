import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Detail from '../pages/Details/Detail';
import AdminHome from '../pages/AdminHome/AdminHome';
import addVisitor from '../pages/addVisitor/addVisitor';

const Stack = createNativeStackNavigator();


const UserStack = () => {
  return (

    <Stack.Navigator
    screenOptions={{
      headerShown:false,
    }}>
        <Stack.Screen name ="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name ="AddVisitor" component={addVisitor} />
    </Stack.Navigator>


)
}

export default UserStack

const styles = StyleSheet.create({})