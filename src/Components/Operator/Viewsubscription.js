import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
import { Picker } from '@react-native-picker/picker';

let db = openDatabase({ name: DB_NAME });

const Viewsubscription = ({ navigation }) => {
  const [subscriptionlist, setsubscriptionlist] = useState([]);
  const [emplist, setemplist] = useState([]);
  const [empname, setempname] = useState("");

  useEffect(() => {
    getData();
    getEmployees();
  }, []);

  const getEmployees = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_employee",
        [],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            menus.push(res.rows.item(i));
          }
          setemplist(menus);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_employee(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), password VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12))",
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

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections WHERE connection_status!=?",
        ['completed'],
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

  const resolveIssue = (id) => {
    if (!empname) {
      alert("Please select an employee");
      return;
    }
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE table_connections SET connection_status=? WHERE cus_id=?",
        [empname, id],
        (tx, res) => {
          getData();
          setempname("");
        }
      );
    });
  };

  const getStatusColor = (status) => {
    if (status?.toLowerCase() === 'pending') return '#F59E0B';
    return '#10B981';
  };

  const getStatusBgColor = (status) => {
    if (status?.toLowerCase() === 'pending') return '#FEF3C7';
    return '#D1FAE5';
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyText}>No subscriptions found</Text>
      <Text style={styles.emptySubtext}>Pending subscriptions will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Subscriptions</Text>
          <Text style={styles.headerSubtitle}>Manage customer connections</Text>
        </View>

        <FlatList
          data={subscriptionlist}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => {
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
                      {item.connection_status}
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
                    <Text style={styles.detailLabel}>Subscription</Text>
                    <Text style={styles.detailValue}>{item.subscription} days</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Package</Text>
                    <Text style={styles.detailValue}>{item.package}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Area</Text>
                    <Text style={styles.detailValue}>{item.area}</Text>
                  </View>
                </View>

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>Payment Status</Text>
                  <Text style={styles.paymentValue}>{item.payment_status}</Text>
                  <Text style={styles.amountText}>₹{item.amount}</Text>
                </View>

                {item.connection_status === 'pending' && (
                  <>
                    <View style={styles.pickerContainer}>
                      <Text style={styles.pickerLabel}>Assign to Employee</Text>
                      <View style={styles.pickerWrapper}>
                        <Picker
                          dropdownIconColor="#3B82F6"
                          selectedValue={empname}
                          style={styles.picker}
                          onValueChange={(itemValue) => setempname(itemValue + ' is working')}
                        >
                          <Picker.Item label='Select employee' value='' />
                          {emplist.map((e, index) => {
                            return <Picker.Item key={index} label={e.name} value={e.name} />
                          })}
                        </Picker>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.assignButton}
                      onPress={() => resolveIssue(item.cus_id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.assignButtonText}>✓ Assign Connection</Text>
                    </TouchableOpacity>
                  </>
                )}

                {item.connection_status !== 'pending' && (
                  <View style={styles.assignedInfo}>
                    <Text style={styles.assignedLabel}>Assigned To</Text>
                    <Text style={styles.assignedText}>{item.connection_status}</Text>
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
    textTransform: "capitalize",
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
  pickerContainer: {
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  pickerWrapper: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#1E293B",
  },
  assignButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  assignButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  assignedInfo: {
    backgroundColor: "#D1FAE5",
    padding: 12,
    borderRadius: 12,
  },
  assignedLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 4,
  },
  assignedText: {
    fontSize: 14,
    fontWeight: "500",
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

export default Viewsubscription;