import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Search, RotateCcw, Check } from 'lucide-react-native';
import { Colors } from '../theme/colors';
import { localDb } from '../services/db';

interface ReturnItem {
  id: string;
  name: string;
  unitPrice: number;
  qtyBought: number;
  qtyReturn: number;
}

export const ReturnsRefundScreen: React.FC = () => {
  const [receiptNumber, setReceiptNumber] = useState('#INV-8921');
  const [items] = useState<ReturnItem[]>([
    { id: 'p1', name: 'Organic Whole Milk 2L', unitPrice: 3.49, qtyBought: 2, qtyReturn: 1 },
    { id: 'p2', name: 'Artisan Sourdough Loaf', unitPrice: 4.95, qtyBought: 1, qtyReturn: 1 },
  ]);
  const [restockItem, setRestockItem] = useState(true);
  const [managerPin, setManagerPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalRefund = items.reduce(
    (sum, item) => sum + item.unitPrice * item.qtyReturn,
    0
  );
  const taxReversal = totalRefund * 0.05;
  const netRefund = totalRefund + taxReversal;

  const handleProcessRefund = async () => {
    if (netRefund <= 0) {
      Alert.alert('Select Items', 'Please select at least 1 item to refund.');
      return;
    }
    if (managerPin !== '9482') {
      Alert.alert('Manager PIN Required', 'Default PIN is 9482 for refund overrides.');
      return;
    }

    setIsProcessing(true);
    try {
      await localDb.enqueueSync('/api/orders/refund', 'POST', {
        invoiceNumber: receiptNumber,
        refundAmount: netRefund,
        restock: restockItem,
      });

      Alert.alert(
        'Refund Approved',
        `$${netRefund.toFixed(2)} refunded successfully.\nInventory restocked.`
      );
      setManagerPin('');
    } catch {
      Alert.alert('Error', 'Refund failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Search size={18} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter receipt # or scan barcode..."
          value={receiptNumber}
          onChangeText={setReceiptNumber}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSub}>
                Bought: {item.qtyBought} @ ${item.unitPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.qtyBox}>
              <Text style={styles.qtyLabel}>Return Qty:</Text>
              <Text style={styles.qtyValue}>{item.qtyReturn}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.sumLabel}>Net Refund Due:</Text>
          <Text style={styles.sumValue}>${netRefund.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.restockCheckbox}
          onPress={() => setRestockItem(!restockItem)}
        >
          <View style={[styles.checkbox, restockItem && styles.checkboxActive]}>
            {restockItem && <Check size={12} color="#fff" />}
          </View>
          <Text style={styles.restockText}>Restock valid items back to inventory</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.pinInput}
          placeholder="Manager Override PIN (Default: 9482)"
          placeholderTextColor="#8ea4c8"
          keyboardType="numeric"
          secureTextEntry
          value={managerPin}
          onChangeText={setManagerPin}
        />

        <TouchableOpacity
          style={[styles.refundBtn, isProcessing && { opacity: 0.6 }]}
          onPress={handleProcessRefund}
          disabled={isProcessing}
        >
          <RotateCcw size={16} color="#fff" />
          <Text style={styles.refundBtnText}>Authorize & Issue Refund</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    margin: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 46,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  list: { paddingHorizontal: 14, gap: 10 },
  itemCard: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  itemSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  qtyBox: { alignItems: 'flex-end' },
  qtyLabel: { fontSize: 10, color: Colors.textSecondary },
  qtyValue: { fontSize: 14, fontWeight: '800', color: Colors.primary },
  bottomCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sumLabel: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  sumValue: { fontSize: 18, fontWeight: '800', color: Colors.danger },
  restockCheckbox: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  restockText: { fontSize: 12, color: Colors.textPrimary },
  pinInput: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 13,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  refundBtn: {
    backgroundColor: Colors.danger,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  refundBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
});
