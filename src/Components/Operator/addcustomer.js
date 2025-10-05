import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const AddCustomer = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [area, setarea] = useState("");
  const [mobile, setmobile] = useState("");

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_customer'",
        [],
        (tx, res) => {
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_customer(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), password VARCHAR(50), address VARCHAR(100), area VARCHAR(50), mobile VARCHAR(12))",
              []
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      address === "" ||
      area === "" ||
      mobile === ""
    ) {
      alert("Please fill all fields");
    } else if (email.slice(-10) != "@gmail.com") {
      alert("Enter valid email");
    } else if (mobile.length < 10 || mobile.length > 10) {
      alert("Mobile number must have 10 digits");
    } else {
      db.transaction(function(tx) {
        tx.executeSql(
          "INSERT INTO table_customer (name, email, password, address, area, mobile) VALUES (?,?,?,?,?,?)",
          [name, email, password, address, area, mobile],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              alert("Customer Created Successfully");
              setname("");
              setemail("");
              setpassword("");
              setaddress("");
              setarea("");
              setmobile("");
            } else alert("Registration Failed");
          },
          error => {
            console.log(error);
          }
        );
      });
    }
  };

  const handleusernamechange = input => {
    const newText = input.replace(/[^A-Za-z]/g, "");
    setname(newText);
  };

  const handleaddresschange = input => {
    const newText = input.replace(/[^A-Za-z]/g, "");
    setaddress(newText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Add Customer</Text>
          <Text style={styles.subtitle}>Create new customer account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>👤 Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleusernamechange}
              placeholderTextColor="#94A3B8"
              value={name}
              placeholder="Enter customer name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>✉️ Email Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt => setemail(txt)}
              value={email}
              placeholder="example@gmail.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔒 Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt => setpassword(txt)}
              secureTextEntry={true}
              value={password}
              placeholder="Enter password"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>🏠 Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleaddresschange}
              value={address}
              placeholder="Enter address"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>📍 Area</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt => setarea(txt)}
              value={area}
              placeholder="Enter area"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>📞 Mobile Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt => setmobile(txt)}
              value={mobile}
              placeholder="Enter 10-digit mobile"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>✓ Create Customer</Text>
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1E293B",
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddCustomer;