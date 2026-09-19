import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ShoppingBag, DollarSign, Sparkles } from 'lucide-react-native';
import { Colors } from '../theme/colors';

export const DashboardScreen: React.FC = () => {
  const [copilotInsight, setCopilotInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunCopilot = () => {
    setLoading(true);
    setTimeout(() => {
      setCopilotInsight(
        '• Low Stock Alert: Whole Milk 2L is below safety threshold (6 remaining).\n' +
        '• Restock Schedule: Submit purchase order for Dairy supplier by tomorrow 09:00 AM.\n' +
        '• Basket Lift: Pair Sourdough with cold-pressed olive oil for 15% margin lift.'
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={[styles.iconWrapper, { backgroundColor: '#e6f7f0' }]}>
            <DollarSign size={18} color={Colors.primary} />
          </View>
          <Text style={styles.metricLabel}>Today's Net Sales</Text>
          <Text style={styles.metricValue}>$3,663.32</Text>
          <Text style={styles.metricTrend}>+12.4% vs yesterday</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={[styles.iconWrapper, { backgroundColor: '#eff4ff' }]}>
            <ShoppingBag size={18} color="#0b1c30" />
          </View>
          <Text style={styles.metricLabel}>Transactions</Text>
          <Text style={styles.metricValue}>64 Orders</Text>
          <Text style={styles.metricTrend}>Avg $57.24 / ticket</Text>
        </View>
      </View>

      <View style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <View style={styles.aiTitleWrapper}>
            <Sparkles size={18} color={Colors.primaryLight} />
            <Text style={styles.aiTitle}>Retail AI Intelligence</Text>
          </View>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={handleRunCopilot}
            disabled={loading}
          >
            <Text style={styles.aiButtonText}>
              {loading ? 'Analyzing...' : 'Run Forecast'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.aiSubtitle}>
          Real-time stockout risk & margin suggestions powered by Gemini
        </Text>

        {copilotInsight && (
          <View style={styles.aiOutputBox}>
            <Text style={styles.aiOutputText}>{copilotInsight}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  metricTrend: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  aiCard: {
    backgroundColor: '#0b1c30',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e3a5f',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiTitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  aiButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aiButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  aiSubtitle: {
    fontSize: 11,
    color: '#8ea4c8',
    marginTop: 4,
  },
  aiOutputBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  aiOutputText: {
    color: '#e2e8f0',
    fontSize: 12,
    lineHeight: 18,
  },
});
