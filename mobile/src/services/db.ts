import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, CompletedOrder } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: '@freshpos_products',
  ORDERS: '@freshpos_orders',
  SYNC_QUEUE: '@freshpos_sync_queue',
};

export interface SyncQueueItem {
  id: string;
  endpoint: string;
  method: 'POST' | 'PATCH';
  payload: any;
  createdAt: number;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    name: 'Organic Bananas',
    category: 'produce',
    categoryLabel: 'Produce',
    price: 1.89,
    unit: '1.2 kg bndl',
    stock: 42,
    minStock: 10,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    sku: 'SKU-1092',
    barcode: '0029311092',
    aisleShelf: 'Aisle 1',
    batch: '#B-101',
    expiryDays: 5,
  },
  {
    id: 'prod-102',
    name: 'Whole Milk 2L',
    category: 'dairy',
    categoryLabel: 'Dairy',
    price: 3.49,
    unit: 'Bottle • 2L',
    stock: 6,
    minStock: 10,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    sku: 'SKU-4412',
    barcode: '7891024412',
    aisleShelf: 'Cooler 2',
    batch: '#B-102',
    expiryDays: 2,
    isLowStock: true,
  },
  {
    id: 'prod-103',
    name: 'Rustic Sourdough',
    category: 'bakery',
    categoryLabel: 'Bakery',
    price: 4.95,
    unit: '650g Loaf',
    stock: 18,
    minStock: 5,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400',
    sku: 'SKU-8301',
    barcode: '4400298301',
    aisleShelf: 'Bakery B',
    batch: '#B-103',
    expiryDays: 3,
  },
  {
    id: 'prod-104',
    name: 'Sparkling Water 1L',
    category: 'beverages',
    categoryLabel: 'Beverages',
    price: 2.25,
    unit: 'Bottle • 1L',
    stock: 24,
    minStock: 12,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
    sku: 'SKU-9901',
    barcode: '5501928371',
    aisleShelf: 'Aisle 4',
    batch: '#B-104',
    expiryDays: 180,
  },
];

export const localDb = {
  async getProducts(): Promise<Product[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) {
        return JSON.parse(data);
      }
      await this.saveProducts(DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },

  async saveProducts(products: Product[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  async updateStock(productId: string, delta: number): Promise<void> {
    const products = await this.getProducts();
    const updated = products.map((p) => {
      if (p.id === productId) {
        const nextStock = Math.max(0, p.stock + delta);
        return { ...p, stock: nextStock, isLowStock: nextStock <= p.minStock };
      }
      return p;
    });
    await this.saveProducts(updated);
  },

  async getOrders(): Promise<CompletedOrder[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async createOrder(order: CompletedOrder): Promise<void> {
    const orders = await this.getOrders();
    orders.unshift(order);
    await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Deduct stock for each cart item
    for (const item of order.items) {
      await this.updateStock(item.product.id, -item.quantity);
    }
  },

  async enqueueSync(endpoint: string, method: 'POST' | 'PATCH', payload: any): Promise<void> {
    const queue = await this.getSyncQueue();
    queue.push({
      id: `sync_${Date.now()}`,
      endpoint,
      method,
      payload,
      createdAt: Date.now(),
    });
    await AsyncStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
  },

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async clearSyncQueue(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.SYNC_QUEUE);
  },
};
