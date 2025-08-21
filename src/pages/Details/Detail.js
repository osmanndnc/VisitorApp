import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import styles from "./Detail.style";
import { AuthContext } from "../../context/AuthContext";

const Detail = ({ route, navigation }) => {
  const { item } = route.params;
  const [data, setData] = useState([]);
  const date = new Date();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    detailData();
  }, []);

  const detailData = () => {
    fetch("http://10.90.200.53/VISITORSYSTEM/dataDetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          setData(data.visits)
          
        } else {
          Alert.alert("Hata", data.message || "Detaylar alınamadı");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Hata", "Sunucuya bağlanılamadı");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Ziyaretçi Detayları</Text>
        <View style={{ width: 40 }}></View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.visitorBox}>
          <Text style={styles.detailRow}>Ad Soyad: {item.name}</Text>
          <Text style={styles.detailRow}>TC Kimlik No: {item.tc_no}</Text>
          <Text style={styles.detailRow}>
            Telefon:  {data[0].phone}
          </Text>
          <Text style={styles.detailRow}>Plaka/Türü: {item.plate}</Text>
        </View>

        <View style={styles.visitSection}>
          <Text style={styles.subHeader}>Ziyaret Kayıtları</Text>

          <FlatList
            data={
              user.role == "security"
                ? data.filter(
                    (item) =>
                      item.entry_time &&
                      item.entry_time.includes(date.toISOString().split("T")[0])
                  )
                : data
            }
            keyExtractor={(item, index) => `${item.entry_time}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.visitBox}>
                <Text style={styles.detailRow}>
                  Giriş Zamanı: {item.entry_time}
                </Text>
                <Text style={styles.detailRow}>
                  Ziyaret Edilecek Kişi: {item.person_to_visit}
                </Text>
                <Text style={styles.detailRow}>
                  Ziyaret Amacı: {item.purpose}
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
          />
        </View>
      </View>
    </View>
  );
};

export default Detail;
