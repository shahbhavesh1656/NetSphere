import React,{useState} from "react";
import {StyleSheet,Text,View,Button,Image} from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

const SelectArea = ({navigation})=>{
    const [check, setcheck] = useState("");
    const user = useSelector((state)=>state.customer.value);
    const dispatch = useDispatch();
    const handleSubmit = ()=>{
        dispatch(getBookedConnectionData({
             name: user.name,
      email: user.email,
      address: user.address,
      area:check,
      mobile: user.mobile,
      connection_name:"",
      connection_mode:"",
      plan_name:"",
      subscription:"",
      payment_status:"",
      connection_status:"",
        }))
       navigation.navigate("SelectConnection")
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
            <Text style={styles.Text}>CHOOSE AREA</Text>
            <View style={styles.RadioButtonGroup}>
       <View style={styles.RadioButton}>

              <RadioButton value="PATHARLI"status={check=='PATHARLI'?'checked':'unchecked'}onPress={()=>setcheck('PATHARLI')} color="black"/>
 <Text style={styles.Text1}>PATHARLI</Text>
        </View> 
        <View style={styles.RadioButton}>
                         <RadioButton value="RAM NAGAR"status={check=='RAM NAGAR'?'checked':'unchecked'}onPress={()=>setcheck('RAM NAGAR')}/>

             <Text style={styles.Text1}>RAM NAGAR</Text>

            </View>   
            <View style={styles.RadioButton}>
                             <RadioButton value="PENDSE NAGAR"status={check=='PENDSE NAGAR'?'checked':'unchecked'}onPress={()=>setcheck('PENDSE NAGAR')}/>
      <Text style={styles.Text1}>PENDSE NAGAR</Text>

            </View>

      <View style={styles.RadioButton}>
                             <RadioButton value="TILAK NAGAR"status={check=='TILAK NAGAR'?'checked':'unchecked'}onPress={()=>setcheck('TILAK NAGAR')}/>
      <Text style={styles.Text1}>TILAK NAGAR</Text>

            </View>
 <View style={styles.RadioButton}>
                             <RadioButton value="GOPAL NAGAR"status={check=='GOPAL NAGAR'?'checked':'unchecked'}onPress={()=>setcheck('GOPAL NAGAR')}/>
      <Text style={styles.Text1}>GOPAL NAGAR</Text>

            </View>

      </View>
       <Button title="NEXT" color="green"style={{borderRadius:"10px"}} onPress={handleSubmit} />
              <Button title="CONNECTION HISTORY" color="green"style={{borderRadius:"10px"}} onPress={()=>navigation.navigate("ViewConnectionHistory")} />

        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        margin:"auto",
        display:"flex",
        flexDirection:"column",
        gap:50,
        padding:20
    },
    Text:{
        fontSize:22,
        textAlign:"center",
        color:"black"
    },
    RadioButton:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
     RadioButtonGroup:{
       gap:10
    },
    Text1:{
        fontSize:19,
        color:"black"
    }
    
 
})


export default SelectArea;