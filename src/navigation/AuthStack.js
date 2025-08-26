import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login/Login';
import MainPage from '../pages/MainPage/MainPage';
import Appointment from '../pages/Appointment/Appointment';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='MainPage'
      screenOptions={{
        headerShown: false,
        }}>
          <Stack.Screen name ="MainPage" component={MainPage}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Appointment" component={Appointment} />
        </Stack.Navigator>

   
  )
}

export default AuthStack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
