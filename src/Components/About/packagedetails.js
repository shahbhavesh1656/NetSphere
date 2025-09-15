import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Packagedetails = ({navigation}) => {
    const route = useRoute();
    const id = route.params?.id;
    console.log(id);

  return (
    <SafeAreaView>
      <ScrollView>
       {id=="p1"? <View>
          <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>ENTERTAINMENT</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Star Plus</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony sab</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Colors</Text>
            <Text/>
            <Divider/>
            <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>KIDS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Hungama</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Disney</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Cartoon network</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Pogo</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>MUSIC</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Zoom</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee Music Company</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>India Today</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>NDTV</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>NEWS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Aaj Tak</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee news</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony Music India</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Eros Now Music</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>OTHERS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Discovery</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>TLC</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Animal Planet</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Food Network</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>HGTV</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>RELIGIOUS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Krishna Vani</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Ishwar TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee Salaam</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Divya TV</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>Cost :- RS. 400</Text>
              <Text/>
              <Divider/>
        </View>
        :id=="p2"?
        <View>
          <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>ENTERTAINMENT</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Star Plus</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony sab</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Colors</Text>
            <Text/>
            <Divider/>
            <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>KIDS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Hungama</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Disney</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Cartoon network</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Pogo</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>MUSIC</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Zoom</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee Music Company</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony Music India</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Eros Now Music</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>NEWS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Aaj Tak</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee news</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>India Today</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>NDTV</Text>
            <Text/>
           
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>Cost :- RS. 350</Text>
              <Text/>
              <Divider/>
        </View>
        :id=="p3"?
    <View>
          <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>ENTERTAINMENT</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Star Plus</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony sab</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Colors</Text>
            <Text/>
            <Divider/>
            <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>KIDS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Hungama</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Disney</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Cartoon network</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Pogo</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>NEWS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Aaj Tak</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee news</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>India Today</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>NDTV</Text>
            <Text/>
           
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>Cost :- RS. 300</Text>
              <Text/>
              <Divider/>
        </View>
        :id=="p4"?
        <View>
          <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>ENTERTAINMENT</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Star Plus</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Sony sab</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Colors</Text>
            <Text/>
            <Divider/>
            <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>KIDS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Hungama</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Disney</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Cartoon network</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Pogo</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>MUSIC</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Zoom</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee Music Company</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>India Today</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>NDTV</Text>
            <Text/>
            <Divider/>
           
           
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>RELIGIOUS</Text>
              <Text/>
              <Divider/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:25}}>Krishna Vani</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Ishwar TV</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Zee Salaam</Text>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:18,marginTop:10}}>Divya TV</Text>
            <Text/>
            <Divider/>
             <Text variant="titleLarge"style={{textAlign:"center",marginTop:10}}>Cost :- RS. 250</Text>
              <Text/>
              <Divider/>
        </View>:""
    }
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
export default Packagedetails;
