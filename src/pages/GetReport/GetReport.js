import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Alert,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const GetReport = ({ navigation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  const createPDF = async () => {
    try {
      if (data.length === 0) {
        Alert.alert("Uyarı", "Önce tarih seçerek veri yükleyin!");
        return;
      }

     
      let csvContent = "Ad Soyad,TC Kimlik No,Telefon,Plaka,Görüsecegi Kisi,Amac,Giris Saati,Onaylayan\n";
      
      data.forEach(item => {
        const name = item.name || "";
        const tcNo = item.tc_no || "";
        const phone = item.phone || "";
        const plate = item.plate || "";
        const person = item.person_to_visit || "";
        const purpose = item.purpose || "";
        const entryTime = item.entry_time ? new Date(item.entry_time).toLocaleString("tr-TR") : "";
        const approver = item.approved_by_user || "Belirtilmemiş";
        
        csvContent += `"${name}","${tcNo}","${phone}","${plate}","${person}","${purpose}","${entryTime}","${approver}"\n`;
      });

      const startDateStr = startDate.toLocaleDateString("tr-TR").replace(/\./g, "_");
      const endDateStr = endDate.toLocaleDateString("tr-TR").replace(/\./g, "_");
      const fileName = `ZiyaretciRaporu_${startDateStr}_${endDateStr}.csv`;
      
      const fileUri = FileSystem.documentDirectory + fileName;
      
      console.log("Rapor oluşturuluyor...", fileName);
      
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log("Rapor başarıyla oluşturuldu:", fileUri);

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/csv',
          dialogTitle: 'Ziyaretçi Raporunu Paylaş',
        });
      } else {
        Alert.alert(
          "Başarılı!", 
          `CSV raporu oluşturuldu!\nDosya: ${fileName}\nToplam ${data.length} kayıt\n\nDosya yolu: ${fileUri}`
        );
      }
      
    } catch (error) {
      console.error("Rapor oluşturma hatası:", error);
      Alert.alert("Hata", `Rapor oluşturma hatası: ${error.message}`);
    }
  };

  
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
        if (json.success) {
          setData(json.data);
        } else {
          alert("Hata: " + json.message);
        }
      }
    } catch (error) {
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

      <TouchableOpacity style={styles.button} onPress={createPDF}>
        <Text style={styles.buttonText}>Rapor İndir</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.visit_id.toString()}
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
    backgroundColor: "#f8f9fa",
    paddingBottom: 70,
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
  instructionContainer: {
    marginBottom: 25,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  instructionText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 22,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 15,
  },
  dateButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dee2e6",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#170242ff",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#495057",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#170242ff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    minWidth: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    color: "#495057",
    fontWeight: "500",
    lineHeight: 20,
  },
  reportContainer: {
    flex: 1,
  },
});

