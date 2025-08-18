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
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
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
        onConfirm={(startDate, endDate) => {
          setStartDate(startDate);
          setEndDate(endDate);
          console.log(startDate, endDate);
        }}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={
            startDate && endDate
              ? data.filter((item) => {
                  const entryDate = item.entry_time.split(" ")[0];
                  const formattedStartDate = startDate.replace(/\//g, "-");
                  const formattedEndDate = endDate.replace(/\//g, "-");
                  return (
                    entryDate >= formattedStartDate &&
                    entryDate <= formattedEndDate
                  );
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
                  <Text style={styles.label}>Telefon:</Text>
                  <Text style={styles.value}>{item.phone}</Text>
                </View>
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
