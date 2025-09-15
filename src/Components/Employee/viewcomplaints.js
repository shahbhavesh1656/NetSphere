import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

let db = openDatabase({ name: DB_NAME });
const Viewallgreviances = ({ navigation }) => {
  const [greviancelist, setgreviancelist] = useState([]);
  const user = useSelector((state)=>state.employee.value)
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_complaints WHERE status=?",
        [user.name+'is working'],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setgreviancelist(menus);
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_complaints(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),complaint VARCHAR(400),status VARCHAR(30))",
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
  const resolveIssue = id => {
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE table_complaints SET status='resolved' WHERE cus_id=?",
        [id],
        (tx, res) => {
          getData();
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={greviancelist}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.listStyle}>
               
                <Text
                 style={styles.text}
                >
                 Complaint - {item.complaint}
                </Text>
                <Text style={styles.text}>
                  Name - {item.name}
                </Text>
                <Text style={styles.text}>
                  Area - {item.area}
                </Text>
                <Text style={styles.text}>
                  Status - {item.status}
                </Text>
                {item.status!='resolved'? <Button
                  title="Issue Resolved"
                  color="green"style={{borderRadius:"10px"}}
                  onPress={() => resolveIssue(item.cus_id)}
                />:""}
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
    marginTop: 10
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

export default Viewallgreviances;
