import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const ViewEmployeesubscription = ({ navigation }) => {
  const [subscriptionlist, setsubscriptionlist] = useState([]);
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
        "SELECT * FROM table_connections WHERE connection_status LIKE ?",
        [`%${user.name}%`],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            menus.push(res.rows.item(i));
          }
          setsubscriptionlist(menus);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_connections(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12), connection_name VARCHAR(50), connection_mode VARCHAR(50), planname VARCHAR(50), subscription VARCHAR(50), package VARCHAR(50), amount VARCHAR(10), payment_status VARCHAR(50), connection_status VARCHAR(50))",
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

  const updateIssue = (id) => {
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE table_connections SET connection_status=?, payment_status=? WHERE cus_id=?",
        ['completed', 'paid', id],
        (tx, res) => {
          getData();
          alert("Subscription completed successfully");
        }
      );
    });
  };

  const getStatusColor = (status) => {
    if (status?.toLowerCase().includes('completed')) return '#10B981';
    return '#F59E0B';
  };

  const getStatusBgColor = (status) => {
    if (status?.toLowerCase().includes('completed')) return '#D1FAE5';
    return '#FEF3C7';
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyText}>No subscriptions assigned</Text>
      <Text style={styles.emptySubtext}>Your assigned tasks will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Subscriptions</Text>
          <Text style={styles.headerSubtitle}>Assigned connection tasks</Text>
        </View>

        <FlatList
          data={subscriptionlist}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => {
            const isCompleted = item.connection_status?.toLowerCase().includes('completed');
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{item.name?.charAt(0) || 'C'}</Text>
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.customerName}>{item.name}</Text>
                    <Text style={styles.customerDetail}>📞 {item.mobile}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(item.connection_status) }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.connection_status) }]}>
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Connection</Text>
                    <Text style={styles.detailValue}>{item.connection_name}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Mode</Text>
                    <Text style={styles.detailValue}>{item.connection_mode}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Plan</Text>
                    <Text style={styles.detailValue}>{item.planname}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Package</Text>
                    <Text style={styles.detailValue}>{item.package}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Subscription</Text>
                    <Text style={styles.detailValue}>{item.subscription} days</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Area</Text>
                    <Text style={styles.detailValue}>{item.area}</Text>
                  </View>
                </View>

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>Payment</Text>
                  <Text style={styles.paymentValue}>{item.payment_status}</Text>
                  <Text style={styles.amountText}>₹{item.amount}</Text>
                </View>

                {!isCompleted && (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => updateIssue(item.cus_id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.completeButtonText}>✓ Mark as Completed</Text>
                  </TouchableOpacity>
                )}

                {isCompleted && (
                  <View style={styles.completedInfo}>
                    <Text style={styles.completedText}>✓ Task Completed</Text>
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
  customerDetail: {
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
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  detailItem: {
    width: "50%",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  paymentInfo: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  paymentValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
    textAlign: "center",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B82F6",
  },
  completeButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  completedInfo: {
    backgroundColor: "#D1FAE5",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  completedText: {
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

export default ViewEmployeesubscription;