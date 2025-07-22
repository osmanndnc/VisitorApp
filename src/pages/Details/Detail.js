import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Detail = ({ route }) => {
  const { item } = route.params;
  const [data, setData] = useState(item);

  useEffect(() => {
    detailData();
  }, []);


  const detailData = () => {
    fetch("http://10.102.0.127/VISITORSYSTEM/getDetail.php", {
      method: "POST",
      headers: { 
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setData(data);
        } else {
          Alert.alert("Hata", data.message || "Detaylar alınamadı");
        }
      })
    }

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Ziyaretçi Detayları
      </Text>

      <View
        style={{ backgroundColor: "#f9f9f9", padding: 20, borderRadius: 10 }}
      >
        <Text style={styles.detailRow}>Ad Soyad: {item.name}</Text>
        <Text style={styles.detailRow}>TC Kimlik No: {item.tc_no}</Text>
        <Text style={styles.detailRow}>Telefon: {item.phone}</Text>
        <Text style={styles.detailRow}>Plaka/Türü: {item.plate}</Text>
        <Text style={styles.detailRow}>Giriş Zamanı: {data.entry_time}</Text>
        <Text style={styles.detailRow}>
          {" "}
          Ziyaret Edilecek Kişi: {data.person_to_visit}
        </Text>
        <Text style={styles.detailRow}>Ziyaret Amacı: {data.purpose}</Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  detailRow: {
    fontSize: 16,
    marginBottom: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
