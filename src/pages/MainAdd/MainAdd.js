import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const MainAdd = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Yeni Kayıt</Text>
        <Text style={styles.subtitle}>
          Eklemek istediğiniz kayıt türünü seçin
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("AddVisitor")}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: "#170242ff" }]}
          >
            <Ionicons name="person-add" size={28} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.menuTitle}>Ziyaretçi Ekle</Text>
            <Text style={styles.menuSubtitle}>
              Yeni ziyaretçi kaydı oluşturun
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("AddUser")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#2563eb" }]}>
            <Ionicons name="people" size={28} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.menuTitle}>Kullanıcı Ekle</Text>
            <Text style={styles.menuSubtitle}>
              Yeni sistem kullanıcısı ekleyin
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("AddPerson")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#059669" }]}>
            <Ionicons name="person-sharp" size={28} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.menuTitle}>Kişi Ekle</Text>
            <Text style={styles.menuSubtitle}>
              Ziyaret edilecek kişi ekleyin
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#170242ff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 18,
  },
});
