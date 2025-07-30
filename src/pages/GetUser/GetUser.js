import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const GetUser = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://10.90.200.53/VISITORSYSTEM/getUsers.php") // Kullanıcılar için ayrı endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Kullanıcı verileri:", data);
        if (data.success) {
          setData(data.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
        Alert.alert("Hata", "Kullanıcı verileri yüklenemedi");
      });
  };

  const deleteUser = (userId, userName) => {
    Alert.alert(
      "Kullanıcıyı Sil",
      `${userName} kullanıcısını silmek istediğinizden emin misiniz?`,
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            fetch("http://10.90.200.53/VISITORSYSTEM/deleteUser.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            })
            .then((response) => response.json())
            .then((result) => {
              if (result.success) {
                Alert.alert("Başarılı", "Kullanıcı başarıyla silindi");
                getData(); // Listeyi yenile
              } else {
                Alert.alert("Hata", result.message || "Kullanıcı silinemedi");
              }
            })
            .catch((error) => {
              console.error("Silme hatası:", error);
              Alert.alert("Hata", "Kullanıcı silinirken hata oluştu");
            });
          }
        }
      ]
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Kullanıcı Listesi</Text>
      </View>
      
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Ad Soyad:</Text>
                  <Text style={styles.value}>{item.name || item.username || "Belirtilmemiş"}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{item.email || "Belirtilmemiş"}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Rol:</Text>
                  <Text style={styles.value}>{item.role || "user"}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Kayıt Tarihi:</Text>
                  <Text style={styles.value}>
                    {item.created_at ? 
                      new Date(item.created_at).toLocaleDateString("tr-TR") : 
                      "Belirtilmemiş"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteUser(item.id, item.name || item.username)}
              >
                <Text style={styles.deleteButtonText}>🗑️ Kullanıcıyı Sil</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz kullanıcı bulunmamaktadır</Text>
              <Text style={styles.emptySubText}>Yeni kullanıcı eklemek için Kullanıcı Ekle sekmesini kullanın</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GetUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
    paddingBottom: 80, // Tab Navigator için alan
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#170242ff",
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  column: {
    flex: 0.48,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#dc3545",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: "#adb5bd",
    textAlign: "center",
    lineHeight: 20,
  },
});
