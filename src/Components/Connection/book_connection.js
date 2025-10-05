import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DB_NAME } from "../../config";
import { openDatabase } from "react-native-sqlite-storage";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

let db = openDatabase({ name: DB_NAME });

const Bookconnection = ({ navigation }) => {
  const [setupbox, setSetupBox] = useState("");
  const [plan, setPlan] = useState("");
  const [userPackage, setUserPackage] = useState("");
  const dispatch = useDispatch();

  const connectionDetails = useSelector((state) => state.bookconnection.value);
  const customer = useSelector((state) => state.customer.value);

  const packages = {
    "CABLE CONNECTION": [
      { label: "Package-1", value: "Package-1", amount: 400 },
      { label: "Package-2", value: "Package-2", amount: 350 },
      { label: "Package-3", value: "Package-3", amount: 300 },
      { label: "Package-4", value: "Package-4", amount: 250 },
    ],
    "WIFI CONNECTION": [
      { label: "50 Mbps", value: "50 Mbps", amount: 399 },
      { label: "100 Mbps", value: "100 Mbps", amount: 599 },
      { label: "300 Mbps", value: "300 Mbps", amount: 999 },
      { label: "500 Mbps", value: "500 Mbps", amount: 1499 },
    ],
  };

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS table_connections(
          cus_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(20),
          email VARCHAR(50),
          address VARCHAR(100),
          area VARCHAR(50),
          mobile VARCHAR(12),
          connection_name VARCHAR(50),
          connection_mode VARCHAR(50),
          planname VARCHAR(50),
          subscription VARCHAR(50),
          package VARCHAR(50),
          amount VARCHAR(10),
          payment_status VARCHAR(50),
          connection_status VARCHAR(50)
        )`,
        []
      );
    });
  }, []);

  const handlePayment = () => {
    if (!setupbox || !plan || !userPackage) {
      Alert.alert("Error", "Please select setup box, plan, and package");
      return;
    }

    let selectedPackage = packages[connectionDetails.connection_name]?.find((p) => p.value === userPackage);
    let totalAmount = selectedPackage ? selectedPackage.amount : 0;

    dispatch(getBookedConnectionData({
      ...customer,
      area: connectionDetails.area,
      connection_name: connectionDetails.connection_name,
      connection_mode: connectionDetails.connection_mode,
      plan_name: setupbox,
      subscription: plan,
      package: userPackage,
      amount: totalAmount,
      payment_status: "paid",
      connection_status: "pending"
    }));

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO table_connections (name,email,address,area,mobile,connection_name,connection_mode,planname,subscription,package,amount,payment_status,connection_status)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [customer.name, customer.email, customer.address, connectionDetails.area, customer.mobile, connectionDetails.connection_name, connectionDetails.connection_mode, setupbox, plan, userPackage, totalAmount, "paid", "pending"],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Payment Successful",
              `You have successfully paid ₹${totalAmount}`,
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("PaymentSummary", { customer, packageDetails: { title: userPackage, price: totalAmount, plan_name: setupbox, subscription: plan } })
                }
              ]
            );
          } else {
            Alert.alert("Error", "Failed to save booking");
          }
        },
        (error) => console.log(error)
      );
    });
  };

  const renderPicker = (selectedValue, onValueChange, items, placeholder) => (
    <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
        <Picker.Item label={placeholder} value="" color="#94A3B8" />
        {items.map((item, idx) => (
          <Picker.Item key={idx} label={item.label} value={item.value} color="#1E293B" />
        ))}
      </Picker>
    </View>
  );

  const getSetupBoxItems = () =>
    connectionDetails.connection_name === "CABLE CONNECTION"
      ? [{ label: "HD setup box", value: "HD setup box" }, { label: "Jio setup box", value: "Jio setup box" }, { label: "Den setup box", value: "Den setup box" }]
      : [{ label: "JioFi M2S Router", value: "JioFi M2S Router" }, { label: "Xiaomi Mi Router", value: "Xiaomi Mi Router" }, { label: "Tenda F3 Router", value: "Tenda F3 Router" }, { label: "Mercusys Router", value: "Mercusys Router" }, { label: "D Link Router", value: "D Link Router" }];

  const getPlanItems = () =>
    connectionDetails.connection_name === "CABLE CONNECTION"
      ? [{ label: "10 days", value: "10" }, { label: "20 days", value: "20" }, { label: "30 days", value: "30" }]
      : [{ label: "1 month", value: "30" }, { label: "6 months", value: "180" }];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw" }} style={styles.logo} />
            <Text style={styles.title}>NetSphere</Text>
          </View>

          <Text style={styles.subtitle}>{connectionDetails.connection_name === "CABLE CONNECTION" ? "Select cable TV package" : "Select internet package"}</Text>

          <Text style={styles.inputLabel}>{connectionDetails.connection_name === "CABLE CONNECTION" ? "Setup Box" : "WiFi Router"}</Text>
          {renderPicker(setupbox, setSetupBox, getSetupBoxItems(), "Pick Setup Box")}

          <Text style={styles.inputLabel}>Plan Duration</Text>
          {renderPicker(plan, setPlan, getPlanItems(), "Pick Duration")}

          <Text style={styles.inputLabel}>{connectionDetails.connection_name === "CABLE CONNECTION" ? "Channel Package" : "Speed Package"}</Text>
          {renderPicker(userPackage, setUserPackage, packages[connectionDetails.connection_name], "Pick Package")}

          <TouchableOpacity
            style={[styles.bookButton, (!setupbox || !plan || !userPackage) && styles.disabledButton]}
            onPress={handlePayment}
            disabled={!setupbox || !plan || !userPackage}
          >
            <Text style={styles.bookButtonText}>Pay & Book</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 28, shadowColor: "#1E293B", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "700", color: "#1E293B" },
  subtitle: { fontSize: 16, color: "#64748B", textAlign: "center", marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: "600", color: "#1E293B", marginBottom: 8 },
  pickerContainer: { backgroundColor: "#F8FAFC", borderWidth: 2, borderColor: "#E2E8F0", borderRadius: 16, overflow: "hidden", marginBottom: 16 },
  picker: { height: 60, color: "#1E293B" },
  bookButton: { height: 56, backgroundColor: "#3B82F6", borderRadius: 16, justifyContent: "center", alignItems: "center", marginTop: 12 },
  disabledButton: { backgroundColor: "#94A3B8" },
  bookButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default Bookconnection;
