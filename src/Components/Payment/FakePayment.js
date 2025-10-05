import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from "react-native";

const FakePayment = ({ navigation, route }) => {
  const { customer, packageDetails } = route.params || {};
  const [loading, setLoading] = useState(false);

  if (!customer || !packageDetails) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Payment data not available</Text>
      </SafeAreaView>
    );
  }

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      Alert.alert(
        "Payment Successful",
        `You have successfully paid ₹${packageDetails.price} for ${packageDetails.title}`,
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("PaymentSummary", {
                customer,
                packageDetails,
              }),
          },
        ],
        { cancelable: false }
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.gatewayTitle}>💳 Fake Payment Gateway</Text>

        <View style={styles.paymentBox}>
          <Text style={styles.label}>Plan</Text>
          <Text style={styles.value}>{packageDetails.title}</Text>

          <Text style={styles.label}>Amount</Text>
          <Text style={[styles.value, { fontSize: 22, color: "#16a34a" }]}>
            ₹{packageDetails.price}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <TouchableOpacity onPress={handlePayment} activeOpacity={0.8} style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EFF6FF" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 24,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
  },
  gatewayTitle: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 20, color: "#1E293B" },
  paymentBox: { marginBottom: 30 },
  label: { fontSize: 14, color: "#64748B", marginTop: 10 },
  value: { fontSize: 18, fontWeight: "600", color: "#1E293B" },
  payButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
  },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  errorText: { fontSize: 18, color: "red" },
});

export default FakePayment;
