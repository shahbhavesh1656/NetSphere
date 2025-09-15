/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *+
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from 'react';
import Login from './src/Components/Auth/Customer/Login/Login';
import Employeelogin from './src/Components/Auth/Employee/Login/Login';
import Operatorlogin from './src/Components/Auth/Operator/Login/Login';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Signup from './src/Components/Auth/Customer/Signup/Signup';
import EmployeeSignup from './src/Components/Auth/Employee/Signup/Signup';
import OperatorSignup from './src/Components/Auth/Operator/Signup/Signup';
import Home from './src/Components/Home/Home';
import customer from './src/Stores/Reducers/customer';
import employee from './src/Stores/Reducers/employee';
import operator from './src/Stores/Reducers/operator';
import CustomerHomePage from './src/Components/Customer/homepage';
import AboutUs from './src/Components/About/About';
import SelectArea from './src/Components/Connection/selectarea';
import Filecomplaint from './src/Components/Customer/filecomplaint';
import Addfeedback from './src/Components/Customer/addfeedback';
import Viewcomplaints from './src/Components/Customer/viewcomplaints';
import SelectConnection from './src/Components/Connection/selectconnection';
import SelectConnectionMode from './src/Components/Connection/selectconnectionmode';
import Bookconnection from './src/Components/Connection/book_connection';
import book_connection from './src/Stores/Reducers/book_connection';
import Viewconnectionhistory from './src/Components/Connection/viewconnectionhistory';
import OperatorHomePage from './src/Components/Operator/homepage';
import Viewfeedback from './src/Components/Operator/Viewfeedback';
import EmployeeList from './src/Components/Operator/employeelist';
import Addemployee from './src/Components/Operator/addemployee';
import CustomerList from './src/Components/Operator/customerlist';
import AddCustomer from './src/Components/Operator/addcustomer';
import Viewgreviance from './src/Components/Operator/Viewgreviance';
import Viewsubscription from './src/Components/Operator/Viewsubscription';
import EmployeeHomePage from './src/Components/Employee/homepage';
import Addcomplaint from './src/Components/Employee/addcomplaint';
import Viewallgreviances from './src/Components/Employee/viewcomplaints';
import ViewEmployeesubscription from './src/Components/Employee/Viewsubscription';
import InventoryList from './src/Components/Operator/inventorylist';
import Addproduct from './src/Components/Operator/addproduct';
import Sendoffer from './src/Components/Operator/sendoffer';
import Paymentreceipt from './src/Components/Receipt/payment_receipt';
import Addattendance from './src/Components/Employee/addattendance';
import Viewattendance from './src/Components/Employee/viewattendance';
import Viewemployeeattendance from './src/Components/Operator/Viewemployeeattendance';
import Packagedetails from './src/Components/About/packagedetails';
import GenerateReport from './src/Components/Pdf/generate_pdf';
const store = configureStore({
  reducer:{
    customer:customer,
    employee:employee,
    operator:operator,
    bookconnection:book_connection
  }
})
const Stack = createNativeStackNavigator();
function App() {

  return(
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/Home">
        <Stack.Screen name="Home"component={Home}options={{headerTitle:"NET SPHERE",headerTitleAlign:"center"}}/>
        <Stack.Screen name="PaymentReceipt"component={Paymentreceipt}options={{headerShown:false}}/>
        <Stack.Screen name='CustomerLogin'component={Login}options={{headerTitle:"CUSTOMER LOGIN",headerTitleAlign:"center"}} />
        <Stack.Screen name='OperatorLogin'component={Operatorlogin}options={{headerTitle:"OPERATOR LOGIN",headerTitleAlign:"center"}} />
        <Stack.Screen name='EmployeeLogin'component={Employeelogin}options={{headerTitle:"EMPLOYEE LOGIN",headerTitleAlign:"center"}} />
        <Stack.Screen name='CustomerSignup'component={Signup}options={{headerTitle:"CREATE CUSTOMER",headerTitleAlign:"center"}} />
        <Stack.Screen name='EmployeeSignup'component={EmployeeSignup}options={{headerTitle:"CREATE EMPLOYEE",headerTitleAlign:"center"}} />
        <Stack.Screen name='OperatorSignup'component={OperatorSignup}options={{headerTitle:"CREATE OPERATOR",headerTitleAlign:"center"}} />
        <Stack.Screen name='CustomerHomePage'component={CustomerHomePage}options={{headerTitle:"CUSTOMER PAGE",headerTitleAlign:"center"}} />
        <Stack.Screen name='AboutUs'component={AboutUs}options={{headerTitle:"ABOUT US",headerTitleAlign:"center"}} />
        <Stack.Screen name='Connection'component={SelectArea}options={{headerTitle:"SELECT AREA",headerTitleAlign:"center"}} />
        <Stack.Screen name='LodgeGreviance' component={Filecomplaint} options={{headerTitle:"FILE COMPLAINT",headerTitleAlign:"center"}}/>
        <Stack.Screen name='GiveFeedback' component={Addfeedback}options={{headerTitle:"GIVE FEEDBACK",headerTitleAlign:"center"}}/>
        <Stack.Screen name='ViewComplaintStatus' component={Viewcomplaints}options={{headerTitle:"YOUR COMPLAINTS",headerTitleAlign:"center"}}/>
        <Stack.Screen name='SelectConnection' component={SelectConnection}options={{headerTitle:"SELECT CONNECTION",headerTitleAlign:"center"}}/>
        <Stack.Screen name='SelectConnectionMode' component={SelectConnectionMode}options={{headerTitle:"SELECT MODE",headerTitleAlign:"center"}}/>
        <Stack.Screen name='BookConnection' component={Bookconnection}options={{headerTitle:"BOOK CONNECTION",headerTitleAlign:"center"}}/>
        <Stack.Screen name='ViewConnectionHistory' component={Viewconnectionhistory}options={{headerTitle:"CONNECTION HISTORY",headerTitleAlign:"center"}}/>
        <Stack.Screen name='OperatorHomePage' component={OperatorHomePage}options={{headerTitle:"OPERATOR PAGE",headerTitleAlign:"center"}}/>
        <Stack.Screen name='Viewfeedback' component={Viewfeedback}options={{headerTitle:"CUSTOMER FEEDBACK",headerTitleAlign:"center"}}/>
        <Stack.Screen name='EmployeeList' component={EmployeeList}options={{headerTitle:"EMPLOYEE LIST",headerTitleAlign:"center"}}/>
        <Stack.Screen name='AddEmployee' component={Addemployee}options={{headerTitle:"ADD EMPLOYEE",headerTitleAlign:"center"}}/>
        <Stack.Screen name='CustomerList' component={CustomerList}options={{headerTitle:"CUSTOMER LIST",headerTitleAlign:"center"}}/>
        <Stack.Screen name='AddCustomer' component={AddCustomer}options={{headerTitle:"ADD CUSTOMER",headerTitleAlign:"center"}}/>
        <Stack.Screen name='GrevianceList' component={Viewgreviance}options={{headerTitle:"GREVIANCE LIST",headerTitleAlign:"center"}}/>
        <Stack.Screen name='ViewSubscription' component={Viewsubscription}options={{headerTitle:"SUBSCRIPTION LIST",headerTitleAlign:"center"}}/>
        <Stack.Screen name='EmployeeHomePage' component={EmployeeHomePage}options={{headerTitle:"EMPLOYEE HOME",headerTitleAlign:"center"}}/>
        <Stack.Screen name='AddComplaints' component={Addcomplaint}options={{headerTitle:"ADD COMPLAINTS",headerTitleAlign:"center"}}/>
        <Stack.Screen name='ViewComplaints' component={Viewallgreviances}options={{headerTitle:"CUSTOMER COMPLAINTS",headerTitleAlign:"center"}}/>
        <Stack.Screen name='ViewEmployeeSubscription' component={ViewEmployeesubscription}options={{headerTitle:"YOUR WORKS",headerTitleAlign:"center"}}/>
        <Stack.Screen name='InventoryList' component={InventoryList}options={{headerTitle:"INVENTORY LIST",headerTitleAlign:"center"}}/>
        <Stack.Screen name='AddProduct' component={Addproduct}options={{headerTitle:"ADD PRODUCT",headerTitleAlign:"center"}}/>
        <Stack.Screen name='SendOffer' component={Sendoffer}options={{headerTitle:"SEND OFFER",headerTitleAlign:"center"}}/>
        <Stack.Screen name='Addattendance' component={Addattendance}options={{headerTitle:"ADD ATTENDANCE",headerTitleAlign:"center"}}/>
        <Stack.Screen name='Viewattendance' component={Viewattendance}options={{headerTitle:"YOUR ATTENDANCE",headerTitleAlign:"center"}}/>
        <Stack.Screen name='Employeeattendance' component={Viewemployeeattendance}options={{headerTitle:"EMPLOYEE ATTENDANCE",headerTitleAlign:"center"}}/>
        <Stack.Screen name='PackageDetails' component={Packagedetails}options={{headerTitle:"PACKAGE DETAILS",headerTitleAlign:"center"}}/>
        <Stack.Screen name='GenerateReport' component={GenerateReport}options={{headerTitle:"GENERATE REPORT",headerTitleAlign:"center"}}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}
export default App;
