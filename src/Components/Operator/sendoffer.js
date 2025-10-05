import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
import qs from "qs";
import { Linking } from "react-native";
import { Picker } from '@react-native-picker/picker';

let db = openDatabase({ name: DB_NAME });

const Sendoffer = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [content, setcontent] = useState("");
  const [emplist, setemplist] = useState([]);

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

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (email === "" || subject === "" || content === "") {
      alert("Please fill all fields");
    } else {
      let url = `mailto:${email}`;

      const query = qs.stringify({
        subject: subject,
        body: content
      });

      if (query.length) {
        url += `?${query}`;
      }

      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        throw new Error("Provided URL can not be handled");
      }

      return Linking.openURL(url);
    }
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
          <Text style={styles.title}>Send Offer</Text>
          <Text style={styles.subtitle}>Send email to customers</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>✉️ Select Employee</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                dropdownIconColor="#3B82F6"
                selectedValue={email}
                style={styles.picker}
                onValueChange={(itemValue) => setemail(itemValue)}
              >
                <Picker.Item label='Select employee email' value='' />
                {emplist.map((e, index) => {
                  return <Picker.Item key={index} label={e.email} value={e.email} />
                })}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>📝 Email Subject</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt => setsubject(txt)}
              value={subject}
              placeholder="Enter email subject"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>💬 Email Body</Text>
            <TextInput
              onChangeText={txt => setcontent(txt)}
              value={content}
              placeholder="Enter email content..."
              multiline={true}
              numberOfLines={10}
              placeholderTextColor="#94A3B8"
              textAlignVertical="top"
              style={[styles.input, styles.textArea]}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>📧 Send Email</Text>
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
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#1E293B",
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
  textArea: {
    minHeight: 180,
    paddingTop: 14,
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

export default Sendoffer;