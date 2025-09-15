import React,{useState} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { DB_NAME } from "../../../../config";
import { getOperatorData } from "../../../../Stores/Reducers/operator";
import { useDispatch } from "react-redux";
let db= openDatabase({name:DB_NAME})
const Login = ({navigation})=>{
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
     const handleSubmit = (e)=>{
      e.preventDefault();
      if(email==="" || password===""){
        alert("please fill all fields")
      }else{
        db.transaction(txn => {
        txn.executeSql(
          "SELECT * FROM table_operator WHERE email=? AND password=?",
          [email, password],
          (tx, res) => {
            for (let i = 0; i < res.rows.length; ++i) {
              console.log(res.rows.item(i).name);
              dispatch(
                getOperatorData({
                  name: res.rows.item(i).name,
                  email: res.rows.item(i).email,
                  password: res.rows.item(i).password,
                  address: res.rows.item(i).address,
                  mobile: res.rows.item(i).mobile
                })
              );
            }
            console.log("item:", res.rows.length);
            if (res.rows.length == 0) {
              alert("No user exists");
            } else {
              navigation.navigate("OperatorHomePage");
            }
          },
          error => {
            alert("Something happens ! Please try again later.");
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
            <Text style={styles.Text}>OPERATOR LOGIN</Text>
            <View>
           
        <TextInput
        style={styles.input}
        onChangeText={txt=>setemail(txt)}
        color="black"
        value={email}
        placeholder="Enter Email"
                placeholderTextColor="black"

      />
        <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={txt=>setpassword(txt)}
        value={password}
        color="black"
        placeholder="Enter Password"
        placeholderTextColor="black"

      />
       
      <Button title="Login" color="green"style={{borderRadius:"10px"}} onPress={handleSubmit} />
     

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
    
     input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:10,
  },
 
})


export default Login;