import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminHome.style";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const AdminHome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const {setIsAuthenticated}= useContext(AuthContext);

  useEffect(() => {
    getData();
  }, [data]);

  const getData = () => {
    fetch("http://10.90.200.53/VISITORSYSTEM/getData.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };



  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Ziyaretçi Listesi</Text>
      <TouchableOpacity style ={styles.filterArea}>
   
   <Ionicons name="funnel-outline"
   size={22}
   color={"#170242ff"} 
   ></Ionicons>
      </TouchableOpacity>
      
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10, 
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Ad Soyad:</Text>
                  <Text style={styles.value}>{item.name}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>TC Kimlik No:</Text>
                  <Text style={styles.value}>{item.tc_no}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Telefon:</Text>
                  <Text style={styles.value}>{item.phone}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Plaka:</Text>
                  <Text style={styles.value}>{item.plate}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.detail} onPress={() => navigation.navigate("Detail", { item: item })}>
                <Text style={styles.detailText}>Detaylar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

    
    </View>
  );
};

export default AdminHome;

