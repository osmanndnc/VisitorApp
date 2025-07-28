import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const GetReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  const getReportData = async () => {
    try {
      if (startDate && endDate) {
        const response = await fetch(
          "http://10.90.200.53/VISITORSYSTEM/getReport.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ startDate, endDate }),
          }
        );
        const json = await response.json();
        console.log("API Response:", json);
        if (json.success) {
          setData(json.data);
        } else {
          alert("Hata: " + json.message);
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Hata: " + error.message);
    }
  };

  const showStartDateTimePicker = () => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: (event, selcetedData) => {
        if (selcetedData) {
          setStartDate(selcetedData);
          getReportData();
        }
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const showEndDateTimePicker = () => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: (event, selcetedData) => {
        if (selcetedData) {
          setEndDate(selcetedData);
          getReportData();
        }
      },
      mode: "date",
      is24Hour: true,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Rapor Al</Text>
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Lütfen Rapor Almak İstediğiniz Tarihi Seçiniz
        </Text>
      </View>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={showStartDateTimePicker}
        >
          <Text style={styles.dateLabel}>Başlangıç Tarihi</Text>
          <Text style={styles.dateText}>
            {startDate.toLocaleDateString("tr-TR")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={showEndDateTimePicker}
        >
          <Text style={styles.dateLabel}>Bitiş Tarihi</Text>
          <Text style={styles.dateText}>
            {endDate.toLocaleDateString("tr-TR")}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.visit_id.toString()}
        showsVerticalScrollIndicator={false}
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
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Görüşeceği Kişi:</Text>
                <Text style={styles.value}>{item.person_to_visit}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Amaç:</Text>
                <Text style={styles.value}>{item.purpose}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Giriş Saati:</Text>
                <Text style={styles.value}>
                  {new Date(item.entry_time).toLocaleString("tr-TR")}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Onaylayan:</Text>
                <Text style={styles.value}>
                  {item.approved_by_user || "Belirtilmemiş"}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.reportContainer}></View>
    </View>
  );
};

export default GetReport;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#170242ff",
  },
  instructionContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  dateButton: {
    flex: 0.48,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  reportContainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    flex: 0.48,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});
