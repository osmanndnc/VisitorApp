import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../components/images/ata_icon.png")}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Atatürk Üniversitesi</Text>
        <Text style={styles.titleText}>Elektronik Ziyaretçi Kayıt Sistemi</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ziyaret Kaydı Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Personel Girişi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#170242ff",
    marginVertical: 5,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#170242ff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 25,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#170242ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
