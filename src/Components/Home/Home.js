import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { RadioButton } from "react-native-paper";

const Home = ({ navigation }) => {
  const [check, setcheck] = useState("");

  const handleSubmit = () => {
    if (check === "customer") {
      navigation.navigate("CustomerSignup");
    } else if (check === "employee") {
      navigation.navigate("EmployeeSignup");
    } else if (check === "operator") {
      navigation.navigate("OperatorSignup");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw", // Direct image URL
            }}
            style={styles.logo}
          />
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome to NetSphere</Text>
          <Text style={styles.subtitle}>Choose your role to get started</Text>
        </View>

        {/* Role Selection */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleOption, check === "customer" && styles.selectedRole]}
            onPress={() => setcheck("customer")}
          >
            <RadioButton
              value="customer"
              status={check === "customer" ? "checked" : "unchecked"}
              onPress={() => setcheck("customer")}
              color="#3B82F6"
            />
            <Text style={[styles.roleText, check === "customer" && styles.selectedRoleText]}>
              CUSTOMER
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleOption, check === "employee" && styles.selectedRole]}
            onPress={() => setcheck("employee")}
          >
            <RadioButton
              value="employee"
              status={check === "employee" ? "checked" : "unchecked"}
              onPress={() => setcheck("employee")}
              color="#3B82F6"
            />
            <Text style={[styles.roleText, check === "employee" && styles.selectedRoleText]}>
              EMPLOYEE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleOption, check === "operator" && styles.selectedRole]}
            onPress={() => setcheck("operator")}
          >
            <RadioButton
              value="operator"
              status={check === "operator" ? "checked" : "unchecked"}
              onPress={() => setcheck("operator")}
              color="#3B82F6"
            />
            <Text style={[styles.roleText, check === "operator" && styles.selectedRoleText]}>
              OPERATOR
            </Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextButton, !check && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!check}
        >
          <Text style={styles.nextButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#64748B",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  roleContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  selectedRole: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  roleText: {
    fontSize: 18,
    color: "#64748B",
    fontFamily: "Poppins-Medium",
    marginLeft: 12,
  },
  selectedRoleText: {
    color: "#1E293B",
    fontWeight: "600",
  },
  nextButton: {
    height: 60,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0.1,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.5,
  },
});

export default Home;