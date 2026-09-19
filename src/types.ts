export type ScreenType = 
  | 'pos' 
  | 'cart_tender'
  | 'tender' 
  | 'inventory' 
  | 'dashboard' 
  | 'returns'
  | 'z_report'
  | 'hardware_pairing'
  | 'store_setup'
  | 'staff_directory'
  | 'roles_matrix'
  | 'invite_staff'
  | 'password_recovery'
  | 'pin_auth'
  | 'pin-lock' 
  | 'workspace_login'
  | 'workspace-login' 
  | 'create-store'
  | 'transactions'
  | 'orders'
  | 'customers'
  | 'settings'
  | 'purchase_orders'
  | 'stock_adjustments'
  | 'stock_transfers'
  | 'billing_plans'
  | 'billing_invoices'
  | 'subscription_overview'
  | 'fleet_hub'
  | 'offline_sync'
  | 'hardware_diagnostics'
  | 'analytics_hub'
  | 'cashier_performance'
  | 'tax_audit'
  | 'web_auth'
  | 'web_root_console'
  | 'web_dashboard'
  | 'web_tenants';

export type PlatformMode = 'app' | 'web';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
}

export type UserRole = 'owner' | 'cashier' | 'inventory';

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
  isOutOfStock?: boolean;
  isExpiring?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type TenderMode = 'cash' | 'card' | 'qr' | 'khata';

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
  discountCode: string;
  discountAmount: number;
  tax: number;
  total: number;
  tenderMode: TenderMode;
  tenderedAmount: number;
  changeAmount: number;
  customer?: Customer;
  refundStatus?: 'none' | 'partial' | 'full';
  refundedAmount?: number;
}
