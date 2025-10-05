// viewcomplaints.js - FIXED: Now properly shows assigned complaints
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
import { useSelector } from "react-redux";

let db = openDatabase({ name: DB_NAME });

const Viewallgreviances = ({ navigation }) => {
  const [greviancelist, setgreviancelist] = useState([]);
  const user = useSelector((state) => state.employee.value);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    getData();
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_complaints WHERE status LIKE ?",
        [`%${user.name}%`],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            menus.push(res.rows.item(i));
          }
          setgreviancelist(menus);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_complaints(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12), complaint VARCHAR(400), status VARCHAR(30))",
              []
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const resolveIssue = id => {
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE table_complaints SET status='resolved' WHERE cus_id=?",
        [id],
        (tx, res) => {
          getData();
          alert("Complaint resolved successfully");
        }
      );
    });
  };

  const getStatusColor = (status) => {
    if (status?.toLowerCase() === 'resolved') return '#10B981';
    return '#F59E0B';
  };

  const getStatusBgColor = (status) => {
    if (status?.toLowerCase() === 'resolved') return '#D1FAE5';
    return '#FEF3C7';
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎯</Text>
      <Text style={styles.emptyText}>No complaints assigned</Text>
      <Text style={styles.emptySubtext}>Your assigned complaints will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Complaints</Text>
          <Text style={styles.headerSubtitle}>Assigned customer issues</Text>
        </View>

        <FlatList
          data={greviancelist}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => {
            const isResolved = item.status?.toLowerCase() === 'resolved';
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{item.name?.charAt(0) || 'C'}</Text>
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.customerName}>{item.name}</Text>
                    <Text style={styles.customerArea}>📍 {item.area}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(item.status) }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                      {isResolved ? 'Resolved' : 'Pending'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.complaintSection}>
                  <Text style={styles.complaintLabel}>Complaint Details</Text>
                  <Text style={styles.complaintText}>{item.complaint}</Text>
                </View>

                {!isResolved && (
                  <TouchableOpacity
                    style={styles.resolveButton}
                    onPress={() => resolveIssue(item.cus_id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.resolveButtonText}>✓ Mark as Resolved</Text>
                  </TouchableOpacity>
                )}

                {isResolved && (
                  <View style={styles.resolvedInfo}>
                    <Text style={styles.resolvedText}>✓ Issue Resolved</Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3B82F6",
  },
  cardHeaderText: {
    flex: 1,
  },
  customerName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  customerArea: {
    fontSize: 13,
    color: "#64748B",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
  },
  complaintSection: {
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  complaintLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  complaintText: {
    fontSize: 14,
    color: "#1E293B",
    lineHeight: 20,
  },
  resolveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  resolveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  resolvedInfo: {
    backgroundColor: "#D1FAE5",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  resolvedText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#047857",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#64748B",
  },
});

export default Viewallgreviances;