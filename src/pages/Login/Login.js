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
import styles from "./Login.style";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const handleLogin = () => {
    fetch("http://192.168.245.140/VisitorSystem/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          setUser({
            id: data.id,
            username: data.username,
            role: data.role,
          });
          setIsAuthenticated(true);
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
        <Text style={styles.titleText}>Atatürk Üniversitesi</Text>
        <Text style={styles.titleText}>Elektronik Ziyaretçi Kayıt Sistemi</Text>
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
