import React,{useState} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

const SelectConnection = ({navigation})=>{
    const user = useSelector((state)=>state.customer.value);
    const connData = useSelector((state)=>state.bookconnection.value)
    const [check, setcheck] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = ()=>{
         dispatch(getBookedConnectionData({
             name: user.name,
      email: user.email,
      address: user.address,
      area:connData.area,
      mobile: user.mobile,
      connection_name:check,
      connection_mode:"",
      plan_name:"",
      subscription:"",
      payment_status:"",
      connection_status:"",
        }))
        navigation.navigate("SelectConnectionMode")
    }
    return(
        <View style={styles.Container}>
          <Image source={{uri:""}}style={{
marginLeft:"auto",
marginRight:"auto",
width: 100,
    height: 100,
    resizeMode: 'contain',
  }}/>
            <Text style={styles.Text}>CHOOSE CONNECTION</Text>
            <View style={styles.RadioButtonGroup}>
       <View style={styles.RadioButton}>

              <RadioButton value="CABLE CONNECTION"status={check=='CABLE CONNECTION'?'checked':'unchecked'}onPress={()=>setcheck('CABLE CONNECTION')} color="black"/>
 <Text style={styles.Text1}>CABLE CONNECTION</Text>
        </View> 
        <View style={styles.RadioButton}>
                         <RadioButton value="WIFI CONNECTION"status={check=='WIFI CONNECTION'?'checked':'unchecked'}onPress={()=>setcheck('WIFI CONNECTION')}/>

             <Text style={styles.Text1}>WIFI CONNECTION</Text>

            </View>   
           

      </View>
       <Button title="NEXT" color="green"style={{borderRadius:"10px"}} onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        margin:"auto",
        display:"flex",
        flexDirection:"column",
        gap:50
        ,padding:20
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


export default SelectConnection;