import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
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
  const [emplist, setemplist] = useState([])
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
  useEffect(() => {
   getEmployees();
  }, [])
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (email === "" || subject === "" || content === "") {
      alert("please fill all fields");
    } else {
      let url = `mailto:${email}`;

      // Create email link query
      const query = qs.stringify({
        subject: subject,
        body: content
        // cc: cc,
        // bcc: bcc
      });

      if (query.length) {
        url += `?${query}`;
      }

      // check if we can use this link
      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        throw new Error("Provided URL can not be handled");
      }

      return Linking.openURL(url);
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
      <Text style={styles.Text}>SEND OFFERS TO CUSTOMER</Text>
      <View>
        {/* <TextInput
          style={styles.input}
          onChangeText={txt => setemail(txt)}
          color="black"
          value={email}
          placeholder="Enter Email"
          placeholderTextColor="black"
        /> */}
          <Picker
        dropdownIconColor="black"
        selectedValue={email}style={{height:50,color:"black",}}onValueChange={(itemValue,itemIndex)=>setemail(itemValue)}>
              <Picker.Item label='Pick employee'value=''/>
             {
            emplist.map((e,index)=>{
                return <Picker.Item key={index} label={e.email} value={e.email}/>
            })
           }
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText={txt => setsubject(txt)}
          value={subject}
          color="black"
          placeholder="Enter Subject"
          placeholderTextColor="black"
        />
        <TextInput
          onChangeText={txt => setcontent(txt)}
          value={content}
          placeholder="Enter Body"
          color="black"
          multiline={true}
          numberOfLines={40}
          placeholderTextColor="black"
          style={{
            height: 200,
            textAlignVertical: "top",
            margin: 12,
            borderWidth: 1,
            borderRadius: 10
          }}
        />

        <Button
          title="SEND"
          color="green"
          style={{ borderRadius: "10px" }}
          onPress={handleSubmit}
        />
      </View>
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

export default Sendoffer;
