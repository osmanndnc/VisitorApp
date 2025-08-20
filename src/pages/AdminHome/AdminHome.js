import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminHome.style";
import { useIsFocused } from "@react-navigation/native";
import DatePicker from "react-native-date-ranges";

const AdminHome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const isFocussed = useIsFocused();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (isFocussed) {
      getData();
    }
  }, [isFocussed]);

  const getData = () => {
    fetch("http://10.90.200.53/VISITORSYSTEM/getData.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Ziyaretçi verileri:", data);
        setData(data);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Ziyaretçi Listesi</Text>

      <DatePicker
        style={{ width: 350, height: 45 }}
        customStyles={{
          placeholderText: { fontSize: 20 },
        }}
        centerAlign
        allowFontScaling={false}
        markText="Tarih Seçiniz"
        placeholder={"Filtrelemek İçin Tıklayınız"}
        mode={"range"}
        customButton={(onConfirm) => (
          <Button onPress={onConfirm} title="Onayla" />
        )}
        onConfirm={(dateRange) => {
          try {
            const startDateStr = dateRange.startDate;
            const endDateStr = dateRange.endDate;
            const [sYear, sMonth, sDay] = startDateStr.split("/");
            const [eYear, eMonth, eDay] = endDateStr.split("/");
            const sDate = new Date(`${sYear}-${sMonth}-${sDay}`);
            const eDate = new Date(`${eYear}-${eMonth}-${eDay}`);
            setStartDate(sDate);
            setEndDate(eDate);
          } catch (error) {
            console.error("Tarih parse hatası:", error);
          }
        }}
        customStyles ={{
          headerStyle: {backgroundColor: "#2196F3"},
        }}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={
            startDate && endDate
              ? data.filter((item) => {
                  const entryDate = new Date(item.entry_time.split(" ")[0]);
                  return entryDate >= startDate && entryDate <= endDate;
                })
              : data
          }
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
                  <Text style={styles.label}>Plaka:</Text>
                  <Text style={styles.value}>{item.plate}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.detail}
                onPress={() => navigation.navigate("Detail", { item: item })}
              >
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
