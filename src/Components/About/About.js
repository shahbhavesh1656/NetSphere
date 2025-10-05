import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const AboutUs = ({ navigation }) => {
  const operator = useSelector(state => state.operator.value); // Logged-in operator info

  const packages = [
    // Wi-Fi Packages
    { id: "w1", title: "Ultra Speed 500Mbps", price: "1499", features: "Unlimited Data + Wi-Fi 6 Router" },
    { id: "w2", title: "Super Speed 300Mbps", price: "999", features: "Unlimited Data + Standard Router" },
    { id: "w3", title: "Basic 100Mbps", price: "599", features: "Unlimited Data + Standard Router" },
    { id: "w4", title: "Starter 50Mbps", price: "399", features: "500GB Monthly + Basic Router" },
    // Cable Packages
    { id: "c1", title: "Cable Package 1", price: "799", features: "100+ Indian TV Channels" },
    { id: "c2", title: "Cable Package 2", price: "999", features: "150+ Indian TV Channels" },
    { id: "c3", title: "Cable Package 3", price: "1299", features: "200+ Channels HD/SD/4K" },
    { id: "c4", title: "Cable Package 4", price: "1499", features: "250+ Channels HD/4K + Special Packs" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: operator?.logo || "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw" }}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>{operator?.name || "Operator Name"}</Text>
          <Text style={styles.headerSubtitle}>{operator?.description || "Your trusted connectivity partner"}</Text>
        </View>

        {/* Packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Packages</Text>
          <View style={styles.packagesContainer}>
            {packages.map((pkg, index) => (
              <TouchableOpacity
                key={pkg.id}
                style={[styles.packageCard, index === packages.length - 1 && styles.lastPackageCard]}
                onPress={() => navigation.navigate("PackageDetails", { id: pkg.id })}
              >
                <Text style={styles.packageTitle}>{pkg.title}</Text>
                <Text style={styles.packagePrice}>₹{pkg.price}</Text>
                <Text style={styles.packageFeatures}>{pkg.features}</Text>
                <View style={styles.packageTagsContainer}>
                  <Text style={styles.packageTag}>{pkg.id.startsWith('w') ? 'Wi-Fi' : 'Cable'}</Text>
                  <Text style={styles.priceTag}>Starting from</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Operator Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operator Details</Text>
          <View style={styles.officeCard}>
            <View style={styles.officeItem}>
              <Text style={styles.officeLabel}>Owner Name</Text>
              <Text style={styles.officeValue}>{operator?.owner || "Owner Name"}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.officeItem}>
              <Text style={styles.officeLabel}>Office Name</Text>
              <Text style={styles.officeValue}>{operator?.officeName || "Operator Office"}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.officeItem}>
              <Text style={styles.officeLabel}>Address</Text>
              <Text style={styles.officeValue}>{operator?.address || "Operator Address"}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.officeItem}>
              <Text style={styles.officeLabel}>Contact Number</Text>
              <TouchableOpacity>
                <Text style={[styles.officeValue, styles.phoneNumber]}>{operator?.phone || "+91 XXXXX XXXXX"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { backgroundColor: "#FFFFFF", padding: 20, alignItems: "center", borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: "#1E293B", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: "700", color: "#1E293B", marginBottom: 8, textAlign: "center" },
  headerSubtitle: { fontSize: 16, color: "#64748B", textAlign: "center" },
  section: { paddingHorizontal: 20, paddingTop: 32 },
  sectionTitle: { fontSize: 24, fontWeight: "700", color: "#1E293B", marginBottom: 20, textAlign: "center" },
  packagesContainer: { gap: 16 },
  packageCard: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: "#E2E8F0",
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative"
  },
  lastPackageCard: { marginBottom: 0 },
  packageTitle: { fontSize: 20, fontWeight: "600", color: "#1E293B", marginBottom: 8 },
  packagePrice: { fontSize: 28, fontWeight: "700", color: "#3B82F6", marginBottom: 12 },
  packageFeatures: { fontSize: 14, color: "#64748B", lineHeight: 20, marginBottom: 16 },
  packageTagsContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  packageTag: { backgroundColor: "#F1F5F9", color: "#475569", fontSize: 12, fontWeight: "600", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  priceTag: { fontSize: 12, color: "#94A3B8", fontStyle: "italic" },
  officeCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 32 },
  officeItem: { paddingVertical: 16 },
  officeLabel: { fontSize: 14, color: "#64748B", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  officeValue: { fontSize: 18, color: "#1E293B", lineHeight: 24 },
  phoneNumber: { color: "#3B82F6", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#E2E8F0" },
});

export default AboutUs;
