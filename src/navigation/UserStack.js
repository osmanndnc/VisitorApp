import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home/Home";
import Detail from "../pages/Details/Detail";
import AddVisitor from "../pages/addVisitor/AddVisitor";
import { AuthContext } from "../context/AuthContext";
import TabNavigation from "./TabNavigation";
import GetUser from "../pages/GetUser/GetUser";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const { user } = useContext(AuthContext);


  return (
    

    <Stack.Navigator
      initialRouteName={user.role === "admin" ? "TabNavigation" : "Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="AddVisitor" component={AddVisitor} />
      <Stack.Screen name ="TabNavigation" component ={TabNavigation}/>
      <Stack.Screen name ="GetUser" component={GetUser}/>
    </Stack.Navigator>


   
  );
};

export default UserStack;

const styles = StyleSheet.create({});
