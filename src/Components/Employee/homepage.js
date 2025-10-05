import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const EmployeeHomePage = ({ navigation }) => {
  const employee = useSelector(state => state.employee.value);

  const menuItems = [
    {
      title: "Subscription Management",
      subtitle: "View and manage customer subscriptions",
      icon: "📊",
      onPress: () => navigation.navigate("ViewEmployeeSubscription"),
    },
    {
      title: "Customer Grievances",
      subtitle: "Handle customer complaints and issues",
      icon: "🎯",
      onPress: () => navigation.navigate("ViewComplaints"),
    },
    {
      title: "Add Attendance",
      subtitle: "Mark your daily attendance",
      icon: "✅",
      onPress: () => navigation.navigate("Addattendance"),
    },
    {
      title: "View Attendance",
      subtitle: "Check your attendance history",
      icon: "📅",
      onPress: () => navigation.navigate("Viewattendance"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw",
            }}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.nameText}>{employee?.name || "Employee"}</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Staff Member</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.replace("Home")}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 12,
  },
  badgeContainer: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  badgeText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  menuContainer: {
    padding: 20,
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: "#64748B",
  },
  menuArrow: {
    fontSize: 28,
    color: "#CBD5E1",
  },
  logoutContainer: {
    padding: 20,
    alignItems: "center",
  },
  logoutButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EmployeeHomePage;