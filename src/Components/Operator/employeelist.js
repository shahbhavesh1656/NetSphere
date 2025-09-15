import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });
const EmployeeList = ({ navigation }) => {
  const [employeelist, setemployeelist] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_employee",
        [],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setemployeelist(menus);
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_employee(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),password VARCHAR(50), address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12))",
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
        "DELETE FROM table_employee where emp_id=?",
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
        title="+ Add Employee"
color="green"style={{borderRadius:"10px"}}        onPress={() => navigation.navigate("AddEmployee")}
      />

      <SafeAreaView>
        <FlatList
          data={employeelist}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 10,
                    fontSize: 22,
                    color: "black"
                  }}
                >
                  name: {item.name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 10,
                    fontSize: 22,
                    color: "black"
                  }}
                >
                  email: {item.email}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 10,
                    fontSize: 22,
                    color: "black"
                  }}
                >
                  address: {item.address}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 10,
                    fontSize: 22,
                    color: "black"
                  }}
                >
                  mobile: {item.mobile}
                </Text>
                <Button
                  title="delete"
                  color="green"style={{borderRadius:"10px"}}
                  onPress={() => deleteUser(item.emp_id)}
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

export default EmployeeList;
