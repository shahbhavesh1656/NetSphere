import { View,Text, StyleSheet,Button } from "react-native";
import AboutUs from "../About/About";
// const Drawer = createDrawerNavigator();
const CustomerHomePage = ({navigation})=>{

    return(
        <View style={styles.Container}>
          
            <Text style={styles.Text}>CUSTOMER HOME PAGE</Text>

              <Button title="About Us" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("AboutUs")}/>
 <Button title="Connection" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("Connection")}/>
  <Button title="Lodge Greviance" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("LodgeGreviance")}/>
          <Button title="Give Feedback" color="green"style={{borderRadius:"10px"}}onPress={()=>navigation.navigate("GiveFeedback")}/>
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
export default CustomerHomePage;