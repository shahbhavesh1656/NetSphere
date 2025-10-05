import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../../../config";

let db = openDatabase({ name: DB_NAME });

const Signup = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [mobile, setmobile] = useState("");

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_operator'",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
          }
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_operator(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),password VARCHAR(50), address VARCHAR(100),mobile VARCHAR(12))",
              []
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      address === "" ||
      mobile === ""
    ) {
      alert("please fill all fields");
    } else if (email.slice(-10) != "@gmail.com") {
      alert("enter valid email");
    } else if (mobile.length < 10 || mobile.length > 10) {
      alert("mobile number must have 10 digits");
    } else {
      db.transaction(function(tx) {
        tx.executeSql(
          "INSERT INTO table_operator (name, email,password, address, mobile) VALUES (?,?,?,?,?)",
          [name, email, password, address, mobile],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert("Operator Created Successfully");
            } else alert("Registration Failed");
          },
          error => {
            console.log(error);
          }
        );
      });
    }
  };

  const handleusernamechange = input => {
    const newText = input.replace(/[^A-Za-z]/g, "");
    setname(newText);
  };

  const handleaddresschange = input => {
    const newText = input.replace(/[^A-Za-z]/g, "");
    setaddress(newText);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"
              }}
              style={styles.logo}
            />
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Network Operator</Text>
            <Text style={styles.subtitle}>Register for system access</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleusernamechange}
                placeholderTextColor="#64748B"
                value={name}
                placeholder="Full Name"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={txt => setemail(txt)}
                value={email}
                placeholder="Professional Email"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={txt => setpassword(txt)}
                value={password}
                secureTextEntry={true}
                placeholder="Security Code"
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleaddresschange}
                value={address}
                placeholder="Work Address"
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={txt => setmobile(txt)}
                value={mobile}
                placeholder="Contact Number"
                placeholderTextColor="#64748B"
                keyboardType="phone-pad"
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
              <Text style={styles.signupButtonText}>Register Operator</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginLinkContainer}
              onPress={() => navigation.navigate("OperatorLogin")}
            >
              <Text style={styles.loginLinkText}>
                Already registered? <Text style={styles.loginLink}>Access Panel</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
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
    gap: 20,
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
  signupButton: {
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
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    color: '#3B82F6',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Signup;