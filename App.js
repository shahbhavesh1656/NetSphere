/**
 * App.js - Main Navigation Setup
 */
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Theme
import { ThemeProvider, useTheme } from "./src/theme";

// Reducers
import customer from "./src/Stores/Reducers/customer";
import employee from "./src/Stores/Reducers/employee";
import operator from "./src/Stores/Reducers/operator";
import bookConnectionReducer from "./src/Stores/Reducers/book_connection";

// Screens
import Home from "./src/Components/Home/Home";

// Auth
import Login from "./src/Components/Auth/Customer/Login/Login";
import Employeelogin from "./src/Components/Auth/Employee/Login/Login";
import Operatorlogin from "./src/Components/Auth/Operator/Login/Login";
import Signup from "./src/Components/Auth/Customer/Signup/Signup";
import EmployeeSignup from "./src/Components/Auth/Employee/Signup/Signup";
import OperatorSignup from "./src/Components/Auth/Operator/Signup/Signup";

// Customer
import CustomerHomePage from "./src/Components/Customer/homepage";
import AboutUs from "./src/Components/About/About";
import SelectArea from "./src/Components/Connection/selectarea";
import Filecomplaint from "./src/Components/Customer/filecomplaint";
import Addfeedback from "./src/Components/Customer/addfeedback";
import Viewcomplaints from "./src/Components/Customer/viewcomplaints";
import SelectConnection from "./src/Components/Connection/selectconnection";
import SelectConnectionMode from "./src/Components/Connection/selectconnectionmode";
import Bookconnection from "./src/Components/Connection/book_connection";
import Viewconnectionhistory from "./src/Components/Connection/viewconnectionhistory";

// Operator
import OperatorHomePage from "./src/Components/Operator/homepage";
import Viewfeedback from "./src/Components/Operator/Viewfeedback";
import EmployeeList from "./src/Components/Operator/employeelist";
import Addemployee from "./src/Components/Operator/addemployee";
import CustomerList from "./src/Components/Operator/customerlist";
import AddCustomer from "./src/Components/Operator/addcustomer";
import Viewgreviance from "./src/Components/Operator/Viewgreviance";
import Viewsubscription from "./src/Components/Operator/Viewsubscription";
import InventoryList from "./src/Components/Operator/inventorylist";
import Addproduct from "./src/Components/Operator/addproduct";
import Sendoffer from "./src/Components/Operator/sendoffer";
import Viewemployeeattendance from "./src/Components/Operator/Viewemployeeattendance";

// Employee
import EmployeeHomePage from "./src/Components/Employee/homepage";
import Addcomplaint from "./src/Components/Employee/addcomplaint";
import Viewallgreviances from "./src/Components/Employee/viewcomplaints";
import ViewEmployeesubscription from "./src/Components/Employee/Viewsubscription";
import Addattendance from "./src/Components/Employee/addattendance";
import Viewattendance from "./src/Components/Employee/viewattendance";

// Other Screens
import Packagedetails from "./src/Components/About/packagedetails";
import GenerateReport from "./src/Components/Pdf/generate_pdf";
import FakePayment from "./src/Components/Payment/FakePayment";
import PaymentSummary from "./src/Components/Payment/PaymentSummary";
import PaymentReceipt from "./src/Components/Receipt/payment_receipt";

// Redux Store
const store = configureStore({
  reducer: {
    customer,
    employee,
    operator,
    bookconnection: bookConnectionReducer,
  },
});

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { colors } = useTheme();

  const defaultHeaderOptions = {
    headerStyle: {
      backgroundColor: "#3B82F6",
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      height: 90,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    headerTintColor: "#FFFFFF",
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: "700",
      fontFamily: "Poppins-Bold",
    },
  };

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          primary: "#3B82F6",
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home" screenOptions={defaultHeaderOptions}>
        {/* Common */}
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: "NET SPHERE" }} />

        {/* Auth */}
        <Stack.Screen name="CustomerLogin" component={Login} options={{ headerTitle: "CUSTOMER LOGIN" }} />
        <Stack.Screen name="OperatorLogin" component={Operatorlogin} options={{ headerTitle: "OPERATOR LOGIN" }} />
        <Stack.Screen name="EmployeeLogin" component={Employeelogin} options={{ headerTitle: "EMPLOYEE LOGIN" }} />
        <Stack.Screen name="CustomerSignup" component={Signup} options={{ headerTitle: "CREATE CUSTOMER" }} />
        <Stack.Screen name="EmployeeSignup" component={EmployeeSignup} options={{ headerTitle: "CREATE EMPLOYEE" }} />
        <Stack.Screen name="OperatorSignup" component={OperatorSignup} options={{ headerTitle: "CREATE OPERATOR" }} />

        {/* Customer */}
        <Stack.Screen name="CustomerHomePage" component={CustomerHomePage} options={{ headerTitle: "CUSTOMER PAGE" }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerTitle: "ABOUT US" }} />
        <Stack.Screen name="Connection" component={SelectArea} options={{ headerTitle: "SELECT AREA" }} />
        <Stack.Screen name="LodgeGreviance" component={Filecomplaint} options={{ headerTitle: "FILE COMPLAINT" }} />
        <Stack.Screen name="GiveFeedback" component={Addfeedback} options={{ headerTitle: "GIVE FEEDBACK" }} />
        <Stack.Screen name="ViewComplaintStatus" component={Viewcomplaints} options={{ headerTitle: "YOUR COMPLAINTS" }} />
        <Stack.Screen name="SelectConnection" component={SelectConnection} options={{ headerTitle: "SELECT CONNECTION" }} />
        <Stack.Screen name="SelectConnectionMode" component={SelectConnectionMode} options={{ headerTitle: "SELECT MODE" }} />
        <Stack.Screen name="BookConnection" component={Bookconnection} options={{ headerTitle: "BOOK CONNECTION" }} />
        <Stack.Screen name="ViewConnectionHistory" component={Viewconnectionhistory} options={{ headerTitle: "CONNECTION HISTORY" }} />

        {/* Operator */}
        <Stack.Screen name="OperatorHomePage" component={OperatorHomePage} options={{ headerTitle: "OPERATOR PAGE" }} />
        <Stack.Screen name="Viewfeedback" component={Viewfeedback} options={{ headerTitle: "CUSTOMER FEEDBACK" }} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} options={{ headerTitle: "EMPLOYEE LIST" }} />
        <Stack.Screen name="AddEmployee" component={Addemployee} options={{ headerTitle: "ADD EMPLOYEE" }} />
        <Stack.Screen name="CustomerList" component={CustomerList} options={{ headerTitle: "CUSTOMER LIST" }} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerTitle: "ADD CUSTOMER" }} />
        <Stack.Screen name="GrevianceList" component={Viewgreviance} options={{ headerTitle: "GREVIANCE LIST" }} />
        <Stack.Screen name="ViewSubscription" component={Viewsubscription} options={{ headerTitle: "SUBSCRIPTION LIST" }} />
        <Stack.Screen name="InventoryList" component={InventoryList} options={{ headerTitle: "INVENTORY LIST" }} />
        <Stack.Screen name="AddProduct" component={Addproduct} options={{ headerTitle: "ADD PRODUCT" }} />
        <Stack.Screen name="SendOffer" component={Sendoffer} options={{ headerTitle: "SEND OFFER" }} />
        <Stack.Screen name="Employeeattendance" component={Viewemployeeattendance} options={{ headerTitle: "EMPLOYEE ATTENDANCE" }} />

        {/* Employee */}
        <Stack.Screen name="EmployeeHomePage" component={EmployeeHomePage} options={{ headerTitle: "EMPLOYEE HOME" }} />
        <Stack.Screen name="AddComplaints" component={Addcomplaint} options={{ headerTitle: "ADD COMPLAINTS" }} />
        <Stack.Screen name="ViewComplaints" component={Viewallgreviances} options={{ headerTitle: "CUSTOMER COMPLAINTS" }} />
        <Stack.Screen name="ViewEmployeeSubscription" component={ViewEmployeesubscription} options={{ headerTitle: "YOUR WORKS" }} />
        <Stack.Screen name="Addattendance" component={Addattendance} options={{ headerTitle: "ADD ATTENDANCE" }} />
        <Stack.Screen name="Viewattendance" component={Viewattendance} options={{ headerTitle: "YOUR ATTENDANCE" }} />

        {/* Other */}
        <Stack.Screen name="PackageDetails" component={Packagedetails} options={{ headerTitle: "PACKAGE DETAILS" }} />
        <Stack.Screen name="GenerateReport" component={GenerateReport} options={{ headerTitle: "GENERATE REPORT" }} />
        <Stack.Screen name="FakePayment" component={FakePayment} options={{ headerTitle: "PAYMENT GATEWAY" }} />
        <Stack.Screen name="PaymentSummary" component={PaymentSummary} options={{ headerTitle: "PAYMENT SUMMARY" }} />
        <Stack.Screen name="PaymentReceipt" component={PaymentReceipt} options={{ headerTitle: "PAYMENT RECEIPT" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </Provider>
  );
}
