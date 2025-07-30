import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { RadioGroup } from "react-native-radio-buttons-group";

const AddUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [radioButtons, setRadioButtons] = useState([
    { id: "1", label: "Admin", value: "admin" },
    { id: "2", label: "Güvenlik", value: "security" },
  ]);

  const [selectedId, setSelectedId] = useState(null);

  const onPressRadioButton = (selectedId) => {
    setSelectedId(selectedId);
    const selected = radioButtons.find(button => button.id === selectedId);
    if (selected) {
      setRole(selected.value);
    }
  };

  const handleLogin = async () =>{
    const user ={
      username: userName,
      password,
      role
    }
    try {
      const response = await fetch("http://10.90.200.53/VISITORSYSTEM/createUser.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const json =await response.json()
      if(json.success){
        alert("Kullanıcı Ekleme Başarılı")
        navigation.goBack();
      }
      else{
        alert("Kullanıcı Eklenemedi")
      }
      
    } catch (error) {
      alert("Hata" ,error)
      
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Yeni Kullanıcı Ekle</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rol</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton}
            selectedId={selectedId}
            containerStyle={styles.radioGroup}
            layout="row"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Kullanıcı Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigation.navigate("GetUser")}>
          <Text style={styles.buttonText}>Kullanıcıları Listele</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#170242ff",
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 8,
  },
  radioGroup: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#170242ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
