import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

const SelectConnectionMode = ({ navigation }) => {
  const user = useSelector((state) => state.customer.value);
  const connData = useSelector((state) => state.bookconnection.value);
  const [check, setCheck] = useState("");
  const dispatch = useDispatch();

  const connectionModes = [
    { value: "NEW CONNECTION", title: "New Connection", subtitle: "Get a fresh installation at your location", icon: "✨", description: "Complete setup with new equipment and installation" },
    { value: "EXISTING CONNECTION", title: "Existing Connection", subtitle: "Upgrade or modify your current service", icon: "🔄", description: "Modify your existing plan or equipment" },
    { value: "CONNECTION REMOVAL", title: "Connection Removal", subtitle: "Disconnect your current service", icon: "❌", description: "Terminate service and equipment removal" },
  ];

  const handleSubmit = () => {
    if (!check) { alert("Please select a connection mode"); return; }
    dispatch(getBookedConnectionData({ ...user, area: connData.area, connection_name: connData.connection_name, connection_mode: check }));
    navigation.navigate("BookConnection");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw" }} style={styles.logo} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Connection Mode</Text>
          <Text style={styles.subtitle}>Choose how you want to proceed with your {connData.connection_name?.toLowerCase()}</Text>
        </View>

        {connectionModes.map((mode, idx) => (
          <TouchableOpacity key={idx} style={[styles.optionCard, check === mode.value && styles.selectedOption]} onPress={() => setCheck(mode.value)}>
            <View style={styles.optionHeader}>
              <View style={[styles.iconContainer, check === mode.value && styles.selectedIcon]}>
                <Text style={styles.optionIcon}>{mode.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.optionTitle, check === mode.value && styles.selectedText]}>{mode.title}</Text>
                <Text style={styles.optionSubtitle}>{mode.subtitle}</Text>
              </View>
              <RadioButton value={mode.value} status={check === mode.value ? "checked" : "unchecked"} onPress={() => setCheck(mode.value)} color="#3B82F6" />
            </View>
            <Text style={[styles.descriptionText, check === mode.value && styles.selectedText]}>{mode.description}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={[styles.continueButton, !check && styles.disabledButton]} onPress={handleSubmit} disabled={!check}>
          <Text style={styles.continueButtonText}>{check === "CONNECTION REMOVAL" ? "Proceed to Removal" : "Continue to Plans"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 28, shadowColor: "#1E293B", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  logoContainer: { alignItems: "center", marginBottom: 24 },
  logo: { width: 100, height: 100, resizeMode: "contain" },
  headerContainer: { alignItems: "center", marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "700", color: "#1E293B", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#64748B", textAlign: "center", marginBottom: 20 },
  optionCard: { borderWidth: 2, borderColor: "#E2E8F0", borderRadius: 20, padding: 20, marginBottom: 16, backgroundColor: "#F8FAFC" },
  selectedOption: { borderColor: "#3B82F6", backgroundColor: "#EFF6FF" },
  optionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  iconContainer: { width: 50, height: 50, borderRadius: 16, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", marginRight: 16, elevation: 2 },
  selectedIcon: { backgroundColor: "#EFF6FF", borderWidth: 1, borderColor: "#3B82F6" },
  optionIcon: { fontSize: 24 },
  optionTitle: { fontSize: 18, fontWeight: "600", color: "#64748B" },
  optionSubtitle: { fontSize: 14, color: "#64748B" },
  descriptionText: { paddingLeft: 66, fontSize: 14, color: "#64748B", fontStyle: "italic" },
  selectedText: { color: "#1E293B", fontWeight: "600" },
  continueButton: { height: 56, backgroundColor: "#3B82F6", borderRadius: 16, justifyContent: "center", alignItems: "center", marginTop: 12 },
  disabledButton: { backgroundColor: "#94A3B8" },
  continueButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default SelectConnectionMode;
