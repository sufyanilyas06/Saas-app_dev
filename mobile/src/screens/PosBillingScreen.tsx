import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Search, ShoppingBag, Plus, Minus, CreditCard, Banknote, QrCode } from 'lucide-react-native';
import { Product, CartItem, CompletedOrder } from '../types';
import { Colors } from '../theme/colors';
import { localDb } from '../services/db';

const CATEGORIES = ['all', 'produce', 'dairy', 'bakery', 'beverages'] as const;

export const PosBillingScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalVisible, setIsCartModalVisible] = useState<boolean>(false);

  useEffect(() => {
    localDb.getProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = async (mode: 'cash' | 'card' | 'qr') => {
    if (cart.length === 0) return;

    const completedOrder: CompletedOrder = {
      id: `ord-${Date.now()}`,
      invoiceNumber: `#INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cashier: 'Sarah J.',
      counter: 'Lane 01',
      items: [...cart],
      subtotal,
      discountAmount: 0,
      tax,
      total,
      tenderMode: mode,
      tenderedAmount: total,
      changeAmount: 0,
    };

    await localDb.createOrder(completedOrder);
    const updatedProducts = await localDb.getProducts();
    setProducts(updatedProducts);

    setCart([]);
    setIsCartModalVisible(false);
    Alert.alert('Sale Completed', `Receipt ${completedOrder.invoiceNumber} recorded! Total: $${total.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search items, SKU, or barcode..."
          placeholderTextColor="#8ea4c8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Pills */}
      <View style={styles.categoryRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES as any}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryPill,
                selectedCategory === item && styles.categoryPillActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Product Catalog Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.productUnit}>{item.unit}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <View style={styles.addIcon}>
                  <Plus size={14} color="#ffffff" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Cart Bar */}
      {cart.length > 0 && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setIsCartModalVisible(true)}
          >
            <View style={styles.cartButtonLeft}>
              <ShoppingBag size={20} color="#ffffff" />
              <Text style={styles.cartBadgeText}>
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </Text>
            </View>
            <Text style={styles.cartTotalText}>Charge ${total.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Cart Drawer Modal */}
      <Modal visible={isCartModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Current Transaction</Text>
              <TouchableOpacity onPress={() => setIsCartModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={cart}
              keyExtractor={(item) => item.product.id}
              renderItem={({ item }) => (
                <View style={styles.cartItemRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartItemName}>{item.product.name}</Text>
                    <Text style={styles.cartItemPrice}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleUpdateQuantity(item.product.id, -1)}
                    >
                      <Minus size={14} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleUpdateQuantity(item.product.id, 1)}
                    >
                      <Plus size={14} color={Colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <View style={styles.summaryContainer}>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLabel}>Tax (5%)</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryLine, { marginTop: 4 }]}>
                <Text style={styles.totalLabel}>Total Due</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.tenderRow}>
              <TouchableOpacity
                style={[styles.tenderBtn, { backgroundColor: Colors.primary }]}
                onPress={() => handleCheckout('card')}
              >
                <CreditCard size={18} color="#ffffff" />
                <Text style={styles.tenderBtnText}>Card</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tenderBtn, { backgroundColor: '#0b1c30' }]}
                onPress={() => handleCheckout('cash')}
              >
                <Banknote size={18} color="#ffffff" />
                <Text style={styles.tenderBtnText}>Cash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tenderBtn, { backgroundColor: '#132a45' }]}
                onPress={() => handleCheckout('qr')}
              >
                <QrCode size={18} color="#ffffff" />
                <Text style={styles.tenderBtnText}>QR Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  categoryRow: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  productImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#eef2f6',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  productUnit: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  addIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  cartButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cartButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  cartTotalText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  closeText: {
    fontSize: 14,
    color: Colors.danger,
    fontWeight: '700',
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cartItemName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cartItemPrice: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
  },
  summaryContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  tenderRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  tenderBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tenderBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
