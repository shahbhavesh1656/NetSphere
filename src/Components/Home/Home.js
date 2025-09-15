import React,{useState} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image} from "react-native";
import { RadioButton } from "react-native-paper";

const Home = ({navigation})=>{
    const [check, setcheck] = useState("");
    const handleSubmit = ()=>{
        if(check=="customer"){
            navigation.navigate("CustomerSignup")
        }
        else if(check=="employee"){
            navigation.navigate("EmployeeSignup");
        }else{
            navigation.navigate("OperatorSignup");
        }
    }
    return(
        <View style={styles.Container}>
          <Image source={{uri:"https://overwhelming-purple-opksos4huy.edgeone.app/IMG-20250909-WA0005.jpg"}}style={{
marginLeft:"auto",
marginRight:"auto",
width: 100,
    height: 100,
    resizeMode: 'contain',
  }}/>
            <Text style={styles.Text}>CHOOSE ROLE</Text>
            <View style={styles.RadioButtonGroup}>
       <View style={styles.RadioButton}>

              <RadioButton value="customer"status={check=='customer'?'checked':'unchecked'}onPress={()=>setcheck('customer')} color="black"/>
 <Text style={styles.Text1}>CUSTOMER</Text>
        </View> 
        <View style={styles.RadioButton}>
                         <RadioButton value="employee"status={check=='employee'?'checked':'unchecked'}onPress={()=>setcheck('employee')}/>

             <Text style={styles.Text1}>EMPLOYEE</Text>

            </View>   
            <View style={styles.RadioButton}>
                             <RadioButton value="operator"status={check=='operator'?'checked':'unchecked'}onPress={()=>setcheck('operator')}/>
      <Text style={styles.Text1}>OPERATOR</Text>

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


export default Home;