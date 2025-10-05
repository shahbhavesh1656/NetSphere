import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const PackageDetails = ({ navigation, route }) => {
  const id = route.params?.id || ""; // package ID from navigation
  const customer = useSelector(state => state.customer.value); // logged-in customer

  // All available packages with detailed info
  const packages = {
    w1: {
      title: "Ultra Speed 500Mbps",
      price: 1499,
      description: "High-speed Wi-Fi with unlimited data and Wi-Fi 6 router for uninterrupted streaming and work from home.",
      features: ["Unlimited Data", "Wi-Fi 6 Router", "24/7 Customer Support", "No Data Throttling", "Secure Connection"],
      recommendedFor: "Large families, heavy streaming, gamers, and remote workers."
    },
    w2: {
      title: "Super Speed 300Mbps",
      price: 999,
      description: "Reliable Wi-Fi with unlimited data suitable for regular home usage including streaming and browsing.",
      features: ["Unlimited Data", "Standard Router", "24/7 Support", "Multiple Device Connection"],
      recommendedFor: "Small families or apartments with multiple devices."
    },
    w3: {
      title: "Basic 100Mbps",
      price: 599,
      description: "Affordable Wi-Fi plan with enough speed for standard browsing and streaming.",
      features: ["Unlimited Data", "Standard Router", "Basic Support"],
      recommendedFor: "Individuals or small households with light internet usage."
    },
    w4: {
      title: "Starter 50Mbps",
      price: 399,
      description: "Budget Wi-Fi plan suitable for light browsing and social media.",
      features: ["500GB Monthly", "Basic Router"],
      recommendedFor: "Students or light internet users."
    },
    c1: {
      title: "Cable Package 1",
      price: 799,
      description: "Entry-level cable TV plan with 100+ Indian TV channels.",
      features: ["HD Channels", "Regional Channels", "Movie Pack"],
      recommendedFor: "Families who enjoy general entertainment and news channels."
    },
    c2: {
      title: "Cable Package 2",
      price: 999,
      description: "Mid-tier cable TV plan with 150+ channels including sports and entertainment.",
      features: ["HD & SD Channels", "Regional Channels", "Sports Pack"],
      recommendedFor: "Sports enthusiasts and regular TV watchers."
    },
    c3: {
      title: "Cable Package 3",
      price: 1299,
      description: "Premium cable plan with 200+ HD/SD/4K channels including special packs.",
      features: ["HD/SD/4K Channels", "All Regions", "Premium Movie Pack"],
      recommendedFor: "Families who want extensive entertainment options."
    },
    c4: {
      title: "Cable Package 4",
      price: 1499,
      description: "Ultimate cable plan with 250+ channels including HD/4K and special packs for movies, kids, and sports.",
      features: ["HD/4K Channels", "Regional & National", "Movie Pack", "Kids Pack", "Sports Pack"],
      recommendedFor: "Premium users looking for the best variety and quality."
    },
  };

  const selectedPackage = packages[id];

  if (!selectedPackage) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Package not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw" }} 
            style={styles.logo} 
          />
          <Text style={styles.title}>{selectedPackage.title}</Text>
          <Text style={styles.price}>₹{selectedPackage.price} / month</Text>
          <Text style={styles.description}>{selectedPackage.description}</Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {selectedPackage.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Text style={styles.featureDot}>•</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Recommended Usage */}
        {selectedPackage.recommendedFor && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended For</Text>
            <Text style={styles.recommendedText}>{selectedPackage.recommendedFor}</Text>
          </View>
        )}

        {/* Why Choose This Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose This Plan?</Text>
          <Text style={styles.infoText}>
            {id.startsWith('w')
              ? "Ideal for seamless internet experience. Stream videos, attend meetings, and work from home without interruptions."
              : "Provides premium TV entertainment with HD/4K channels and special packs for movies, sports, and kids."}
          </Text>
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <Text style={styles.infoText}>
            - Installation charges may apply.{"\n"}
            - 24/7 customer support available for all plans.{"\n"}
            - Offers and discounts valid for limited time.{"\n"}
            - Plans are renewable monthly or annually.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { 
    backgroundColor: "#FFFFFF", 
    padding: 24, 
    alignItems: "center", 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    shadowColor: "#1E293B", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 5 
  },
  logo: { width: 100, height: 100, marginBottom: 16, resizeMode: "contain" },
  title: { fontSize: 28, fontWeight: "700", color: "#1E293B", marginBottom: 8, textAlign: "center" },
  price: { fontSize: 32, fontWeight: "700", color: "#3B82F6", marginBottom: 12, textAlign: "center" },
  description: { fontSize: 16, color: "#64748B", textAlign: "center", lineHeight: 24 },
  section: { padding: 20, marginTop: 20, backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E2E8F0" },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#1E293B" },
  featureItem: { flexDirection: "row", marginBottom: 8 },
  featureDot: { fontSize: 18, color: "#3B82F6", marginRight: 8 },
  featureText: { fontSize: 16, color: "#1E293B", flex: 1 },
  recommendedText: { fontSize: 16, color: "#475569", lineHeight: 22 },
  infoText: { fontSize: 16, color: "#64748B", lineHeight: 22 },
  errorText: { fontSize: 18, color: "#EF4444", textAlign: "center", marginTop: 50 },
});

export default PackageDetails;
