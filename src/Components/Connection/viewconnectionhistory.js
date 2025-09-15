import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { DB_NAME } from "../../config";
import { Divider } from "react-native-paper";

let db = openDatabase({ name: DB_NAME });
const Viewconnectionhistory = () => {
  const user = useSelector(state => state.customer);
  console.log(user.value.email)
  const [connectionhistory, setconnectionhistory] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections WHERE email=?",
        [user.value.email],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setconnectionhistory(menus);
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView >
        <FlatList
          data={connectionhistory}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.listStyle}>
               
                <Text
                 style={styles.text}
                >
                 Connection Name - {item.connection_name}
                </Text>
                <Text style={styles.text}>
                  Mode - {item.connection_mode}
                </Text>
                <Text style={styles.text}>
                  plan - {item.planname}
                </Text>
                 <Text style={styles.text}>
                  package - {item.package}
                </Text>
                <Text style={styles.text}>
                  Subscription - {item.subscription} days
                </Text>
                <Text style={styles.text}>
                  Req Status - {item.connection_status}
                </Text>
                <Text style={styles.text}>
                  Pay Status - {item.payment_status}
                </Text>
                <Divider/>
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
    padding: 20,
    marginTop: 10,
  },
  listStyle:{
padding:10,
marginBottom:10
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    padding: 0,
    color:"black"
  }
});

export default Viewconnectionhistory;
