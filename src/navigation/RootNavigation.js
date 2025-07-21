import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack"; 
import { NavigationContainer } from "@react-navigation/native";


const RootNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <NavigationContainer>

        {isAuthenticated ? <UserStack/> :  <AuthStack/>}
</NavigationContainer>
  );
};

export default RootNavigation;

