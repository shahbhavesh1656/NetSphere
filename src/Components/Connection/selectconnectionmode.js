import React,{useState} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBookedConnectionData } from "../../Stores/Reducers/book_connection";

const SelectConnectionMode = ({navigation})=>{
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
      connection_name:connData.connection_name,
      connection_mode:check,
      plan_name:"",
      subscription:"",
      payment_status:"",
      connection_status:"",
        }))
     navigation.navigate("BookConnection");   
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
            <Text style={styles.Text}>CHOOSE CONNECTION MODE</Text>
            <View style={styles.RadioButtonGroup}>
       <View style={styles.RadioButton}>

              <RadioButton value="NEW CONNECTION"status={check=='NEW CONNECTION'?'checked':'unchecked'}onPress={()=>setcheck('NEW CONNECTION')} color="black"/>
 <Text style={styles.Text1}>NEW CONNECTION</Text>
        </View> 
        <View style={styles.RadioButton}>
                         <RadioButton value="EXISTING CONNECTION"status={check=='EXISTING CONNECTION'?'checked':'unchecked'}onPress={()=>setcheck('EXISTING CONNECTION')}/>

             <Text style={styles.Text1}>EXISTING CONNECTION</Text>

            </View>   
           
<View style={styles.RadioButton}>
                         <RadioButton value="CONNECTION REMOVAL"status={check=='CONNECTION REMOVAL'?'checked':'unchecked'}onPress={()=>setcheck('CONNECTION REMOVAL')}/>

             <Text style={styles.Text1}>CONNECTION REMOVAL</Text>

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


export default SelectConnectionMode;