import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Search, AlertTriangle, Plus, Minus } from 'lucide-react-native';
import { Product } from '../types';
import { Colors } from '../theme/colors';
import { localDb } from '../services/db';

export const InventoryScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  useEffect(() => {
    localDb.getProducts().then(setProducts);
  }, []);

  const handleStockAdjust = async (id: string, delta: number) => {
    await localDb.updateStock(id, delta);
    const updated = await localDb.getProducts();
    setProducts(updated);
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
    const matchesLowStock = onlyLowStock ? p.stock <= p.minStock : true;
    return matchesSearch && matchesLowStock;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={18} color={Colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Filter catalog by SKU, item, shelf..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity
        style={[styles.filterPill, onlyLowStock && styles.filterPillActive]}
        onPress={() => setOnlyLowStock(!onlyLowStock)}
      >
        <AlertTriangle
          size={14}
          color={onlyLowStock ? '#ffffff' : Colors.warning}
        />
        <Text
          style={[styles.filterPillText, onlyLowStock && { color: '#ffffff' }]}
        >
          Only Low Stock Alert
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>
                {item.aisleShelf} • SKU: {item.sku}
              </Text>
              <View style={styles.stockBadge}>
                <Text
                  style={[
                    styles.stockText,
                    item.stock <= item.minStock && { color: Colors.danger },
                  ]}
                >
                  In Stock: {item.stock} {item.unit} (Min: {item.minStock})
                </Text>
              </View>
            </View>

            <View style={styles.adjustCol}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleStockAdjust(item.id, -1)}
              >
                <Minus size={14} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: Colors.primaryLight }]}
                onPress={() => handleStockAdjust(item.id, +1)}
              >
                <Plus size={14} color={Colors.primaryDark} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 44,
  },
  input: { flex: 1, fontSize: 13 },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: { backgroundColor: Colors.warning, borderColor: Colors.warning },
  filterPillText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  list: { paddingHorizontal: 12, paddingBottom: 24, gap: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  img: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#eee' },
  name: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  sub: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  stockBadge: { marginTop: 4 },
  stockText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  adjustCol: { flexDirection: 'row', gap: 6 },
  btn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
