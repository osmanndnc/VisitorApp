import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Logout from "../pages/Logout/Logout";
import AddVisitor from '../pages/addVisitor/AddVisitor';
import AdminHome from "./../pages/AdminHome/AdminHome"
import GetReport from "./../pages/GetReport/GetReport"
import AddUser from "./../pages/AddUser/AddUser"
const TabNavigation = () => {

    const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      initialRouteName="MainStack"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 65, 
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e9ecef",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarActiveTintColor: "#170242ff",
        tabBarInactiveTintColor: "#6c757d",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 3,
        },
        tabBarIconStyle: {
          marginBottom: 1,
        },
      })}
    >
      <Tabs.Screen
        name="Reports"
        component={GetReport}
        options={{
          tabBarLabel: "Raporlar",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : styles.normalTab}>
              <Ionicons 
                name="document" 
                size={focused ? 26 : 22} 
                color={focused ? "#ffffff" : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Ziyaretçi Ekle"
        component={AddVisitor}
        options={{
          tabBarLabel: "Ziyaretçi",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : styles.normalTab}>
              <Ionicons 
                name="person-add" 
                size={focused ? 26 : 22} 
                color={focused ? "#ffffff" : color} 
              />
            </View>
          ),
        }}
      />
     
      <Tabs.Screen
        name="MainStack"
        component={AdminHome}
        options={{
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : styles.normalTab}>
              <Ionicons 
                name="home" 
                size={focused ? 30 : 26} 
                color={focused ? "#ffffff" : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Kullanıcı Ekle"
        component={AddUser}
        options={{
          tabBarLabel: "Kullanıcı",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : styles.normalTab}>
              <Ionicons 
                name="people" 
                size={focused ? 26 : 22} 
                color={focused ? "#ffffff" : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Çıkış Yap"
        component={Logout}
        options={{
          tabBarLabel: "Çıkış",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : styles.normalTab}>
              <Ionicons 
                name="log-out-outline" 
                size={focused ? 26 : 22} 
                color={focused ? "#ffffff" : color} 
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
  focusedTab: {
    backgroundColor: "#170242ff",
    borderRadius: 25,
    width: 50,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#170242ff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  normalTab: {
    backgroundColor: "transparent",
    borderRadius: 20,
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
})