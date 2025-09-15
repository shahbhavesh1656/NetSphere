import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { DB_NAME } from "../../config";
import { openDatabase } from "react-native-sqlite-storage";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

let db = openDatabase({ name: DB_NAME });

const Bookconnection = ({ navigation }) => {
  const [setupbox, setsetupbox] = useState("");
  const [plan, setplan] = useState("");
  const [userpackage, setuserpackage] = useState("");
  const dispatch = useDispatch();
  const connectionDetails = useSelector(state => state.bookconnection.value);
  const customer = useSelector(state => state.customer.value);
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        // "DROP TABLE table_connections",

        // "SELECT * FROM table_user",
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_connections'",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
          }
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_connections(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),connection_name VARCHAR(50),connection_mode VARCHAR(50),planname VARCHAR(50),subscription VARCHAR(50),package VARCHAR(50),amount VARCHAR(10), payment_status VARCHAR(50),connection_status VARCHAR(50))",
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
    if (setupbox == "" || plan == "") {
      alert("please pick plan and setupbox");
    } else {
      var totalamount = parseInt(plan);
      if (connectionDetails.connection_name == "CABLE CONNECTION") {
        if (userpackage == "Package-1") {
          totalamount = 400;
        } else if (userpackage == "Package-2") {
          totalamount = 350;
        } else if (userpackage == "Package-3") {
          totalamount =  300;
        } else if (userpackage == "Package-4") {
          totalamount = 250;
        } else {
          console.log("no channel package is selected");
        }
      } else {
        if (userpackage == "25 Mbps") {
          if (totalamount == 30) {
            totalamount = 400;
          } else {
            totalamount = 2249;
          }
        } else if (userpackage == "30 Mbps") {
          if (totalamount == 30) {
            totalamount = 500;
          } else {
            totalamount = 2699;
          }
        } else if (userpackage == "50 Mbps") {
          if (totalamount == 30) {
            totalamount = 550;
          } else {
            totalamount = 2999;
          }
        } else if (userpackage == "100 Mbps") {
          if (totalamount == 30) {
            totalamount = 700;
          } else {
            totalamount =3999;
          }
        } else {
          console.log("no wifi package is selected");
        }
      }
      dispatch(
        getBookedConnectionData({
          name: customer.name,
          email: customer.email,
          address: customer.address,
          area: connectionDetails.area,
          mobile: customer.mobile,
          connection_name: connectionDetails.connection_name,
          connection_mode: connectionDetails.connection_mode,
          plan_name: setupbox,
          subscription: plan,
          package: userpackage,
          amount: totalamount,
          payment_status: "paid",
          connection_status: "pending"
        })
      );
      var options = {
        description: "Payment for Cable Connection.",
        image:
          "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw",
        currency: "INR",
        key: "rzp_test_biZuZUgW3kho4d",
        amount: totalamount * 100,
        name: customer.name,
        prefill: {
          email: customer.email,
          contact: customer.mobile,
          name: customer.name
        },
        theme: { color: "#F37254" }
      }; // Your api key
      if(connectionDetails.connection_mode=="CONNECTION REMOVAL"){
 db.transaction(function(tx) {
            tx.executeSql(
              "INSERT INTO table_connections (name, email, address,area, mobile,connection_name,connection_mode,planname,subscription,package,amount,payment_status,connection_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                connectionDetails.name,
                connectionDetails.email,
                connectionDetails.address,
                connectionDetails.area,
                connectionDetails.mobile,
                connectionDetails.connection_name,
                connectionDetails.connection_mode,
                setupbox,
                plan,
                userpackage,
                totalamount,
                "pending",
                "pending"
              ],
              (tx, results) => {
                console.log("Results", results.rowsAffected);
                if (results.rowsAffected > 0) {
                  alert("Connection Requested Successfully");
                  navigation.navigate("PaymentReceipt");
                } else alert("Registration Failed");
              },
              error => {
                console.log(error);
              }
            );
          });
      }else{
         RazorpayCheckout.open(options)
        .then(() => {
          db.transaction(function(tx) {
            tx.executeSql(
              "INSERT INTO table_connections (name, email, address,area, mobile,connection_name,connection_mode,planname,subscription,package,amount,payment_status,connection_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                connectionDetails.name,
                connectionDetails.email,
                connectionDetails.address,
                connectionDetails.area,
                connectionDetails.mobile,
                connectionDetails.connection_name,
                connectionDetails.connection_mode,
                setupbox,
                plan,
                userpackage,
                totalamount,
                "pending",
                "pending"
              ],
              (tx, results) => {
                console.log("Results", results.rowsAffected);
                if (results.rowsAffected > 0) {
                  alert("Connection Requested Successfully");
                  navigation.navigate("PaymentReceipt");
                } else alert("Registration Failed");
              },
              error => {
                console.log(error);
              }
            );
          });
        })
        .catch(error => {
          // handle failure
          // alert(`Error: ${error.code} | ${error.message}`);
          console.log(error);
        });
      }
     
    }
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
      <Text style={styles.Text}>CHOOSE PLAN</Text>
      {connectionDetails.connection_name == "CABLE CONNECTION"
        ? <Picker
            dropdownIconColor="black"
            selectedValue={setupbox}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setsetupbox(itemValue)}
          >
            <Picker.Item label="Pick Setup Box" value="" />
            <Picker.Item label="HD setup box" value="HD setup box" />
            <Picker.Item label="Jio setup box" value="Jio setup box" />
            <Picker.Item label="Den setup box" value="Den setup box" />
          </Picker>
        : <Picker
            dropdownIconColor="black"
            selectedValue={setupbox}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setsetupbox(itemValue)}
          >
            <Picker.Item label="Pick Wifi Plan" value="" />
            <Picker.Item
              label="JioFi M2S 4G Wireless Router"
              value="JioFi M2S 4G Wireless Router"
            />
            <Picker.Item
              label="Xiaomi Mi WiFi Router"
              value="Xiaomi Mi WiFi Router"
            />
            <Picker.Item
              label="Tenda F3  Wireless Router"
              value="Tenda F3  Wireless Router"
            />
            <Picker.Item
              label="Mercusys Dual Band Router"
              value="Mercusys Dual Band Router"
            />
            <Picker.Item label="D link router" value="D link router" />
          </Picker>}

      {connectionDetails.connection_name == "CABLE CONNECTION"
        ? <Picker
            dropdownIconColor="black"
            selectedValue={plan}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setplan(itemValue)}
          >
            <Picker.Item label="Pick Days" value="" />

            <Picker.Item label="10 days" value="10" />
            <Picker.Item label="20 days" value="20" />
            <Picker.Item label="30 days" value="30" />
          </Picker>
        : <Picker
            dropdownIconColor="black"
            selectedValue={plan}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setplan(itemValue)}
          >
            <Picker.Item label="Pick Days" value="" />

            <Picker.Item label="1 month" value="30" />
            <Picker.Item label="6 month" value="180" />
          </Picker>}

      {connectionDetails.connection_name == "CABLE CONNECTION"
        ? <Picker
            dropdownIconColor="black"
            selectedValue={userpackage}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setuserpackage(itemValue)}
          >
            <Picker.Item label="Pick Package" value="" />
            <Picker.Item label="Package-1" value="Package-1" />
            <Picker.Item label="Package-2" value="Package-2" />
            <Picker.Item label="Package-3" value="Package-3" />
            <Picker.Item label="Package-4" value="Package-4" />
          </Picker>
        : <Picker
            dropdownIconColor="black"
            selectedValue={userpackage}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setuserpackage(itemValue)}
          >
            <Picker.Item label="Pick Plan" value="" />
            <Picker.Item label="25 Mbps" value="25 Mbps" />
            <Picker.Item label="30 Mbps" value="30 Mbps" />
            <Picker.Item label="50 Mbps" value="50 Mbps" />
            <Picker.Item label="100 Mbps" value="100 Mbps" />
          </Picker>}

      <Button
        title="Book Connection"
        color="green"
        style={{ borderRadius: "10px" }}
        onPress={handleSubmit}
      />
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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10
  }
});

export default Bookconnection;
