import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });
const InventoryList = ({ navigation }) => {
  const [customerlist, setcustomerlist] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_inventory",
        [],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setcustomerlist(menus);
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_inventory(inv_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(70), imageurl VARCHAR(500),description VARCHAR(400))",
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
  const deleteUser = id => {
    db.transaction(txn => {
      txn.executeSql(
        "DELETE FROM table_inventory where inv_id=?",
        [id],
        (tx, res) => {
          getData();
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <Button
        title="+ Add Product"
color="green"style={{borderRadius:"10px"}} onPress={() => navigation.navigate("AddProduct")}
      />
<Text/>

      <SafeAreaView>
        <FlatList
          data={customerlist}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Image source={{uri:item.imageurl}} style={{width:"auto",height:200,resizeMode:"contain"}}/>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 10,
                    fontSize: 22,
                    color: "black"
                  }}
                >
                   {item.product_name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 10,
                    fontSize: 22,
                    color: "black"
                  }}
                >
                   {item.description}
                </Text>
              
                <Button
                  title="delete"
                  color="green"style={{borderRadius:"10px"}}  
                  onPress={() => deleteUser(item.inv_id)}
                />
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
    marginTop: 10
  }
});

export default InventoryList;
