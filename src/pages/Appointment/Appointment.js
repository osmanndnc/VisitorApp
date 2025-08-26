import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

const Appointment = ({ navigation }) => {
  const [name, setName] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [purpose, setPurpose] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    fetch("http://10.90.200.53/VisitorSystem/getPerson.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Kişiler yüklendi:", data.persons);
        if (data.success) {
          setPersons(data.persons);
        }
      })
      .catch((error) => {
        console.error("Kişiler yüklenemedi:", error);
      });
  };

  const handleSubmit = () => {
    if (!name || !tcNo || !phone || !selectedPerson || !purpose) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun");
      return;
    }

    const appointmentData = {
      name,
      tc_no: tcNo,
      phone,
      person_to_visit: selectedPerson,
      purpose,
      plate: plateNumber,
    };

    fetch("http://10.90.200.53/VISITORSYSTEM/createAppointment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert("Başarılı", "Randevu oluşturuldu", [
            { text: "Tamam", onPress: () => navigation.goBack() },
          ]);
        } else {
          Alert.alert("Hata", data.message || "Randevu oluşturulamadı");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Hata", "Sunucuya bağlanılamadı");
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Yeni Randevu Oluştur</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>İsim Soyisim</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>TC Kimlik No</Text>
          <TextInput
            style={styles.input}
            value={tcNo}
            onChangeText={setTcNo}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={11}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Plaka Numarası</Text>
          <TextInput
            style={styles.input}
            value={plateNumber}
            onChangeText={setPlateNumber}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ziyaret Edilecek Kişi</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPerson}
              style={styles.picker}
              onValueChange={setSelectedPerson}
              mode="dropdown"
            >
              <Picker.Item label="Bir kişi seçin..." value="" />
              {persons.map((person) => (
                <Picker.Item
                  key={person.id}
                  label={person.name}
                  value={person.name}
                />
              ))}
            </Picker>
          </View>
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
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.addButtonText}>RANDEVU OLUŞTUR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appointment;

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
    marginBottom: 10,
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
  pickerContainer: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  picker: {
    height: 50,
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
