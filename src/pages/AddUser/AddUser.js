import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const AddUser = ({navigation}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
  return (
    <View style={styles.mainContainer}>
        <View style={styles.header}>
                <Text style={styles.title}>Yeni Kullanıcı Ekle</Text>
              </View> 

        <View style={styles.formContainer}>
             <TextInput
            style={styles.input}
            placeholder='Kullanıcı Adı'
            value={userName}
            onChangeText={setUserName}/>
             <TextInput
            style={styles.input}
            placeholder='Şifre'
            value={password}
            onChangeText={setPassword}
            
            /> 
            <TouchableOpacity>
                <Text>Ekle</Text>
            </TouchableOpacity>
        </View>

      
    </View>
  )
}

export default AddUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
    marginTop: 20,
    alignItems:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
     formContainer:{
        marginTop:40,
    flex: 1,
    alignItems:'center',
    
     },
     input:{
       width:'70%',
       padding:12,
       borderWidth:1,
       borderColor:'#ccc',
       borderRadius:5,
       marginBottom:12,
     },
     label:{
        fontSize:15,
        fontWeight:"bold",
        color:"#170242ff",
     },
})