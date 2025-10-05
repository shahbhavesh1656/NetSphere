import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const ViewAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM table_attendance",
        [],
        (tx, res) => {
          let list = [];
          for (let i = 0; i < res.rows.length; i++) {
            list.push(res.rows.item(i));
          }
          setAttendanceList(list);
        },
        (error) => console.log(error)
      );
    });
  };

  const renderItem = ({ item }) => {
    const isPresent = item.status.toLowerCase() === "present";

    return (
      <View style={styles.attendanceCard}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{item.date}</Text>
          <View
            style={[
              styles.attendanceStatus,
              isPresent ? styles.presentStatus : styles.absentStatus,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isPresent ? styles.presentText : styles.absentText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.employeeDetails}>
          <Text style={styles.detailValue}>Name: {item.name}</Text>
          <Text style={styles.detailValue}>Area: {item.area}</Text>
          <Text style={styles.detailValue}>Email: {item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={attendanceList}
        keyExtractor={(item) => item.emp_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  attendanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  attendanceStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  presentStatus: { backgroundColor: "#D1FAE5" },
  absentStatus: { backgroundColor: "#FEE2E2" },
  statusText: { fontSize: 12, fontWeight: "600" },
  presentText: { color: "#065F46" },
  absentText: { color: "#DC2626" },
  employeeDetails: { gap: 6 },
  detailValue: { fontSize: 14, color: "#1E293B" },
});

export default ViewAttendance;
