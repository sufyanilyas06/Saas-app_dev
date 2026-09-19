export type ScreenType =
  | 'pos'
  | 'dashboard'
  | 'inventory'
  | 'customers'
  | 'transactions'
  | 'shift-z-report'
  | 'returns-refund'
  | 'offline-sync';

export interface Product {
  id: string;
  name: string;
  category: 'produce' | 'dairy' | 'bakery' | 'beverages' | 'snacks' | 'household';
  categoryLabel: string;
  price: number;
  unit: string;
  stock: number;
  minStock: number;
  image: string;
  sku: string;
  barcode: string;
  aisleShelf: string;
  batch: string;
  expiryDays: number;
  expiryLabel?: string;
  isLowStock?: boolean;
  isExpiring?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  tier: string;
  isVip: boolean;
  creditBalance: number;
}

export interface CompletedOrder {
  id: string;
  invoiceNumber: string;
  date: string;
  cashier: string;
  counter: string;
  items: CartItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  tax: number;
  total: number;
  tenderMode: 'cash' | 'card' | 'qr' | 'khata';
  tenderedAmount: number;
  changeAmount: number;
  customer?: Customer;
  refundStatus?: 'none' | 'partial' | 'full';
  refundedAmount?: number;
}
