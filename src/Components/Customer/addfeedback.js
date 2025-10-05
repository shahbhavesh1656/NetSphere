import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image,ScrollView} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DB_NAME } from "../../config";

let db= openDatabase({name:DB_NAME})

const Addfeedback = ({navigation})=>{
    const [feedback, setfeedback] = useState("");
    const [rating, setrating] = useState(0);
    const user = useSelector((state)=>state.customer.value);
    
    useEffect(() => {
        db.transaction(txn => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_feedback'",
            [],
            (tx, res) => {
              for (let i = 0; i < res.rows.length; ++i) {
                console.log(res.rows.item(i));
              }
              console.log("item:", res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql(
                  "CREATE TABLE IF NOT EXISTS table_feedback(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50),address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),feedback VARCHAR(400))",
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
        if (feedback === "") {
            alert("Please provide your feedback");
        } else {
            db.transaction(function(tx) {
                tx.executeSql(
                  "INSERT INTO table_feedback (name, email,address,area, mobile,feedback) VALUES (?,?,?,?,?,?)",
                  [user.name, user.email, user.address,user.area,user.mobile,feedback],
                  (tx, results) => {
                    console.log("Results", results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      alert("Feedback Submitted Successfully");
                      setfeedback("");
                      setrating(0);
                    } else alert("Submission Failed");
                  },
                  error => {
                    console.log(error);
                  }
                );
            });
        }
    }

    const renderStars = () => {
        return Array.from({length: 5}, (_, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => setrating(index + 1)}
                style={styles.starButton}
            >
                <Text style={[
                    styles.star,
                    index < rating ? styles.selectedStar : styles.unselectedStar
                ]}>
                    ★
                </Text>
            </TouchableOpacity>
        ));
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
                        <Text style={styles.title}>Share Your Feedback</Text>
                        <Text style={styles.subtitle}>Help us improve our services</Text>
                    </View>

                    {/* Rating Section */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.ratingLabel}>Rate Our Service</Text>
                        <View style={styles.starsContainer}>
                            {renderStars()}
                        </View>
                        {rating > 0 && (
                            <Text style={styles.ratingText}>
                                {rating === 1 && "Poor"}
                                {rating === 2 && "Fair"}
                                {rating === 3 && "Good"}
                                {rating === 4 && "Very Good"}
                                {rating === 5 && "Excellent"}
                            </Text>
                        )}
                    </View>

                    {/* Feedback Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Your Feedback</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                onChangeText={txt=>setfeedback(txt)}
                                value={feedback}
                                placeholder="Tell us about your experience with our service..."
                                placeholderTextColor="#64748B"
                                multiline={true}
                                numberOfLines={6}
                                textAlignVertical="top"
                            />
                        </View>

                        {/* Customer Info Display */}
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerInfoLabel}>Submitting as:</Text>
                            <View style={styles.customerCard}>
                                <Text style={styles.customerName}>{user?.name}</Text>
                                <Text style={styles.customerEmail}>{user?.email}</Text>
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity 
                            style={[styles.submitButton, !feedback && styles.disabledButton]} 
                            onPress={handleSubmit}
                            disabled={!feedback}
                        >
                            <Text style={styles.submitButtonText}>Submit Feedback</Text>
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
    ratingSection: {
        alignItems: 'center',
        marginBottom: 32,
        padding: 24,
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    ratingLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    starButton: {
        padding: 4,
    },
    star: {
        fontSize: 32,
    },
    selectedStar: {
        color: '#F59E0B',
    },
    unselectedStar: {
        color: '#D1D5DB',
    },
    ratingText: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
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
        height: 140,
        paddingTop: 20,
        paddingBottom: 20,
    },
    customerInfo: {
        marginBottom: 8,
    },
    customerInfoLabel: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: 'Poppins-Medium',
        marginBottom: 12,
    },
    customerCard: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    customerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 4,
    },
    customerEmail: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: 'Poppins-Regular',
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
})

export default Addfeedback;