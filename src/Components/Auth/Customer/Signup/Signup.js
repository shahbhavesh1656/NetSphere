import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../../../config";
let db = openDatabase({ name: DB_NAME });
const Signup = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [area, setarea] = useState("");
  const [mobile, setmobile] = useState("");

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        // "SELECT * FROM table_user",
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_customer'",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
          }
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_customer(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),password VARCHAR(50), address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12))",
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
      alert("please fill all fields");
    } else if (email.slice(-10) != "@gmail.com") {
      alert("enter valid email");
    } else if (mobile.length < 10 || mobile.length > 10) {
      alert("mobile number must have 10 digits");
    } else {
      db.transaction(function(tx) {
        tx.executeSql(
          "INSERT INTO table_customer (name, email,password, address,area, mobile) VALUES (?,?,?,?,?,?)",
          [name, email, password, address, area, mobile],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert("Customer Created Successfully");
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
    <View style={styles.Container}>
      <Image
        source={{
          uri:
            "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"
        }}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: 100,
          height: 100,
          resizeMode: "contain"
        }}
      />
      <Text style={styles.Text}>CREATE CUSTOMER</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={handleusernamechange}
          placeholderTextColor="black"
          color="black"
          value={name}
          placeholder="Enter Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={txt => setemail(txt)}
          color="black"
          value={email}
          placeholder="Enter Email"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          onChangeText={txt => setpassword(txt)}
          secureTextEntry={true}
          value={password}
          color="black"
          placeholder="Enter Password"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleaddresschange}
          value={address}
          placeholder="Enter Address"
          color="black"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          onChangeText={txt => setarea(txt)}
          value={area}
          placeholder="Enter Area"
          color="black"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          onChangeText={txt => setmobile(txt)}
          value={mobile}
          placeholder="Enter Mobile"
          color="black"
          placeholderTextColor="black"
        />
        <Button
          title="SignUp"
          color="green"
          style={{ borderRadius: "10px" }}
          onPress={handleSubmit}
        />
      </View>
      <Text
        style={styles.Text1}
        onPress={() => navigation.navigate("CustomerLogin")}
      >
        Already have a account ? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    padding: 20
  },
  Text: {
    fontSize: 22,
    textAlign: "center",
    color: "black"
  },
  Text1: {
    fontSize: 19,
    textAlign: "center",
    color: "black"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10
  }
});

export default Signup;
