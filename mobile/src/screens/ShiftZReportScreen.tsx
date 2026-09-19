import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Clock,
  Printer,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react-native';
import { Colors } from '../theme/colors';
import { localDb } from '../services/db';

export const ShiftZReportScreen: React.FC = () => {
  const [openingFloat] = useState(250.0);
  const [cashSales] = useState(1472.82);
  const [cardSales] = useState(2190.5);
  const [totalOrders] = useState(64);

  const expectedCash = openingFloat + cashSales;
  const [countedCashInput, setCountedCashInput] = useState('1720.00');
  const [isReconciled, setIsReconciled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countedCash = parseFloat(countedCashInput) || 0;
  const variance = countedCash - expectedCash;

  const handleFinalizeShift = async () => {
    setIsSubmitting(true);
    try {
      await localDb.enqueueSync('/api/shifts/reconcile', 'POST', {
        countedCash,
        variance,
        notes: 'Shift closed via mobile POS register',
      });
      setIsReconciled(true);
      Alert.alert(
        'Shift Reconciled',
        `Z-Report #Z-044 generated.\nVariance: ${variance >= 0 ? '+$' : '-$'}${Math.abs(
          variance
        ).toFixed(2)}\nCash drawer kick pulse sent.`
      );
    } catch {
      Alert.alert('Error', 'Could not record shift closure');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.laneTitle}>Lane #01 • Register Shift #04</Text>
            <View style={styles.timeBadge}>
              <Clock size={12} color={Colors.textSecondary} />
              <Text style={styles.timeText}>08:00 AM – Active Session</Text>
            </View>
          </View>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: isReconciled ? '#e6f7f0' : '#fff3e0' },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isReconciled ? Colors.primary : Colors.warning },
              ]}
            >
              {isReconciled ? 'Z-REPORT PRINTED' : 'OPEN RECONCILIATION'}
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Opening Float</Text>
            <Text style={styles.value}>${openingFloat.toFixed(2)}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Cash Sales</Text>
            <Text style={[styles.value, { color: Colors.primary }]}>
              +${cashSales.toFixed(2)}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Card / Digital</Text>
            <Text style={styles.value}>${cardSales.toFixed(2)}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Total Tickets</Text>
            <Text style={styles.value}>{totalOrders} Slips</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.expectedRow}>
          <Text style={styles.expectedLabel}>Expected Cash in Till</Text>
          <Text style={styles.expectedValue}>${expectedCash.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionHeading}>Physical Cash Drawer Audit</Text>
        <Text style={styles.sectionSubtitle}>
          Enter actual counted bills and coins in drawer
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.currencyPrefix}>$</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={countedCashInput}
            onChangeText={setCountedCashInput}
            editable={!isReconciled}
          />
        </View>

        <View
          style={[
            styles.varianceBox,
            {
              backgroundColor:
                Math.abs(variance) <= 2.0 ? '#e6f7f0' : '#ffebee',
              borderColor:
                Math.abs(variance) <= 2.0 ? Colors.primary : Colors.danger,
            },
          ]}
        >
          {Math.abs(variance) <= 2.0 ? (
            <ShieldCheck size={18} color={Colors.primary} />
          ) : (
            <AlertTriangle size={18} color={Colors.danger} />
          )}
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.varianceTitle,
                {
                  color:
                    Math.abs(variance) <= 2.0 ? Colors.primary : Colors.danger,
                },
              ]}
            >
              Till Variance: {variance >= 0 ? '+$' : '-$'}
              {Math.abs(variance).toFixed(2)}
            </Text>
            <Text style={styles.varianceSubtitle}>
              {Math.abs(variance) <= 2.0
                ? 'Within acceptable retail tolerance (±$2.00)'
                : 'Exceeds variance limit. Requires Manager PIN.'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, isReconciled && styles.disabledButton]}
          onPress={handleFinalizeShift}
          disabled={isReconciled || isSubmitting}
        >
          <Printer size={18} color="#ffffff" />
          <Text style={styles.actionButtonText}>
            {isReconciled ? 'Shift Finalized & Locked' : 'Close Shift & Print Z-Report'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, gap: 14 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  laneTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  timeText: { fontSize: 11, color: Colors.textSecondary },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 10, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, gap: 10 },
  gridItem: {
    width: '48%',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 10,
    padding: 10,
  },
  label: { fontSize: 10, color: Colors.textSecondary },
  value: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  expectedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  expectedLabel: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  expectedValue: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  sectionHeading: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  sectionSubtitle: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, marginBottom: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 50,
  },
  currencyPrefix: { fontSize: 20, fontWeight: '800', color: Colors.textSecondary, marginRight: 6 },
  input: { flex: 1, fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  varianceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
  },
  varianceTitle: { fontSize: 13, fontWeight: '800' },
  varianceSubtitle: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 12,
    marginTop: 14,
  },
  disabledButton: { backgroundColor: '#8ea4c8' },
  actionButtonText: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
});
