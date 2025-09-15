import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

const Paymentreceipt = ({ navigation }) => {
  let today = new Date().toLocaleDateString();

  const user = useSelector(state => state.customer.value);
  const conn = useSelector(state => state.bookconnection.value);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Divider />
          <Text />
          <Text
            style={{
              textAlign: "center",
              margin: 10,
              fontSize: 26,
              color: "black"
            }}
          >
            CASH RECEIPT
          </Text>
          <Text />
          <Divider />
          <Text />
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            name: {user.name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            mobile: {user.mobile}
          </Text>
          <Text />
          <Divider />
          <Text />
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Amount: {conn.amount}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Status: {conn.payment_status}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Date: {today}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Payment mode: Card
          </Text>
          <Text />
          <Divider />
          <Text />
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Area: {conn.area}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Type: {conn.connection_name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Mode: {conn.connection_mode}
          </Text>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              fontSize: 22,
              color: "black"
            }}
          >
            Package: {conn.package}
          </Text>
          <Text />
          <Divider />
          <Text />
          <Button
            title="Back To Home"
            color="black"
            style={{ borderRadius: "10px" }}
            onPress={() => navigation.navigate("CustomerHomePage")}
          />
          <Text />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 0,
    backgroundColor: "yellow"
  }
});
export default Paymentreceipt;
