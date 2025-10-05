import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image,ScrollView} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DB_NAME } from "../../config";

let db= openDatabase({name:DB_NAME})

const Filecomplaint = ({navigation})=>{
    const [area, setarea] = useState("");
    const [complaint, setcomplaint] = useState("");
    const user = useSelector((state)=>state.customer.value);
    
    useEffect(() => {
        db.transaction(txn => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_complaints'",
            [],
            (tx, res) => {
              for (let i = 0; i < res.rows.length; ++i) {
                console.log(res.rows.item(i));
              }
              console.log("item:", res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql(
                  "CREATE TABLE IF NOT EXISTS table_complaints(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),complaint VARCHAR(400),status VARCHAR(30))",
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

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (area === "" || complaint === "") {
            alert("please fill all fields");
        } else {
            db.transaction(function(tx) {
                tx.executeSql(
                  "INSERT INTO table_complaints (name, email,address,area, mobile,complaint,status) VALUES (?,?,?,?,?,?,?)",
                  [user.name, user.email, user.address,area,user.mobile,complaint,"pending"],
                  (tx, results) => {
                    console.log("Results", results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      alert("Complaint Filed Successfully");
                      setarea("");
                      setcomplaint("");
                    } else alert("Insertion Failed");
                  },
                  error => {
                    console.log(error);
                  }
                );
            });
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Image 
                            source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}
                            style={styles.logo}
                        />
                        <Text style={styles.title}>File Complaint</Text>
                        <Text style={styles.subtitle}>We're here to help resolve your issues</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Service Area</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={txt=>setarea(txt)}
                                value={area}
                                placeholder="Enter your area"
                                placeholderTextColor="#64748B"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Complaint Details</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                onChangeText={txt=>setcomplaint(txt)}
                                value={complaint}
                                placeholder="Describe your issue in detail..."
                                placeholderTextColor="#64748B"
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity 
                            style={[styles.submitButton, (!area || !complaint) && styles.disabledButton]} 
                            onPress={handleSubmit}
                            disabled={!area || !complaint}
                        >
                            <Text style={styles.submitButtonText}>Submit Complaint</Text>
                        </TouchableOpacity>

                        {/* View Status Button */}
                        <TouchableOpacity 
                            style={styles.statusButton} 
                            onPress={() => navigation.navigate("ViewComplaintStatus")}
                        >
                            <Text style={styles.statusButtonText}>View Complaint Status</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    card: {
        backgroundColor: '#FFFFFF',
        margin: 20,
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
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 24,
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
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 12,
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
    textArea: {
        height: 120,
        paddingTop: 20,
        paddingBottom: 20,
    },
    submitButton: {
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
    disabledButton: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0.1,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 0.5,
    },
    statusButton: {
        height: 56,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#3B82F6',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusButtonText: {
        color: '#3B82F6',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
})

export default Filecomplaint;