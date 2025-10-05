import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";

const PaymentSummary = ({ route, navigation }) => {
  const { customer, packageDetails } = route.params || {};

  if (!customer || !packageDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Payment details not available</Text>
      </SafeAreaView>
    );
  }

  const handleDownloadReceipt = () => {
    Alert.alert(
      "Receipt Downloaded",
      `Receipt for ₹${packageDetails.price} - ${packageDetails.title} has been downloaded successfully.`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>✅ Payment Successful</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{customer.name}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{customer.email}</Text>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{customer.phone}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Plan Details</Text>
          <Text style={styles.label}>Selected Plan</Text>
          <Text style={styles.value}>{packageDetails.title}</Text>
          <Text style={styles.label}>Amount</Text>
          <Text style={[styles.value, { color: "#16a34a", fontSize: 20 }]}>
            ₹{packageDetails.price}
          </Text>
        </View>

        {/* Download Receipt Button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: "#10B981" }]} onPress={handleDownloadReceipt}>
          <Text style={styles.buttonText}>Download Receipt</Text>
        </TouchableOpacity>

        {/* Done Button → Redirects Home */}
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
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#16a34a" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#1E293B" },
  label: { fontSize: 14, color: "#64748B", marginTop: 8 },
  value: { fontSize: 16, fontWeight: "500", color: "#1E293B" },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});

export default PaymentSummary;
