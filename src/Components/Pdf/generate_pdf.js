import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const GenerateReport = () => {
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [cableConnections, setCableConnections] = useState(0);
  const [cableRemoval, setCableRemoval] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    db.transaction(txn => {
      txn.executeSql("SELECT COUNT(*) as count FROM table_employee", [], (tx, res) => {
        setTotalEmployee(res.rows.item(0).count);
      });
      txn.executeSql("SELECT COUNT(*) as count FROM table_customer", [], (tx, res) => {
        setTotalCustomers(res.rows.item(0).count);
      });
      txn.executeSql(
        "SELECT COUNT(*) as count FROM table_connections WHERE connection_mode != ?",
        ["CONNECTION REMOVAL"],
        (tx, res) => setCableConnections(res.rows.item(0).count)
      );
      txn.executeSql(
        "SELECT COUNT(*) as count FROM table_connections WHERE connection_mode = ?",
        ["CONNECTION REMOVAL"],
        (tx, res) => setCableRemoval(res.rows.item(0).count)
      );
      txn.executeSql("SELECT COUNT(*) as count FROM table_connections", [], (tx, res) => {
        setTotalTasks(res.rows.item(0).count);
      });
      txn.executeSql("SELECT * FROM table_connections", [], (tx, res) => {
        let total = 0;
        for (let i = 0; i < res.rows.length; i++) {
          total += parseInt(res.rows.item(i).amount || 0);
        }
        setTotalIncome(total);
      });
    });
  };

  const generatePDF = async () => {
    const htmlContent = `
      <h1 style="text-align:center;">Customer Report</h1>
      <ul>
        <li>Total Employees: ${totalEmployee}</li>
        <li>Total Customers: ${totalCustomers}</li>
        <li>Total Tasks: ${totalTasks}</li>
        <li>Cable Connections: ${cableConnections}</li>
        <li>Cable Removals: ${cableRemoval}</li>
        <li>Total Income: ₹${totalIncome}</li>
      </ul>
    `;
    try {
      const options = { html: htmlContent, fileName: "CustomerReport", directory: "Documents" };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert("PDF Generated", `File saved at: ${file.filePath}`);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF");
    }
  };

  const renderStatCard = (title, value, color) => (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>📊 Dashboard Report</Text>
        
        <View style={styles.statsRow}>
          {renderStatCard("Total Employees", totalEmployee, "#BBDEFB")}
          {renderStatCard("Total Customers", totalCustomers, "#C8E6C9")}
        </View>

        <View style={styles.statsRow}>
          {renderStatCard("Total Tasks", totalTasks, "#FFF9C4")}
          {renderStatCard("Cable Connections", cableConnections, "#FFE0B2")}
        </View>

        <View style={styles.statsRow}>
          {renderStatCard("Cable Removals", cableRemoval, "#FFCDD2")}
          {renderStatCard("Total Income", `₹${totalIncome}`, "#D1C4E9")}
        </View>

        <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
          <Text style={styles.pdfButtonText}>📄 Generate PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  scrollContainer: { padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#1E3A8A" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  card: { flex: 1, borderRadius: 16, padding: 20, marginHorizontal: 4, alignItems: "center", justifyContent: "center", elevation: 3 },
  cardValue: { fontSize: 22, fontWeight: "bold", color: "#1F2937", marginBottom: 4 },
  cardTitle: { fontSize: 14, color: "#374151", textAlign: "center" },
  pdfButton: { backgroundColor: "#2563EB", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 24 },
  pdfButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default GenerateReport;
