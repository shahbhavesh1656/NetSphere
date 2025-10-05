import React,{useState} from "react";
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { DB_NAME } from "../../../../config";
import { getOperatorData } from "../../../../Stores/Reducers/operator";
import { useDispatch } from "react-redux";

let db= openDatabase({name:DB_NAME})

const Login = ({navigation})=>{
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(email==="" || password===""){
        alert("please fill all fields")
      }else{
        db.transaction(txn => {
        txn.executeSql(
          "SELECT * FROM table_operator WHERE email=? AND password=?",
          [email, password],
          (tx, res) => {
            for (let i = 0; i < res.rows.length; ++i) {
              console.log(res.rows.item(i).name);
              dispatch(
                getOperatorData({
                  name: res.rows.item(i).name,
                  email: res.rows.item(i).email,
                  password: res.rows.item(i).password,
                  address: res.rows.item(i).address,
                  mobile: res.rows.item(i).mobile
                })
              );
            }
            console.log("item:", res.rows.length);
            if (res.rows.length == 0) {
              alert("No user exists");
            } else {
              navigation.navigate("OperatorHomePage");
            }
          },
          error => {
            alert("Something happens ! Please try again later.");
          }
        );
      });
      }
    }

    return(
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image 
                source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}
                style={styles.logo}
              />
            </View>

            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Operator Access</Text>
              <Text style={styles.subtitle}>Network operations center</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={txt=>setemail(txt)}
                  value={email}
                  placeholder="Operator email"
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={txt=>setpassword(txt)}
                  value={password}
                  placeholder="Security code"
                  placeholderTextColor="#6B7280"
                />
              </View>

              {/* Login Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Access Control Panel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 32,
        shadowColor: '#1E293B',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 12,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#64748B',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
    formContainer: {
        gap: 24,
    },
    inputContainer: {
        marginBottom: 4,
    },
    input: {
        height: 60,
        backgroundColor: '#F8FAFC',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#1E293B',
        fontFamily: 'Poppins-Regular',
        shadowColor: '#E2E8F0',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    loginButton: {
        height: 60,
        backgroundColor: '#3B82F6',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 0.5,
    },
})

export default Login;