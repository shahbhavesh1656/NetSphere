import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { DB_NAME } from "../../config";
import { Picker } from "@react-native-picker/picker";
import DateField from 'react-native-datefield';


let db= openDatabase({name:DB_NAME})
const Addattendance = ({navigation})=>{
    const user = useSelector((state)=>state.employee.value);
    const [date, setdate] = useState();
    const [status, setstatus] = useState("");
    useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        // "SELECT * FROM table_user",
        // "DROP TABLE table_complaints",
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_attendance'",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
          }
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_attendance(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(40), name VARCHAR(80), area VARCHAR(40), email VARCHAR(50),status VARCHAR(40))",
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
    const handleSubmit = (e)=>{
      e.preventDefault();
       if (
      date === "" ||
      status === ""
    ) {
      alert("please fill all fields");
    }  else {
      db.transaction(function(tx) {
        tx.executeSql(
          "INSERT INTO table_attendance (date, name, area, email, status) VALUES (?,?,?,?,?)",
          [date,user.name,user.area,user.email,status],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert("Attendance Submitted Successfully");
            } else alert("Insertion Failed");
          },
          error => {
            console.log(error);
          }
        );
      });
    }
    }
    return(
        <View style={styles.Container}>
          <Image source={{uri:"hhttps://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}style={{
marginLeft:"auto",
marginRight:"auto",
width: 100,
    height: 100,
    resizeMode: 'contain',
  }}/>
            <Text style={styles.Text}>ADD ATTENDANCE</Text>
            <View>
             

      {/* <TextInput
      type="date"
        style={styles.input}
        onChangeText={txt=>setdate(txt)}
        value={date}
        placeholder="Pick Date"
        color="black"
        placeholderTextColor="black"

      /> */}

      <DateField
  labelDate="Input date"
  labelMonth="Input month"
  labelYear="Input year"
  styleInput={{color:"black"}}
  placeholderTextColor="black"
  onSubmit={(value) => setdate(value)}
/>

              <Picker
            dropdownIconColor="black"
            selectedValue={status}
            style={{ height: 50, color: "black" }}
            onValueChange={(itemValue, itemIndex) => setstatus(itemValue)}
          >
            <Picker.Item label="Pick Status" value="" />
            <Picker.Item label="Present" value="present" />
            <Picker.Item label="Absent" value="absent" />
          </Picker>
      <Button title="Submit" color="green"style={{borderRadius:"10px"}} onPress={handleSubmit} />
     

      </View>
            {/* <Button title="View Complaints" color="green"style={{borderRadius:"10px"}} onPress={()=>navigation.navigate("ViewComplaints")} /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        margin:"auto",
        display:"flex",
        flexDirection:"column",
        gap:30
        ,padding:20
    },
    Text:{
        fontSize:22,
        textAlign:"center",
        color:"black"
    },
    Text1:{
        fontSize:19,
        textAlign:"center",
        color:"black"
    },
     input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:10,
  },
 
})


export default Addattendance;