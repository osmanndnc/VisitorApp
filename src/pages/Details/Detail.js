import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

const Detail = ({ route, navigation }) => {
  const { item } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    detailData();
  }, []);

  const detailData = () => {
    fetch("http://10.102.0.127/VISITORSYSTEM/dataDetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          
          setData(data.visits);
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
        <TouchableOpacity style={styles.deleteContainer}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.visitorBox}>
          <Text style={styles.detailRow}>Ad Soyad: {item.name}</Text>
          <Text style={styles.detailRow}>TC Kimlik No: {item.tc_no}</Text>
          <Text style={styles.detailRow}>Telefon: {item.phone}</Text>
          <Text style={styles.detailRow}>Plaka/Türü: {item.plate}</Text>
        </View>

        <View style={styles.visitSection}>
          <Text style={styles.subHeader}>Ziyaret Kayıtları</Text>

          <FlatList
            data={data}//{data.filter(item => item.entry_time && item.entry_time.includes("2025-07-17"))}
            keyExtractor={(item, index) => index.toString()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#170242ff",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#170242ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom:8,
  },
  deleteContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff4444",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteText: {
    fontSize: 18,
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  visitSection: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#170242ff",
    marginBottom: 15,
    textAlign: "center",
  },
  visitorBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#170242ff",
  },
  visitBox: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  detailRow: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
});
