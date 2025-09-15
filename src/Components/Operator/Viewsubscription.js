import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
import { Divider } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

let db = openDatabase({ name: DB_NAME });
const Viewsubscription = ({ navigation }) => {
  const [subscriptionlist, setsubscriptionlist] = useState([]);
  const [emplist, setemplist] = useState([])
  const [empname, setempname] = useState("");
  useEffect(() => {
    getData();
    getEmployees();
  }, []);
const getEmployees = () => {
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
          setemplist(menus);
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
  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections WHERE connection_status!=?",
        ['completed'],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setsubscriptionlist(menus);
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_connections(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),connection_name VARCHAR(50),connection_mode VARCHAR(50),planname VARCHAR(50),subscription VARCHAR(50),package VARCHAR(50),amount VARCHAR(10),payment_status VARCHAR(50),connection_status VARCHAR(50))",
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
  const resolveIssue = (id) => {
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE table_connections SET connection_status=? WHERE cus_id=?",
        [empname,id],
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
          data={subscriptionlist}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.listStyle}>
               
                
                <Text style={styles.text}>
                  Name - {item.name}
                </Text>
                <Text style={styles.text}>
                  Area - {item.area}
                </Text>
                 <Text style={styles.text}>
                  Mobile - {item.mobile}
                </Text>
                  <Text style={styles.text}>
                  Conn Name - {item.connection_name}
                </Text>
                  <Text style={styles.text}>
                  Conn Mode - {item.connection_mode}
                </Text>
                  <Text style={styles.text}>
                  plan - {item.planname}
                </Text>
                  <Text style={styles.text}>
                  Subscription - {item.subscription} days
                </Text>
                   <Text style={styles.text}>
                  Package - {item.package} 
                </Text>
                  <Text style={styles.text}>
                  Payment - {item.payment_status}
                </Text>
                <Text style={styles.text}>
                  Conn Status - {item.connection_status} </Text>
        
             
 {item.connection_status=='pending'? <Picker
        dropdownIconColor="black"
        selectedValue={empname}style={{height:50,color:"black",}}onValueChange={(itemValue,itemIndex)=>setempname(itemValue+'is working')}>
           {
            emplist.map((e,index)=>{
                return  <Picker.Item key={index} label={e.name} value={e.name}/>
            })

            
           }
           
        </Picker>:""}

                <Divider/>
                
                   {item.connection_status=='pending'? <Button
                  title="Assign"
                  color="green"style={{borderRadius:"10px"}}
                  onPress={() => resolveIssue(item.cus_id)}
                />:""} 
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

export default Viewsubscription;
