import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

const SelectConnection = ({ navigation }) => {
  const user = useSelector((state) => state.customer.value);
  const connData = useSelector((state) => state.bookconnection.value);
  const [check, setCheck] = useState("");
  const dispatch = useDispatch();

  const connections = [
    { value: "CABLE CONNECTION", title: "Cable Connection", subtitle: "Digital TV with premium channels", icon: "📺", features: ["HD Channels", "Multiple Packages", "Set-top Box Included"] },
    { value: "WIFI CONNECTION", title: "WiFi Connection", subtitle: "High-speed internet connectivity", icon: "📶", features: ["High Speed Internet", "Multiple Devices", "Router Included"] },
  ];

  const handleSubmit = () => {
    if (!check) {
      alert("Please select a connection type");
      return;
    }
    dispatch(getBookedConnectionData({ ...user, area: connData.area, connection_name: check }));
    navigation.navigate("SelectConnectionMode");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw" }} style={styles.logo} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Choose Connection Type</Text>
          <Text style={styles.subtitle}>Select the service you want to subscribe to</Text>
        </View>

        {connections.map((conn, idx) => (
          <TouchableOpacity key={idx} style={[styles.optionCard, check === conn.value && styles.selectedOption]} onPress={() => setCheck(conn.value)}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>{conn.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.optionTitle, check === conn.value && styles.selectedText]}>{conn.title}</Text>
                <Text style={styles.optionSubtitle}>{conn.subtitle}</Text>
              </View>
              <RadioButton value={conn.value} status={check === conn.value ? "checked" : "unchecked"} onPress={() => setCheck(conn.value)} color="#3B82F6" />
            </View>
            {conn.features.map((f, i) => (
              <Text key={i} style={[styles.featureText, check === conn.value && styles.selectedText]}>• {f}</Text>
            ))}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={[styles.continueButton, !check && styles.disabledButton]} onPress={handleSubmit} disabled={!check}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 28, shadowColor: "#1E293B", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10, borderWidth: 1,
  borderColor: "#E2E8F0" },
  logoContainer: { alignItems: "center", marginBottom: 24 },
  logo: { width: 100, height: 100, resizeMode: "contain" },
  headerContainer: { alignItems: "center", marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "700", color: "#1E293B", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#64748B", textAlign: "center", marginBottom: 20 },
  optionCard: { borderWidth: 2, borderColor: "#E2E8F0", borderRadius: 20, padding: 20, marginBottom: 16, backgroundColor: "#F8FAFC" },
  selectedOption: { borderColor: "#3B82F6", backgroundColor: "#EFF6FF" },
  optionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  optionIcon: { fontSize: 24, marginRight: 12 },
  optionTitle: { fontSize: 18, fontWeight: "600", color: "#64748B" },
  optionSubtitle: { fontSize: 14, color: "#64748B" },
  featureText: { marginLeft: 30, fontSize: 14, color: "#64748B" },
  selectedText: { color: "#1E293B", fontWeight: "600" },
  continueButton: { height: 56, backgroundColor: "#3B82F6", borderRadius: 16, justifyContent: "center", alignItems: "center", marginTop: 12 },
  disabledButton: { backgroundColor: "#94A3B8" },
  continueButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default SelectConnection;
