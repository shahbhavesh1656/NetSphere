import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentReceipt = ({ route, navigation }) => {
  const { customer, packageDetails } = route.params || {};

  if (!customer || !packageDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Payment details not available</Text>
      </SafeAreaView>
    );
  }

  const transactionId = `#TXN${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString();

  const handleDownloadReceipt = () => {
    Alert.alert(
      "📄 Receipt Downloaded",
      `Receipt for ${packageDetails.title} (₹${packageDetails.price}) has been saved successfully.`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>✅ Payment Successful</Text>

        <View style={styles.successCard}>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.value}>{customer.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{customer.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{customer.mobile}</Text>

          <Text style={styles.label}>Plan</Text>
          <Text style={styles.value}>{packageDetails.title}</Text>

          <Text style={styles.label}>Amount Paid</Text>
          <Text style={[styles.value, { color: "#10B981", fontSize: 20 }]}>
            ₹{packageDetails.price}
          </Text>

          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{transactionId}</Text>

          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{currentDate}</Text>
        </View>

        {/* Download Receipt */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#10B981" }]}
          onPress={handleDownloadReceipt}
        >
          <Text style={styles.buttonText}>Download Receipt</Text>
        </TouchableOpacity>

        {/* Done Button → Go Home */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3B82F6", marginTop: 12 }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 24, textAlign: "center", color: "#16a34a" },
  successCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderLeftWidth: 5,
    borderLeftColor: "#10B981",
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: { fontSize: 14, color: "#64748B", marginTop: 16, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  value: { fontSize: 18, fontWeight: "600", color: "#1E293B", marginBottom: 8 },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },
  errorText: { fontSize: 18, color: "#EF4444", textAlign: "center", marginTop: 50 },
});

export default PaymentReceipt;
