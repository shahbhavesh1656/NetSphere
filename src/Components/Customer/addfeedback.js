import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { DB_NAME } from "../../config";
let db= openDatabase({name:DB_NAME})
const Addfeedback = ({navigation})=>{
    
const [feedback, setfeedback] = useState("");
const user = useSelector((state)=>state.customer.value);
    useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        // "SELECT * FROM table_user",
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_feedback'",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
          }
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_feedback(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),feedback VARCHAR(400))",
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
      feedback === ""
    ) {
      alert("please fill all fields");
    }  else {
      db.transaction(function(tx) {
        tx.executeSql(
          "INSERT INTO table_feedback (name, email,address,area, mobile,feedback) VALUES (?,?,?,?,?,?)",
          [user.name, user.email, user.address,user.area,user.mobile,feedback],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert("Feedback Added Successfully");
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
            <Text style={styles.Text}>GIVE FEEDBACK</Text>
            <View>
             

              <TextInput
        style={styles.input}
        onChangeText={txt=>setfeedback(txt)}
        value={feedback}
        placeholder="Enter Feedback"
        color="black"
        placeholderTextColor="black"

      />
      <Button title="Submit" color="green"style={{borderRadius:"10px"}} onPress={handleSubmit} />
     

      </View>
      
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


export default Addfeedback;