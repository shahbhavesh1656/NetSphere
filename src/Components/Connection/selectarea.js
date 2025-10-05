import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectArea = ({ navigation }) => {
  const [check, setCheck] = useState("");
  const user = useSelector((state) => state.customer.value);
  const dispatch = useDispatch();

  const areas = ["PATHARLI", "RAM NAGAR", "PENDSE NAGAR", "TILAK NAGAR", "GOPAL NAGAR"];

  const handleSubmit = () => {
    if (!check) {
      alert("Please select an area");
      return;
    }
    dispatch(
      getBookedConnectionData({
        ...user,
        area: check,
        connection_name: "",
        connection_mode: "",
        plan_name: "",
        subscription: "",
        payment_status: "",
        connection_status: "",
      })
    );
    navigation.navigate("SelectConnection");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw" }}
              style={styles.logo}
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Choose Service Area</Text>
            <Text style={styles.subtitle}>Select your location for installation</Text>
          </View>

          <View style={styles.areaContainer}>
            {areas.map((area, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.areaOption, check === area && styles.selectedArea]}
                onPress={() => setCheck(area)}
              >
                <RadioButton
                  value={area}
                  status={check === area ? "checked" : "unchecked"}
                  onPress={() => setCheck(area)}
                  color="#3B82F6"
                />
                <Text style={[styles.areaText, check === area && styles.selectedAreaText]}>{area}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={[styles.nextButton, !check && styles.disabledButton]} onPress={handleSubmit} disabled={!check}>
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 28, marginVertical: 20, shadowColor: "#1E293B", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  logoContainer: { alignItems: "center", marginBottom: 24 },
  logo: { width: 100, height: 100, resizeMode: "contain" },
  headerContainer: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 28, fontWeight: "700", color: "#1E293B", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#64748B", textAlign: "center" },
  areaContainer: { gap: 16, marginBottom: 32 },
  areaOption: { flexDirection: "row", alignItems: "center", padding: 20, borderRadius: 16, borderWidth: 2, borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" },
  selectedArea: { borderColor: "#3B82F6", backgroundColor: "#EFF6FF" },
  areaText: { fontSize: 18, color: "#64748B", marginLeft: 12 },
  selectedAreaText: { color: "#1E293B", fontWeight: "600" },
  nextButton: { height: 60, backgroundColor: "#3B82F6", borderRadius: 16, justifyContent: "center", alignItems: "center", shadowColor: "#3B82F6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  disabledButton: { backgroundColor: "#94A3B8", shadowOpacity: 0.1 },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default SelectArea;
