import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { useSelector } from "react-redux";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const Viewcomplaints = () => {
  const user = useSelector(state => state.customer);
  const [complaintlist, setcomplaintlist] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_complaints WHERE email=? ORDER BY cus_id DESC",
        [user.value.email],
        (tx, res) => {
          let complaints = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            complaints.push(res.rows.item(i));
          }
          setcomplaintlist(complaints);
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#F59E0B';
      case 'resolved': return '#10B981';
      case 'in progress': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '⏳';
      case 'resolved': return '✅';
      case 'in progress': return '🔄';
      default: return '❓';
    }
  };

  const formatDate = (timestamp) => {
    // If you have timestamp, format it. For now, return a placeholder
    return new Date().toLocaleDateString();
  };

  const renderComplaintItem = ({ item, index }) => (
    <View style={styles.complaintCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.complaintInfo}>
          <Text style={styles.complaintId}>Complaint #{item.cus_id}</Text>
          <Text style={styles.complaintDate}>{formatDate()}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status?.toUpperCase() || 'UNKNOWN'}
          </Text>
        </View>
      </View>

      {/* Complaint Details */}
      <View style={styles.complaintContent}>
        <Text style={styles.complaintText}>{item.complaint}</Text>
      </View>

      {/* Customer Details */}
      <View style={styles.customerDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Area:</Text>
          <Text style={styles.detailValue}>{item.area}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Contact:</Text>
          <Text style={styles.detailValue}>{item.mobile}</Text>
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              {
                width: item.status === 'resolved' ? '100%' : 
                       item.status === 'in progress' ? '60%' : '30%',
                backgroundColor: getStatusColor(item.status)
              }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {item.status === 'resolved' ? 'Complaint Resolved' :
           item.status === 'in progress' ? 'Being Processed' : 'Under Review'}
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image 
        source={{uri:"https://play-lh.googleusercontent.com/QauqYhK_WcYkQM8-wfg1H8kABrSDlDHc4pYaN4Db5yO8uqISqxcp9cwGp9b_wJDOaak=w240-h480-rw"}}
        style={styles.emptyStateLogo}
      />
      <Text style={styles.emptyStateTitle}>No Complaints Filed</Text>
      <Text style={styles.emptyStateSubtitle}>
        You haven't filed any complaints yet. If you face any issues, don't hesitate to reach out.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Complaints</Text>
        <Text style={styles.headerSubtitle}>Track the status of your reported issues</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {complaintlist.length > 0 ? (
          <FlatList
            data={complaintlist}
            renderItem={renderComplaintItem}
            keyExtractor={(item) => item.cus_id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshing={false}
            onRefresh={getData}
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
  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  complaintInfo: {
    flex: 1,
  },
  complaintId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  complaintDate: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusIcon: {
    fontSize: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  complaintContent: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  complaintText: {
    fontSize: 14,
    color: '#1E293B',
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  customerDetails: {
    marginBottom: 20,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Poppins-Medium',
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    fontFamily: 'Poppins-SemiBold',
  },
  progressContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
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

export default Viewcomplaints;