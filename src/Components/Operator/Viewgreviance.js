import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
import { Picker } from '@react-native-picker/picker';

let db = openDatabase({ name: DB_NAME });

const Viewgreviance = ({ navigation }) => {
  const [greviancelist, setgreviancelist] = useState([]);
  const [emplist, setemplist] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState({}); // per complaint employee selection

  useEffect(() => {
    createTables();
    getEmployees();
    getData();
  }, []);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS table_employee(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), password VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12))"
      );
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS table_complaints(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12), complaint VARCHAR(400), status VARCHAR(30))"
      );
    });
  };

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
        },
        error => {
          console.log("Error fetching employees:", error);
        }
      );
    });
  };

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_complaints",
        [],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            menus.push(res.rows.item(i));
          }
          setgreviancelist(menus);
        },
        error => {
          console.log("Error fetching complaints:", error);
        }
      );
    });
  };

  const resolveIssue = (id, empname) => {
    if (!empname) return;
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE table_complaints SET status=? WHERE cus_id=?",
        [`Assigned to ${empname}`, id],
        (tx, res) => {
          getData();
          setSelectedEmployees(prev => ({ ...prev, [id]: "" })); // reset selection
        }
      );
    });
  };

  const getStatusColor = (status) => {
    if (status === 'pending') return '#FEF3C7'; // Yellow
    return '#D1FAE5'; // Green
  };

  const getStatusTextColor = (status) => {
    if (status === 'pending') return '#92400E';
    return '#065F46';
  };

  const renderComplaintCard = ({ item }) => {
    return (
      <View style={styles.complaintCard}>
        <View style={styles.cardHeader}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.customerArea}>📍 {item.area}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={[styles.statusText, { color: getStatusTextColor(item.status) }]}>
              {item.status === 'pending' ? '⏳ Pending' : item.status}
            </Text>
          </View>
        </View>

        <View style={styles.complaintContent}>
          <Text style={styles.complaintLabel}>Complaint Details:</Text>
          <Text style={styles.complaintText}>{item.complaint}</Text>
        </View>

        {item.status === 'pending' && (
          <View style={styles.assignmentSection}>
            <Text style={styles.assignmentLabel}>Assign to Employee:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedEmployees[item.cus_id] || ""}
                style={styles.picker}
                dropdownIconColor="#2563EB"
                onValueChange={(val) =>
                  setSelectedEmployees(prev => ({ ...prev, [item.cus_id]: val }))
                }
              >
                <Picker.Item label="Select Employee" value="" />
                {emplist.map((e, index) => (
                  <Picker.Item key={index} label={e.name} value={e.name} />
                ))}
              </Picker>
            </View>
            
            <TouchableOpacity
              style={[styles.assignButton, !selectedEmployees[item.cus_id] && styles.disabledButton]}
              onPress={() => resolveIssue(item.cus_id, selectedEmployees[item.cus_id])}
              disabled={!selectedEmployees[item.cus_id]}
            >
              <Text style={styles.assignButtonText}>🎯 Assign Task</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.divider} />
      </View>
    );
  };

  const pendingCount = greviancelist.filter(item => item.status === 'pending').length;
  const assignedCount = greviancelist.length - pendingCount;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Complaint Management</Text>
          <Text style={styles.subtitle}>Handle customer complaints efficiently</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
            <View style={styles.statIcon}>
              <Text>⏳</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{assignedCount}</Text>
            <Text style={styles.statLabel}>Assigned</Text>
            <View style={styles.statIcon}>
              <Text>✅</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{greviancelist.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
            <View style={styles.statIcon}>
              <Text>📋</Text>
            </View>
          </View>
        </View>

        {/* Complaints List */}
        <View style={styles.listContainer}>
          {greviancelist.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🎉</Text>
              <Text style={styles.emptyStateTitle}>No Complaints</Text>
              <Text style={styles.emptyStateText}>Great! No customer complaints at the moment.</Text>
            </View>
          ) : (
            <FlatList
              data={greviancelist}
              renderItem={renderComplaintCard}
              keyExtractor={(item) => item.cus_id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#6B7280' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 12 },
  statCard: {
    flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3, position: 'relative',
  },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#2563EB', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  statIcon: { position: 'absolute', top: 8, right: 8 },
  listContainer: { flex: 1 },
  listContent: { paddingBottom: 20 },
  complaintCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  customerInfo: { flex: 1 },
  customerName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  customerArea: { fontSize: 14, color: '#6B7280' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: '600' },
  complaintContent: { marginBottom: 16 },
  complaintLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  complaintText: {
    fontSize: 16, color: '#1F2937', lineHeight: 24, backgroundColor: '#F9FAFB',
    padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#2563EB',
  },
  assignmentSection: { marginTop: 16, padding: 16, backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  assignmentLabel: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  pickerContainer: { backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', marginBottom: 16 },
  picker: { height: 48, color: '#1F2937' },
  assignButton: {
    backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8,
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 2,
  },
  disabledButton: { backgroundColor: '#9CA3AF', shadowOpacity: 0, elevation: 0 },
  assignButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginTop: 16 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyStateIcon: { fontSize: 64, marginBottom: 16 },
  emptyStateTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  emptyStateText: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
});

export default Viewgreviance;
