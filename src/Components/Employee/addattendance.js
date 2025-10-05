import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,TouchableOpacity,Image,ScrollView} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DB_NAME } from "../../config";
import { Picker } from "@react-native-picker/picker";
import DateField from 'react-native-datefield';

let db= openDatabase({name:DB_NAME})

const Addattendance = ({navigation})=>{
    const user = useSelector((state)=>state.employee.value);
    const [date, setdate] = useState("");
    const [status, setstatus] = useState("");
    
    useEffect(() => {
        db.transaction(txn => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_attendance'",
            [],
            (tx, res) => {
              for (let i = 0; i < res.rows.length; ++i) {
                console.log(res.rows.item(i));
              }
              console.log("item:", res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql(
                  "CREATE TABLE IF NOT EXISTS table_attendance(emp_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(40), name VARCHAR(80), area VARCHAR(40), email VARCHAR(50),status VARCHAR(40))",
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
        if (date === "" || status === "") {
            alert("Please fill all fields");
        } else {
            db.transaction(function(tx) {
                tx.executeSql(
                  "INSERT INTO table_attendance (date, name, area, email, status) VALUES (?,?,?,?,?)",
                  [date,user.name,user.area,user.email,status],
                  (tx, results) => {
                    console.log("Results", results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      alert("Attendance Submitted Successfully");
                      setdate("");
                      setstatus("");
                    } else alert("Submission Failed");
                  },
                  error => {
                    console.log(error);
                  }
                );
            });
        }
    }

    const statusOptions = [
        { label: "Present", value: "present", icon: "✅", color: "#10B981" },
        { label: "Absent", value: "absent", icon: "❌", color: "#EF4444" }
    ];

    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-GB');
    };

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
                        <Text style={styles.title}>Mark Attendance</Text>
                        <Text style={styles.subtitle}>Record your daily attendance</Text>
                    </View>

                    {/* Employee Info */}
                    <View style={styles.employeeInfo}>
                        <Text style={styles.employeeInfoTitle}>Employee Details</Text>
                        <View style={styles.employeeCard}>
                            <View style={styles.employeeRow}>
                                <Text style={styles.employeeLabel}>Name:</Text>
                                <Text style={styles.employeeValue}>{user?.name}</Text>
                            </View>
                            <View style={styles.employeeRow}>
                                <Text style={styles.employeeLabel}>Area:</Text>
                                <Text style={styles.employeeValue}>{user?.area}</Text>
                            </View>
                            <View style={styles.employeeRow}>
                                <Text style={styles.employeeLabel}>Today:</Text>
                                <Text style={styles.employeeValue}>{getTodayDate()}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Date Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Select Date</Text>
                            <View style={styles.dateContainer}>
                                <DateField
                                    labelDate="Day"
                                    labelMonth="Month"
                                    labelYear="Year"
                                    styleInput={{
                                        color: "#1E293B",
                                        fontSize: 16,
                                        fontFamily: 'Poppins-Regular'
                                    }}
                                    placeholderTextColor="#64748B"
                                    onSubmit={(value) => setdate(value)}
                                />
                            </View>
                        </View>

                        {/* Status Selection */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Attendance Status</Text>
                            <View style={styles.statusContainer}>
                                {statusOptions.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.statusOption,
                                            status === option.value && styles.selectedStatus,
                                            status === option.value && { borderColor: option.color }
                                        ]}
                                        onPress={() => setstatus(option.value)}
                                    >
                                        <Text style={styles.statusIcon}>{option.icon}</Text>
                                        <Text style={[
                                            styles.statusText,
                                            status === option.value && { color: option.color }
                                        ]}>
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Alternative Picker Method */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Or Select from Dropdown</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={status}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setstatus(itemValue)}
                                    dropdownIconColor="#64748B"
                                >
                                    <Picker.Item label="Present" value="present" color="#1E293B" />
                                    <Picker.Item label="Absent" value="absent" color="#1E293B" />
                                </Picker>
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity 
                            style={[
                                styles.submitButton, 
                                (!date || !status) && styles.disabledButton
                            ]} 
                            onPress={handleSubmit}
                            disabled={!date || !status}
                        >
                            <Text style={styles.submitButtonText}>Submit Attendance</Text>
                        </TouchableOpacity>

                        {/* Quick Actions */}
                        <View style={styles.quickActions}>
                            <TouchableOpacity 
                                style={styles.quickActionButton}
                                onPress={() => navigation.navigate("Viewattendance")}
                            >
                                <Text style={styles.quickActionText}>View My Attendance</Text>
                            </TouchableOpacity>
                        </View>
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
        marginBottom: 32,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 16,
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
    employeeInfo: {
        marginBottom: 32,
    },
    employeeInfoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 12,
    },
    employeeCard: {
        backgroundColor: '#F8FAFC',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 12,
    },
    employeeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    employeeLabel: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: 'Poppins-Medium',
    },
    employeeValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
    },
    formContainer: {
        gap: 24,
    },
    inputGroup: {
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 12,
    },
    dateContainer: {
        backgroundColor: '#F8FAFC',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#E2E8F0',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    statusOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        backgroundColor: '#F8FAFC',
        gap: 8,
    },
    selectedStatus: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#1E293B',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    statusIcon: {
        fontSize: 20,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        fontFamily: 'Poppins-SemiBold',
    },
    pickerContainer: {
        backgroundColor: '#F8FAFC',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#E2E8F0',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    picker: {
        height: 60,
        color: '#1E293B',
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
    quickActions: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    quickActionButton: {
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#3B82F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickActionText: {
        color: '#3B82F6',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
})

export default Addattendance;