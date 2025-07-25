import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Detail from '../pages/Details/Detail';
import AdminHome from '../pages/AdminHome/AdminHome';
import AddVisitor from '../pages/addVisitor/AddVisitor';
import { AuthContext } from '../context/AuthContext';
import AddUser from '../pages/AddUser/AddUser';

const Stack = createNativeStackNavigator();


const UserStack = () => {

  const { user } = useContext(AuthContext);
  return (

    <Stack.Navigator
    initialRouteName={user.role === 'admin' ? 'AdminHome' : 'Home'}
    screenOptions={{
      headerShown:false,
    }}>
      
        <Stack.Screen name ="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name ="AddVisitor" component={AddVisitor} />
        <Stack.Screen name="AddUser" component={AddUser} />
    </Stack.Navigator>


)
}

export default UserStack

const styles = StyleSheet.create({})