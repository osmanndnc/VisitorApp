import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'

const Logout = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

 useFocusEffect(
    React.useCallback(() => {
     setIsAuthenticated(false)
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text>Çıkış Yapılıyor</Text>
    </View>
 
  )
}

export default Logout

const styles = StyleSheet.create({})