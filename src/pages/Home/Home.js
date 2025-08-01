import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Home.style";
const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const date = new Date();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://10.90.200.53/VISITORSYSTEM/getData.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Ziyaretçi verileri:", data);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Ziyaretçi Listesi</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={data.filter(item => item.entry_time && item.entry_time.includes(date.toISOString().split("T")[0]))}
          verticalScrollIndicator={false}
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
              <TouchableOpacity style={styles.detail} onPress={() => navigation.navigate("Detail", { item
       :         item })}>
         
                      <Text style={styles.detailText}>Detaylar</Text>
      
                      </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate("AddVisitor")}
         >
          <Text style=
         {styles.addButtonText}>YENİ ZİYARETÇİ EKLE</Text>
        
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

