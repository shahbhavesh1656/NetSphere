import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const Viewconnectionhistory = () => {
  const user = useSelector(state => state.customer);
  const [connectionhistory, setconnectionhistory] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections WHERE email=?",
        [user.value.email],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setconnectionhistory(menus);
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return '#F59E0B';
      case 'resolved': return '#10B981';
      case 'paid': return '#10B981';
      case 'active': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getConnectionIcon = (connectionType) => {
    return connectionType === 'CABLE CONNECTION' ? '📺' : '📶';
  };

  const renderConnectionItem = ({ item, index }) => (
    <View style={styles.connectionCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.connectionIcon}>
            {getConnectionIcon(item.connection_name)}
          </Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.connectionName}>{item.connection_name}</Text>
          <Text style={styles.connectionMode}>{item.connection_mode}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.connection_status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.connection_status) }]}>
            {item.connection_status?.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Plan</Text>
            <Text style={styles.detailValue}>{item.planname}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Package</Text>
            <Text style={styles.detailValue}>{item.package}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{item.subscription} days</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.amountText}>₹{item.amount}</Text>
          </View>
        </View>

        <View style={styles.paymentStatusContainer}>
          <Text style={styles.detailLabel}>Payment Status</Text>
          <View style={[styles.paymentBadge, { backgroundColor: getStatusColor(item.payment_status) + '20' }]}>
            <Text style={[styles.paymentText, { color: getStatusColor(item.payment_status) }]}>
              {item.payment_status?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image 
        source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}
        style={styles.emptyStateLogo}
      />
      <Text style={styles.emptyStateTitle}>No Connections Found</Text>
      <Text style={styles.emptyStateSubtitle}>
        You haven't made any connection requests yet. Start by booking a new connection.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connection History</Text>
        <Text style={styles.headerSubtitle}>Track all your connection requests</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {connectionhistory.length > 0 ? (
          <FlatList
            data={connectionhistory}
            renderItem={renderConnectionItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 24,
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  connectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1E293B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  connectionIcon: {
    fontSize: 24,
  },
  headerContent: {
    flex: 1,
  },
  connectionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  connectionMode: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Poppins-Regular',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
    fontFamily: 'Poppins-Bold',
  },
  paymentStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  paymentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  paymentText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 32,
    opacity: 0.5,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Viewconnectionhistory;