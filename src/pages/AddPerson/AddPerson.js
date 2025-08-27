import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const AddPerson = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mail,setMail]=useState("");
  const [depart, setDepart] = useState("");
  
  const handleCreate = async () => {
    const person = {
      name,
      mail,
      department: depart,
    };
    try {
      const response = await fetch(
        "http://10.90.200.53/VISITORSYSTEM/createPerson.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        }
      );
      const json = await response.json();
      if (json.success) {
        alert("Kişi Ekleme Başarılı");
        navigation.goBack();
      } else {
        alert("Kişi Eklenemedi");
      }
    } catch (error) {
      alert("Hata", error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Yeni Kişi Ekle</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>İsim Soyisim</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mail Adresi</Text>
          <TextInput
            style={styles.input}
            value={mail}
            onChangeText={setMail}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birim</Text>
          <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={depart}
                      style={styles.picker}
                      onValueChange={setDepart}
                      mode="dropdown"
                    >
                    
                    </Picker>
                  </View>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Kişi Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPerson;

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
    marginBottom: 5,
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
    marginBottom: 5,
  },
  radioGroup: {
    alignItems: "flex-start",
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#170242ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
