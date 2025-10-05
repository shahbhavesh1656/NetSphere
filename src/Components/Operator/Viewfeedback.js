import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const Viewfeedback = ({ navigation }) => {
  const [menulist, setmenulist] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_feedback",
        [],
        (tx, res) => {
          let menus = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            menus.push(res.rows.item(i));
          }
          setmenulist(menus);
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
  };

  const deleteFeedback = id => {
    Alert.alert(
      "Delete Feedback",
      "Are you sure you want to delete this feedback?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            db.transaction(txn => {
              txn.executeSql(
                "DELETE FROM table_feedback where cus_id=?",
                [id],
                (tx, res) => {
                  getData();
                }
              );
            });
          }
        }
      ]
    );
  };

  const getFeedbackSentiment = (feedback) => {
    const text = feedback.toLowerCase();
    const positiveWords = ['excellent', 'great', 'good', 'amazing', 'wonderful', 'fantastic', 'perfect', 'awesome', 'love', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'poor', 'disappointing'];
    
    const hasPositive = positiveWords.some(word => text.includes(word));
    const hasNegative = negativeWords.some(word => text.includes(word));
    
    if (hasPositive && !hasNegative) return 'positive';
    if (hasNegative && !hasPositive) return 'negative';
    return 'neutral';
  };

  const getSentimentEmoji = (sentiment) => {
    switch(sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return '#D1FAE5';
      case 'negative': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  };

  const renderFeedbackCard = ({ item, index }) => {
    const sentiment = getFeedbackSentiment(item.feedback);
    
    return (
      <View style={styles.feedbackCard}>
        <View style={styles.cardHeader}>
          <View style={styles.customerInfo}>
            <View style={styles.customerDetails}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerEmail}>📧 {item.email}</Text>
            </View>
          </View>
          <View style={[styles.sentimentBadge, { backgroundColor: getSentimentColor(sentiment) }]}>
            <Text style={styles.sentimentEmoji}>{getSentimentEmoji(sentiment)}</Text>
          </View>
        </View>

        <View style={styles.feedbackContent}>
          <Text style={styles.feedbackLabel}>Customer Feedback:</Text>
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>{item.feedback}</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => deleteFeedback(item.cus_id)}
          >
            <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const positiveFeedback = menulist.filter(item => getFeedbackSentiment(item.feedback) === 'positive').length;
  const negativeFeedback = menulist.filter(item => getFeedbackSentiment(item.feedback) === 'negative').length;
  const neutralFeedback = menulist.length - positiveFeedback - negativeFeedback;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Customer Feedback</Text>
          <Text style={styles.subtitle}>Monitor customer satisfaction and reviews</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderColor: '#10B981' }]}>
            <Text style={styles.statEmoji}>😊</Text>
            <Text style={[styles.statNumber, { color: '#10B981' }]}>{positiveFeedback}</Text>
            <Text style={styles.statLabel}>Positive</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#6B7280' }]}>
            <Text style={styles.statEmoji}>😐</Text>
            <Text style={[styles.statNumber, { color: '#6B7280' }]}>{neutralFeedback}</Text>
            <Text style={styles.statLabel}>Neutral</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#EF4444' }]}>
            <Text style={styles.statEmoji}>😞</Text>
            <Text style={[styles.statNumber, { color: '#EF4444' }]}>{negativeFeedback}</Text>
            <Text style={styles.statLabel}>Negative</Text>
          </View>
        </View>

        {/* Feedback Overview */}
        {menulist.length > 0 && (
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>📊 Feedback Overview</Text>
            <Text style={styles.overviewText}>
              Total feedback received: <Text style={styles.boldText}>{menulist.length}</Text>
            </Text>
            <Text style={styles.overviewText}>
              Customer satisfaction: <Text style={[styles.boldText, { color: positiveFeedback > negativeFeedback ? '#10B981' : '#EF4444' }]}>
                {menulist.length > 0 ? Math.round((positiveFeedback / menulist.length) * 100) : 0}%
              </Text>
            </Text>
          </View>
        )}

        {/* Feedback List */}
        <View style={styles.listContainer}>
          {menulist.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>💬</Text>
              <Text style={styles.emptyStateTitle}>No Feedback Yet</Text>
              <Text style={styles.emptyStateText}>Customer feedback will appear here once they start sharing their experiences.</Text>
            </View>
          ) : (
            <FlatList
              data={menulist}
              renderItem={renderFeedbackCard}
              keyExtractor={(item) => item.cus_id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderTopWidth: 3,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  sentimentBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentimentEmoji: {
    fontSize: 20,
  },
  feedbackContent: {
    marginBottom: 16,
  },
  feedbackLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  feedbackBox: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#06B6D4',
  },
  feedbackText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  cardActions: {
    alignItems: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
    emptyState: {   
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
  
  export default Viewfeedback;