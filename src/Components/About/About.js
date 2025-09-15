import { View, StyleSheet, ScrollView,Button } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"
import { Divider } from "react-native-paper";
;

const AboutUs = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
           <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>SUBSCRIPTION PLANS</Text>
            <Text/>
              <Divider/>
              <Text/>
           <View style={{padding:10,marginTop:10}}>
              <Button
                title="Package-1"
                color="green"
                style={{ borderRadius: "10px", }}
                onPress={() => {
                  navigation.navigate("PackageDetails", { id: "p1" });
                }}
              />
              <Text/>
              <Button
                title="Package-2"
                color="green"
                style={{ borderRadius: "10px",}}
                onPress={() => {
                  navigation.navigate("PackageDetails", { id: "p2" });
                }}
              />
               <Text/>
              <Button
                title="Package-3"
                color="green"
                style={{ borderRadius: "10px" }}
                onPress={() => {
                  navigation.navigate("PackageDetails", { id: "p3" });
                }}
              />
               <Text/>
              <Button
                title="Package-4"
                color="green"
                style={{ borderRadius: "10px" }}
                onPress={() => {
                  navigation.navigate("PackageDetails", { id: "p4" });
                }}
              />
         </View>
         <Text/>
         <Text/>
         <Divider/>
              <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>OFFICE DETAILS</Text>
              <Text/>
              <Divider/>
              <Text/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Name :- ABHISHEK MISHRA</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Office Name :- City Cable</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>
                Address :- Office No.2, PP Chamber, City Cable, Patharali Road
                Near Manse Office, Dombivli East 421201
              </Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Contact :- 9321386407</Text>
           
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: 22,
    textAlign: "center",
    color: "black"
  },
  Text1: {
    fontSize: 19,
    textAlign: "center",
    color: "black"
  }
});
export default AboutUs;
