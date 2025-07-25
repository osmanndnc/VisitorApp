import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddVisitor = ({navigation}) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [tc_no, setTc_no] = useState("");
  const [tel_no, setTel_no] = useState("");
  const [plate, setPlate] = useState("");
  const [person_to_visit, setPerson_To_Visit] = useState("");
  const [purpose, setPurpose] = useState("");



const handlerAddVisitor = async () => {
  console.log("Kullanıcı bilgisi:", user); 
  const visitorData = {
    name,
    tc_no,
    tel_no,
    plate,
    person_to_visit,
    purpose,
    approved_by: user?.id || 1,
  };
  console.log("Gönderilen veri:", visitorData);
   try {
    const response = await fetch("http://10.90.200.53/VISITORSYSTEM/createData.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    });

    const json = await response.json();
    if (json.success) {
      Alert.alert("Başarılı", json.message);
      navigation.goBack();
    } else {
      Alert.alert("Hata", json.message);
    }
  } catch (error) {
    console.error("İstek hatası:", error);
    Alert.alert("Hata", "Sunucuya bağlanılamadı");
  }
};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Yeni Ziyaretçi Ekle</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>TC Kimlik Numarası</Text>
          <TextInput
            style={styles.input}
            inputMode="numeric"
            maxLength={11}
            value={tc_no}
            onChangeText={setTc_no}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <TextInput
            style={styles.input}
            value={tel_no}
            onChangeText={setTel_no}
            keyboardType="phone-pad"
            maxLength={10}

          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Plaka</Text>
          <TextInput
            style={styles.input}
            value={plate}
            maxLength={8}
            onChangeText={setPlate}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Görüşeceği Kişi</Text>
          <TextInput
            style={styles.input}
            value={person_to_visit}
            onChangeText={setPerson_To_Visit}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ziyaret Sebebi</Text>
          <TextInput
            style={styles.input}
            value={purpose}
            onChangeText={setPurpose}
            multiline
          />
        </View>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.addButton} onPress={handlerAddVisitor}>
          <Text style={styles.addButtonText}>ZİYARETÇİ EKLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddVisitor;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#170242ff",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  addButton: {
    backgroundColor: "#170242ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#170242ff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
