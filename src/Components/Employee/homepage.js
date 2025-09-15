import { View,Text, StyleSheet,Button } from "react-native";
import AboutUs from "../About/About";
// const Drawer = createDrawerNavigator();
const EmployeeHomePage = ({navigation})=>{

    return(
        <View style={styles.Container}>
          
            <Text style={styles.Text}>EMPLOYEE HOME PAGE</Text>

 <Button title="Subscription" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("ViewEmployeeSubscription")}/>
  <Button title="Lodge Greviance" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("ViewComplaints")}/>
 <Button title="Add Attendance" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("Addattendance")}/>
 <Button title="View Attendance" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("Viewattendance")}/>
<Button title="Logout" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("Home")}/>

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
})
export default EmployeeHomePage;