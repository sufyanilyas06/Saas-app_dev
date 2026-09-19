import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FileText, Printer, CheckCircle } from 'lucide-react-native';
import { CompletedOrder } from '../types';
import { Colors } from '../theme/colors';
import { localDb } from '../services/db';

export const TransactionsHistoryScreen: React.FC = () => {
  const [orders, setOrders] = useState<CompletedOrder[]>([]);

  useEffect(() => {
    localDb.getOrders().then(setOrders);
  }, []);

  const handleReprint = (invoice: string) => {
    Alert.alert('Slip Printed', `Re-printed duplicate tax receipt for ${invoice}.`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <CheckCircle size={32} color={Colors.primary} />
            <Text style={styles.emptyText}>No transactions recorded in session</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.badge}>
                <FileText size={12} color={Colors.primary} />
                <Text style={styles.invNumber}>{item.invoiceNumber}</Text>
              </View>
              <Text style={styles.time}>{item.date}</Text>
            </View>

            <View style={styles.midRow}>
              <Text style={styles.itemsCount}>
                {item.items.reduce((s, i) => s + i.quantity, 0)} Items • {item.tenderMode.toUpperCase()}
              </Text>
              <Text style={styles.total}>${item.total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.reprintBtn}
              onPress={() => handleReprint(item.invoiceNumber)}
            >
              <Printer size={14} color={Colors.textSecondary} />
              <Text style={styles.reprintText}>Reprint Slip</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 14, gap: 10 },
  card: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  invNumber: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary },
  time: { fontSize: 11, color: Colors.textSecondary },
  midRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemsCount: { fontSize: 12, color: Colors.textSecondary },
  total: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  reprintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSecondary,
  },
  reprintText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  empty: { alignItems: 'center', marginTop: 60, gap: 8 },
  emptyText: { color: Colors.textSecondary, fontSize: 13 },
});
