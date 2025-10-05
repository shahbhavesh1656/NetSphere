import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const CustomerHomePage = ({navigation}) => {
    const customer = useSelector(state => state.customer.value);

    const menuItems = [
        {
            title: "About Us",
            subtitle: "View packages and office details",
            icon: "📋",
            onPress: () => navigation.navigate("AboutUs")
        },
        {
            title: "Connection",
            subtitle: "Book new connection or manage existing",
            icon: "📡",
            onPress: () => navigation.navigate("Connection")
        },
        {
            title: "Lodge Grievance",
            subtitle: "File a complaint or issue",
            icon: "⚠️",
            onPress: () => navigation.navigate("LodgeGreviance")
        },
        {
            title: "Give Feedback",
            subtitle: "Share your experience with us",
            icon: "💬",
            onPress: () => navigation.navigate("GiveFeedback")
        }
    ];

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.nameText}>{customer?.name || "Customer"}</Text>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={styles.menuItem} 
                            onPress={item.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuIconContainer}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <View style={styles.logoutContainer}>
                    <TouchableOpacity 
                        style={styles.logoutButton} 
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
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
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 32,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#1E293B',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 18,
        color: '#64748B',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
    nameText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E293B',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginTop: 4,
    },
    menuContainer: {
        paddingHorizontal: 20,
        paddingTop: 24,
        gap: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#1E293B',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    menuIconContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuIcon: {
        fontSize: 24,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 4,
    },
    menuSubtitle: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: 'Poppins-Regular',
        lineHeight: 20,
    },
    menuArrow: {
        fontSize: 24,
        color: '#3B82F6',
        fontWeight: '600',
    },
    logoutContainer: {
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 20,
    },
    logoutButton: {
        height: 56,
        backgroundColor: '#EF4444',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EF4444',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
})

export default CustomerHomePage;