import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";
let db= openDatabase({name:DB_NAME})
const Addproduct = ({navigation})=>{
    const [name, setname] = useState("");
   const [imageurl, setimageurl] = useState("");
   const [description, setdescription] = useState("");

    useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        // "SELECT * FROM table_user",
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_inventory'",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
          }
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
  }, []);
    const handleSubmit = (e)=>{
      e.preventDefault();
       if (
      name === "" ||
      imageurl === "" ||
      description === "" 
    
    ) {
      alert("please fill all fields");
    } else {
      db.transaction(function(tx) {
        tx.executeSql(
          "INSERT INTO table_inventory (product_name, imageurl,description) VALUES (?,?,?)",
          [name, imageurl, description],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert("Product Added Successfully");
            } else alert("Production Insertion Failed");
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
          <Image source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}style={{
marginLeft:"auto",
marginRight:"auto",
width: 100,
    height: 100,
    resizeMode: 'contain',
  }}/>
            <Text style={styles.Text}>ADD PRODUCT</Text>
            <View>
             <TextInput
        style={styles.input}
        onChangeText={txt=>setname(txt)}
        placeholderTextColor="black"
      color="black"
        value={name}
        placeholder="Enter Product Name"
      />
        <TextInput
        style={styles.input}
        onChangeText={txt=>setimageurl(txt)}
        color="black"
        value={imageurl}
        placeholder="Enter Image Url"
                placeholderTextColor="black"

      />
       
        <TextInput
        style={styles.input}
        onChangeText={txt=>setdescription(txt)}
        value={description}
        placeholder="Enter Product Description"
        color="black"
        placeholderTextColor="black"

      />
    
      <Button title="Save" color="green"style={{borderRadius:"10px"}} onPress={handleSubmit} />
     

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


export default Addproduct;