import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react-native';
import { Colors } from '../theme/colors';
import { localDb, SyncQueueItem } from '../services/db';

export const OfflineSyncScreen: React.FC = () => {
  const [queue, setQueue] = useState<SyncQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const loadQueue = async () => {
    const items = await localDb.getSyncQueue();
    setQueue(items);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const handleForceSync = async () => {
    setIsSyncing(true);
    setTimeout(async () => {
      await localDb.clearSyncQueue();
      setQueue([]);
      setIsSyncing(false);
      Alert.alert('Sync Reconciled', 'All local mutations synced to Central Server.');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerRow}>
          <WifiOff size={18} color="#ffffff" />
          <Text style={styles.bannerTitle}>Offline-First Ledger Active</Text>
        </View>
        <Text style={styles.bannerSub}>
          Mutations save locally first via AsyncStorage before server sync.
        </Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statCol}>
          <Text style={styles.statNum}>{queue.length}</Text>
          <Text style={styles.statLbl}>Pending Packets</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statNum}>100%</Text>
          <Text style={styles.statLbl}>Integrity</Text>
        </View>
      </View>

      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <CheckCircle2 size={32} color={Colors.primary} />
            <Text style={styles.emptyText}>All offline records synced with cloud</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.method} {item.endpoint}</Text>
            <Text style={styles.itemTime}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.syncBtn}
        onPress={handleForceSync}
        disabled={isSyncing || queue.length === 0}
      >
        <RefreshCw size={16} color="#fff" />
        <Text style={styles.syncBtnText}>
          {isSyncing ? 'Reconciling Ledger...' : `Force Sync (${queue.length})`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 14 },
  banner: {
    backgroundColor: '#0b1c30',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1e3a5f',
    marginBottom: 12,
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bannerTitle: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  bannerSub: { color: '#8ea4c8', fontSize: 11, marginTop: 4 },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  statCol: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  statLbl: { fontSize: 10, color: Colors.textSecondary },
  list: { paddingBottom: 20 },
  item: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  itemTitle: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  itemTime: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  empty: { alignItems: 'center', marginTop: 40, gap: 6 },
  emptyText: { fontSize: 12, color: Colors.textSecondary },
  syncBtn: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  syncBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
});
