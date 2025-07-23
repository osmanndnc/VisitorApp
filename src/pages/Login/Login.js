import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.style"

const Login = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = () => {
    fetch("http://10.102.0.127/VISITORSYSTEM/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsAuthenticated(true);
          Alert.alert("Giriş Başarılı", "Hoş geldiniz!");
          if(data.role === "admin") {
            navigation.navigate("AdminHome");
          } else {
            navigation.navigate("Home");
          }
        } else {
          Alert.alert("Hata", data.message || "Giriş başarısız");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Hata", "Sunucuya bağlanılamadı");
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../components/images/ata_icon.png")}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Atatürk Üniversitesi
        </Text>
        <Text style={styles.titleText}>
          Elektronik Ziyaretçi Kayıt Sistemi
        </Text>
        
      </View>

      <View style={styles.inputcontainer}>
        <TextInput
          placeholder="Kullanıcı Adı"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>GİRİŞ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

