import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const Addemployee = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [area, setarea] = useState("");
  const [mobile, setmobile] = useState("");

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_employee'",
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_employee(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), password VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12))",
              []
            );
          }
        },
        (error) => {
          console.log("SQL Error:", error);
        }
      );
    });
  }, []);

  const handleSubmit = () => {
    if (!name || !email || !password || !address || !area || !mobile) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      Alert.alert("Validation Error", "Please enter a valid Gmail address.");
      return;
    }
    if (mobile.length !== 10) {
      Alert.alert("Validation Error", "Mobile number must have 10 digits.");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO table_employee (name, email, password, address, area, mobile) VALUES (?,?,?,?,?,?)",
        [name, email, password, address, area, mobile],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Success", "Employee created successfully!");
            setname("");
            setemail("");
            setpassword("");
            setaddress("");
            setarea("");
            setmobile("");
          } else {
            Alert.alert("Error", "Failed to add employee.");
          }
        },
        (error) => {
          console.log("Insert Error:", error);
        }
      );
    });
  };

  const handleusernamechange = (input) => {
    setname(input.replace(/[^A-Za-z ]/g, "")); // only letters & spaces
  };

  const handleaddresschange = (input) => {
    setaddress(input.replace(/[^A-Za-z0-9 ,.-]/g, "")); // letters, numbers, commas, etc.
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Image
          source={{
            uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Add Employee</Text>
        <Text style={styles.subtitle}>Enter details to create new employee</Text>
      </View>

      <View style={styles.formCard}>
        <TextInput
          style={styles.input}
          onChangeText={handleusernamechange}
          value={name}
          placeholder="Enter Name"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          onChangeText={setemail}
          value={email}
          placeholder="Enter Email"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          onChangeText={setpassword}
          value={password}
          secureTextEntry
          placeholder="Enter Password"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleaddresschange}
          value={address}
          placeholder="Enter Address"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          onChangeText={setarea}
          value={area}
          placeholder="Enter Area"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          onChangeText={setmobile}
          value={mobile}
          keyboardType="numeric"
          placeholder="Enter Mobile"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.gradientButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#FFF3E0",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#FFA726",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    margin: 16,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FB8C00",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFB74D",
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#FFA726",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFCC80",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFF3E0",
    color: "#FB8C00",
    fontSize: 16,
  },
  gradientButton: {
    borderRadius: 8,
    backgroundColor: "#FB8C00",
    paddingVertical: 14,
    shadowColor: "#FB8C00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Addemployee;
