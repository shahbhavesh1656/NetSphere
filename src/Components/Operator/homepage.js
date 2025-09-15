import React,{useState} from "react";
import {StyleSheet,Text,View,TextInput,Button,Image,ScrollView} from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const OperatorHomePage = ({navigation})=>{
    
    return(
         <SafeAreaView>
             <ScrollView>
        <View style={styles.Container}>
           
               
          <Image source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}style={{
marginLeft:"auto",
marginRight:"auto",
width: 100,
    height: 100,
    resizeMode: 'contain',
  }}/>
            <Text style={styles.Text}>OPERATOR HOME PAGE</Text>
               <Button title="SUBSCRIPTION" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("ViewSubscription")}} />
       <Button title="FEEDBACK" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("Viewfeedback")}} />

       <Button title="GREVIANCES" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("GrevianceList")}} />
        <Button title="EMPLOYEES" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("EmployeeList")}} />

        <Button title="CUSTOMERS" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("CustomerList")}} />
        <Button title="INVENTORY MANAGEMENT" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("InventoryList")}} />
        <Button title="SEND EMAIL TO CUSTOMER" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("SendOffer")}} />
               <Button title="EMPLOYEE ATTENDANCE" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("Employeeattendance")}} />
               <Button title="REPORT GENERATION" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("GenerateReport")}} />

       <Button title="LOGOUT" color="green"style={{borderRadius:"10px"}} onPress={()=>{navigation.navigate("Home")}} />
      
      
        </View>
         </ScrollView>
         </SafeAreaView>
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


export default OperatorHomePage;