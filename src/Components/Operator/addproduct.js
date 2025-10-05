import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const Addproduct = ({ navigation }) => {
  const [name, setname] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_inventory'",
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_inventory(inv_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(70), imageurl VARCHAR(500), description VARCHAR(400))",
              []
            );
          }
        },
        (error) => console.log(error)
      );
    });
  }, []);

  const handleSubmit = () => {
    if (name === "" || imageurl === "" || description === "") {
      alert("Please fill all fields");
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT INTO table_inventory (product_name, imageurl, description) VALUES (?,?,?)",
          [name, imageurl, description],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              alert("✅ Product Added Successfully");
              setname("");
              setimageurl("");
              setdescription("");
              navigation.goBack();
            } else {
              alert("❌ Product Insertion Failed");
            }
          },
          (error) => console.log(error)
        );
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Image
            source={{
              uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Add Product</Text>
          <Text style={styles.subtitle}>Fill in details to add a new item</Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            onChangeText={(txt) => setname(txt)}
            value={name}
            placeholder="Enter Product Name"
            placeholderTextColor="#FB8C00"
          />
          <TextInput
            style={styles.input}
            onChangeText={(txt) => setimageurl(txt)}
            value={imageurl}
            placeholder="Enter Image URL"
            placeholderTextColor="#FB8C00"
          />
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            onChangeText={(txt) => setdescription(txt)}
            value={description}
            placeholder="Enter Product Description"
            placeholderTextColor="#FB8C00"
            multiline
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.gradientButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>💾 Save Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF8F0",
  },
  mainContainer: {
    padding: 20,
    flex: 1,
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
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FB8C00",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFB74D",
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    borderRadius: 10,
    backgroundColor: "#FB8C00",
    paddingVertical: 14,
    alignItems: "center",
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
    fontSize: 18,
    textAlign: "center",
  },
});

export default Addproduct;
