import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const AddDepartment = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleCreate = async () => {
    const department = {
      name,
      address,
    };
    try {
      const response = await fetch(
        "http://10.90.200.53/VISITORSYSTEM/createDepartment.php",
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
        <Text style={styles.title}>Yeni Birim Ekle</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birim Adı</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birim Adresi</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Birim Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDepartment;

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
