import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database Store for FreshPOS Cloud Backend
interface DBProduct {
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

interface DBCustomer {
  id: string;
  name: string;
  phone: string;
  tier: string;
  isVip: boolean;
  creditBalance: number;
}

interface DBOrder {
  id: string;
  invoiceNumber: string;
  date: string;
  cashier: string;
  counter: string;
  items: Array<{ product: DBProduct; quantity: number }>;
  subtotal: number;
  discountCode: string;
  discountAmount: number;
  tax: number;
  total: number;
  tenderMode: 'cash' | 'card' | 'qr' | 'khata';
  tenderedAmount: number;
  changeAmount: number;
  customer?: DBCustomer;
  refundStatus?: 'none' | 'partial' | 'full';
  refundedAmount?: number;
}

interface DBShift {
  shiftId: string;
  cashier: string;
  lane: string;
  startTime: string;
  openingFloat: number;
  cashSales: number;
  cardSales: number;
  totalTransactions: number;
  status: 'open' | 'closed';
  closedAt?: string;
  countedCash?: number;
  variance?: number;
}

// Seed Store Data
let products: DBProduct[] = [
  {
    id: 'prod-101',
    name: 'Organic Bananas',
    category: 'produce',
    categoryLabel: 'Fresh Produce',
    price: 1.89,
    unit: '1.2 kg bndl',
    stock: 42,
    minStock: 20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALsBV0SC2nnox477NumSi7LTsmqEK9CB4zdPApNEJWdhmtPawxbdaY2I8zPCWVEdoV9uhVsMSRG4IlcZGFEujNI5e6Em6Rh3d-LIqU2ONTrNvNf7Bmfwu44RGy5wYDzMSzDiH8dRL0Ja20OI_svUNCJheRwaerEtAprILSMfB1sadFFdr6F70YQ3Se7Xd09mrF8k0fAfima_Kbnz6VBP2yiCWjEWeKCE7RTgpS2ZfacDu9Uolhc2LN2g',
    sku: 'SKU-1092',
    barcode: '0029311092',
    aisleShelf: 'Produce • Bin 12',
    batch: '#EC-401',
    expiryDays: 5,
    expiryLabel: 'Exp: 5 Days',
  },
  {
    id: 'prod-102',
    name: 'Whole Milk 2L',
    category: 'dairy',
    categoryLabel: 'Dairy & Eggs',
    price: 3.49,
    unit: 'Pasteurized • 2L',
    stock: 3,
    minStock: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk7qr69RuRWYaetjouyQR4lzZsKC-p8Pbj__V9ownxD3MzNFlDuzyjB_PgL95PjtIMSwDKA0XL9NmYYo092JYYeFF5aAqEZI4Tc5VUQJCaoC_-sQ9_jBl_ghFhXhgC1dpHt_WfuQcYJgNowMXliGfq5u7UsVP5zNfgohkYkRoT_jK2FOCY0l80e7YHjq-oyLVVkte37Rn5GGjmO9lL6NR7UwuPp4j64Uo_k5cPx-BaYZ9vE4zrvxuZEQ',
    sku: 'SKU-4412',
    barcode: '7891024412',
    aisleShelf: 'Aisle 4 • Shelf B',
    batch: '#MK-882',
    expiryDays: 0,
    expiryLabel: 'Expires: Today',
    isLowStock: true,
    isExpiring: true,
  },
  {
    id: 'prod-103',
    name: 'Rustic Sourdough',
    category: 'bakery',
    categoryLabel: 'Bakery',
    price: 4.95,
    unit: '650g Loaf',
    stock: 18,
    minStock: 10,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i2vLoLq_VDIxOThgW_3uyauY0TPR1CRYCuQNIZA4klIH7vJEFk1ThWJKF6dlIauLw4R_WGt6sfysawz_p3rxkPxnLiPMP8t3A60BwflU4DToz5LN_Omu7EVxAnY4ra3x70CyLXvd7vctTHguPCsuj-JbXHI3v8mpp87ctbYzkfsOjtXKx0gCpXhgLxgl5lk6SovXCffHiNKQzb8FP3oTHHwlBE8HRiZOk4qWJkyheBLoKaoBY-AcWg',
    sku: 'SKU-8301',
    barcode: '4400298301',
    aisleShelf: 'Bakery • Display A',
    batch: '#BK-104',
    expiryDays: 1,
    expiryLabel: 'Stockout risk',
  },
  {
    id: 'prod-104',
    name: 'Hass Avocados (4pk)',
    category: 'produce',
    categoryLabel: 'Fresh Produce',
    price: 5.25,
    unit: 'Net Bag • 4pk',
    stock: 29,
    minStock: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6g7RH9OuphBg2qVyluIKdZBbjcyTnHMifV744uCXr8rGBd5fhpShVyV3msI5F6lS3DmzRCGkz5n5hoqCTPSjdr9xXgMP7pAHut9twegUzApFAP8tmXmLbIWRY6zVybw9lHNELP4U-DwVvyXZW2oRPQQ0U1AakUdE04WEkRk8HB5gMwoDz6A4n8P2vgyIyJXZ-hXz_ZcL2UVB2KQr6iiiv2HrZIK742adiHEY1tdD0fb4k1kzJL4Sug',
    sku: 'SKU-3398',
    barcode: '3398410291',
    aisleShelf: 'Produce • Bin 04',
    batch: '#AV-991',
    expiryDays: 3,
    expiryLabel: 'Exp: 3 Days',
  },
  {
    id: 'prod-105',
    name: 'Nitro Cold Brew',
    category: 'beverages',
    categoryLabel: 'Beverages',
    price: 3.99,
    unit: '330ml Can',
    stock: 55,
    minStock: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6o_W0Tj4vO3aThz4omV4ryXJR2BW6b_d7j0vxEVMHha9SNp6l6rsVZmPgt8Wv3C3d7QvTboDfBKo1hhKphBjB_IhGj4uOiaSUR3NeRewyTUFUk4PUT-zPgoIuWLOS0_hoXe9z0NDarLAgFB1gE6qL9OFlnEbshMIe41wY3BakKBT5hdhTG_aj4IPLf2f52gRWu1pmeIYqNmd87GZ5iXGliG3N_HX1J63Eg704QtVmKjpOYLFbv9kOhQ',
    sku: 'SKU-5129',
    barcode: '5129984321',
    aisleShelf: 'Aisle 1 • Cooler C',
    batch: '#CB-204',
    expiryDays: 30,
    expiryLabel: 'Exp: 30 Days',
  },
  {
    id: 'prod-106',
    name: 'Sparkling Water 1L',
    category: 'beverages',
    categoryLabel: 'Beverages',
    price: 2.15,
    unit: 'Glass btl • 1.0L',
    stock: 2,
    minStock: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB357IGU50Fj7GHWYH_KWk9dftLgbxRD1DAzheCXZ0QgT998rCFdXtIQRkGqc4j3LUFcMYZoSxS6dMHV0HZqdghagA0Jn7VOLGjCrDXZ7wL-CTfRBzKH5N4nLg3Lhrp28z3UiRnzhOCUcR0lZRlSn0L6RB_G3RS2M9tQ2XJkE_Yot8Ou0ZbnOBTZ8pYgrl5bfWmKdfxmcPa2iyDjYwbIYFUF9sKewxFZNyRFUoUgfMVKn2i7yDJrUxQhg',
    sku: 'SKU-9011',
    barcode: '9011247732',
    aisleShelf: 'Aisle 1 • Shelf D',
    batch: '#SP-109',
    expiryDays: 60,
    expiryLabel: 'Exp: 60 Days',
    isLowStock: true,
  },
  {
    id: 'prod-107',
    name: 'Olive Oil Cold Pressed 750ml',
    category: 'produce',
    categoryLabel: 'Pantry',
    price: 12.99,
    unit: 'Glass btl • 750ml',
    stock: 18,
    minStock: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Ss70b0E8XosmOLLKEo2DcIMCuovj3B6HLNcUM_rvux2WGKr1-ny5lQPeSgvQeekH8sy4YcmJuErrIEzV0eT5IF8MWNGZFrboDI6eeVrmLlhGrFwhjYXXtk8QhyTHgElwNIfOSM3cyC5-9xe8N3i4j9NBXT901KTI7RBGIEc0bcfY3aYXMVLPDgmFzCJXPMnBQeTwjAwy8Aafebdu9mQQt6tnPD0g5cq1JslIcr7JevHrSKrNLDJ_Dg',
    sku: 'SKU-9920',
    barcode: '5012499208',
    aisleShelf: 'Aisle 2 • Shelf D',
    batch: '#EV-770',
    expiryDays: 2,
    expiryLabel: 'Exp: 2 Days',
    isExpiring: true,
  },
  {
    id: 'prod-108',
    name: 'Greek Whole Yogurt 32oz',
    category: 'dairy',
    categoryLabel: 'Dairy & Eggs',
    price: 7.09,
    unit: 'Tub • 32oz',
    stock: 8,
    minStock: 12,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    sku: 'SKU-7709',
    barcode: '8842990128',
    aisleShelf: 'Aisle 4 • Cooler A',
    batch: '#YG-312',
    expiryDays: 4,
    expiryLabel: 'Exp: 4 Days',
  },
  {
    id: 'prod-109',
    name: 'Honeycrisp Apples (Bulk)',
    category: 'produce',
    categoryLabel: 'Fresh Produce',
    price: 4.20,
    unit: 'Per kg',
    stock: 35,
    minStock: 15,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80',
    sku: 'SKU-2041',
    barcode: '4201992041',
    aisleShelf: 'Produce • Bin 02',
    batch: '#AP-882',
    expiryDays: 7,
    expiryLabel: 'Exp: 7 Days',
  },
];

let customers: DBCustomer[] = [
  {
    id: 'cust-882',
    name: 'Maria Santos',
    phone: '+1 (555) 019-2831',
    tier: 'Tier 2 VIP',
    isVip: true,
    creditBalance: 120.00,
  },
  {
    id: 'cust-883',
    name: 'David Chen',
    phone: '+1 (555) 304-9122',
    tier: 'Tier 1 VIP',
    isVip: true,
    creditBalance: 45.50,
  },
  {
    id: 'cust-884',
    name: 'Elena Rostova',
    phone: '+1 (555) 819-3304',
    tier: 'Tier 3 Diamond VIP',
    isVip: true,
    creditBalance: 280.00,
  },
];

let orders: DBOrder[] = [
  {
    id: 'ord-8842',
    invoiceNumber: '#INV-8842',
    date: 'Today, 15:42',
    cashier: 'Sarah J.',
    counter: 'Lane 01',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[3], quantity: 1 },
      { product: products[4], quantity: 2 },
    ],
    subtotal: 17.01,
    discountCode: 'VIP10',
    discountAmount: 1.70,
    tax: 0.77,
    total: 16.08,
    tenderMode: 'card',
    tenderedAmount: 16.08,
    changeAmount: 0,
    customer: customers[0],
    refundStatus: 'none',
  },
  {
    id: 'ord-8841',
    invoiceNumber: '#INV-8841',
    date: 'Today, 15:28',
    cashier: 'Sarah J.',
    counter: 'Lane 01',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 2 },
    ],
    subtotal: 8.87,
    discountCode: '',
    discountAmount: 0,
    tax: 0.44,
    total: 9.31,
    tenderMode: 'card',
    tenderedAmount: 9.31,
    changeAmount: 0,
    customer: customers[0],
    refundStatus: 'none',
  },
  {
    id: 'ord-8840',
    invoiceNumber: '#INV-8840',
    date: 'Today, 15:12',
    cashier: 'Alex M.',
    counter: 'Lane 02',
    items: [
      { product: products[4], quantity: 3 },
      { product: products[2], quantity: 1 },
    ],
    subtotal: 16.92,
    discountCode: 'PROMO5',
    discountAmount: 1.00,
    tax: 0.80,
    total: 16.72,
    tenderMode: 'cash',
    tenderedAmount: 20.00,
    changeAmount: 3.28,
    refundStatus: 'none',
  },
];

let currentShift: DBShift = {
  shiftId: 'shift-104',
  cashier: 'Sarah J.',
  lane: 'Lane 01',
  startTime: '08:00 AM Today',
  openingFloat: 250.00,
  cashSales: 1472.82,
  cardSales: 2190.50,
  totalTransactions: 64,
  status: 'open',
};

const tenantsFleet = [
  {
    id: 'tenant-104',
    name: 'FreshMart Downtown Flagship',
    slug: 'freshmart-downtown',
    plan: 'Enterprise',
    stores: 4,
    lanes: 18,
    status: 'HEALTHY',
    mrr: '$4,200/mo',
    region: 'us-east4',
    cloudDb: 'pg-cluster-east4-b',
    lastSync: '12s ago',
  },
  {
    id: 'tenant-105',
    name: 'GreenValley Organics Co-op',
    slug: 'greenvalley-coop',
    plan: 'Pro',
    stores: 2,
    lanes: 8,
    status: 'HEALTHY',
    mrr: '$1,800/mo',
    region: 'us-central1',
    cloudDb: 'pg-cluster-central1-a',
    lastSync: '45s ago',
  },
  {
    id: 'tenant-106',
    name: 'Artisan Corner Bakery & Deli',
    slug: 'artisan-bakery',
    plan: 'Starter',
    stores: 1,
    lanes: 2,
    status: 'SYNCING',
    mrr: '$490/mo',
    region: 'us-west1',
    cloudDb: 'pg-cluster-west1-c',
    lastSync: '2m ago',
  },
];

// Lazy Gemini AI Client initialization
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

// ---------------- API ENDPOINTS ----------------

// 1. Health & Server Telemetry
app.get('/api/health', (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    version: '4.8.2',
    memoryUsageMB: Math.round(mem.rss / (1024 * 1024)),
    activeStore: 'FreshMart Downtown Flagship (#104)',
    activeLane: 'Lane #01 (HSM Secure Terminal)',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// 2. Products & Inventory APIs
app.get('/api/products', (req, res) => {
  const { category, query, lowStock } = req.query;
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.barcode.includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  if (lowStock === 'true') {
    filtered = filtered.filter((p) => p.stock <= p.minStock);
  }

  res.json({
    success: true,
    count: filtered.length,
    products: filtered,
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id || p.barcode === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

app.patch('/api/products/:id/stock', (req, res) => {
  const { delta, newStock, reason } = req.body;
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  if (typeof newStock === 'number') {
    product.stock = Math.max(0, newStock);
  } else if (typeof delta === 'number') {
    product.stock = Math.max(0, product.stock + delta);
  }

  product.isLowStock = product.stock <= product.minStock;
  product.isOutOfStock = product.stock === 0;

  res.json({
    success: true,
    message: `Stock updated for ${product.name} to ${product.stock} units`,
    product,
    reason: reason || 'Manual adjustment',
  });
});

// 3. Orders & Checkout APIs
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    count: orders.length,
    orders,
  });
});

app.post('/api/orders', (req, res) => {
  const {
    items,
    subtotal,
    discountCode,
    discountAmount,
    tax,
    total,
    tenderMode,
    tenderedAmount,
    changeAmount,
    cashier,
    counter,
    customerId,
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  // Deduct inventory
  for (const item of items) {
    const prod = products.find((p) => p.id === item.product.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      prod.isLowStock = prod.stock <= prod.minStock;
    }
  }

  const invoiceNumber = `#INV-${Math.floor(1000 + Math.random() * 9000)}`;
  const customer = customerId ? customers.find((c) => c.id === customerId) : undefined;

  const newOrder: DBOrder = {
    id: `ord-${Date.now()}`,
    invoiceNumber,
    date: 'Just now',
    cashier: cashier || 'Sarah J.',
    counter: counter || 'Lane 01',
    items,
    subtotal: Number(subtotal) || 0,
    discountCode: discountCode || '',
    discountAmount: Number(discountAmount) || 0,
    tax: Number(tax) || 0,
    total: Number(total) || 0,
    tenderMode: tenderMode || 'card',
    tenderedAmount: Number(tenderedAmount) || Number(total) || 0,
    changeAmount: Number(changeAmount) || 0,
    customer,
    refundStatus: 'none',
  };

  orders.unshift(newOrder);

  // Update current shift telemetry
  currentShift.totalTransactions += 1;
  if (tenderMode === 'cash') {
    currentShift.cashSales += newOrder.total;
  } else {
    currentShift.cardSales += newOrder.total;
  }

  res.status(201).json({
    success: true,
    message: 'Order created and inventory updated successfully',
    order: newOrder,
  });
});

// Order Refund / Return processing
app.post('/api/orders/:id/refund', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id || o.invoiceNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const { itemsToRefund, refundTender, restockItems, managerPin } = req.body;

  if (managerPin && managerPin !== '9482' && managerPin !== '1234') {
    return res.status(403).json({ success: false, message: 'Invalid Manager PIN for refund override' });
  }

  // Restock inventory if items are in resalable condition
  if (restockItems && Array.isArray(itemsToRefund)) {
    for (const refItem of itemsToRefund) {
      const prod = products.find((p) => p.id === refItem.productId);
      if (prod) {
        prod.stock += refItem.quantity;
      }
    }
  }

  order.refundStatus = 'full';
  order.refundedAmount = order.total;

  res.json({
    success: true,
    message: `Refund of $${order.total.toFixed(2)} processed for ${order.invoiceNumber}`,
    order,
    refundTender: refundTender || order.tenderMode,
  });
});

// 4. Customers & Loyalty APIs
app.get('/api/customers', (req, res) => {
  res.json({
    success: true,
    count: customers.length,
    customers,
  });
});

app.post('/api/customers', (req, res) => {
  const { name, phone, tier, isVip, creditBalance } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  const newCustomer: DBCustomer = {
    id: `cust-${Date.now()}`,
    name,
    phone,
    tier: tier || 'Tier 1 Standard',
    isVip: Boolean(isVip),
    creditBalance: Number(creditBalance) || 0,
  };

  customers.push(newCustomer);
  res.status(201).json({ success: true, customer: newCustomer });
});

// 5. Shift & Z-Report APIs
app.get('/api/shifts/current', (req, res) => {
  const expectedCash = currentShift.openingFloat + currentShift.cashSales;
  res.json({
    success: true,
    shift: {
      ...currentShift,
      expectedCash: Number(expectedCash.toFixed(2)),
    },
  });
});

app.post('/api/shifts/reconcile', (req, res) => {
  const { countedCash, notes } = req.body;
  const expected = currentShift.openingFloat + currentShift.cashSales;
  const variance = Number(countedCash) - expected;

  currentShift.status = 'closed';
  currentShift.closedAt = new Date().toLocaleTimeString();
  currentShift.countedCash = Number(countedCash);
  currentShift.variance = Number(variance.toFixed(2));

  res.json({
    success: true,
    message: 'Shift reconciled and Z-Report recorded',
    summary: {
      shiftId: currentShift.shiftId,
      cashier: currentShift.cashier,
      expectedCash: Number(expected.toFixed(2)),
      countedCash: Number(countedCash),
      variance: Number(variance.toFixed(2)),
      status: Math.abs(variance) <= 5.0 ? 'BALANCED' : 'VARIANCE_FLAGGED',
      notes,
    },
  });
});

// 6. Tenants & Multi-Store APIs
app.get('/api/tenants', (req, res) => {
  res.json({
    success: true,
    totalTenants: tenantsFleet.length,
    activeLanes: 6214,
    mrr: '$184,920.00',
    tenants: tenantsFleet,
  });
});

// 7. Gemini AI Assistant Endpoint (Inventory Forecasting, Pricing & Audit Copilot)
app.post('/api/ai/copilot', async (req, res) => {
  const { task, prompt, context } = req.body;

  const ai = getGeminiClient();

  // If Gemini API is not configured with an API key, provide intelligent server heuristics
  if (!ai) {
    const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;
    const totalInventoryValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);

    return res.json({
      success: true,
      mode: 'heuristic_engine',
      response: `[Store Intelligence Engine]\n\nBased on your active inventory of ${products.length} catalog items:\n` +
        `• Low Stock Alert: ${lowStockCount} items (such as Whole Milk 2L & Sparkling Water 1L) are below safe thresholds.\n` +
        `• Current Stock Valuation: $${totalInventoryValue.toFixed(2)} across produce, dairy, bakery, and beverage lines.\n` +
        `• Reorder Recommendation: Initiate purchase order for Farm Dairy supplier by tomorrow 09:00 AM to prevent a weekend stockout.\n` +
        `• Margin Suggestion: Sourdough turnover is high; consider bundling with cold-pressed olive oil for a 15% combined basket lift.`,
    });
  }

  try {
    const catalogSummary = products
      .map((p) => `${p.name} (Stock: ${p.stock}/${p.minStock}, Price: $${p.price}, Exp: ${p.expiryDays}d)`)
      .join(', ');

    const systemPrompt = `You are FreshPOS Retail Intelligence AI Copilot.
You analyze inventory turnover, pricing strategies, stockout risk, and cashier shift audits.
Current Store: FreshMart Downtown Flagship.
Active Catalog: ${catalogSummary}.
Shift Revenue: Cash $${currentShift.cashSales.toFixed(2)}, Card $${currentShift.cardSales.toFixed(2)}.

Answer concisely, practically, and authoritatively for the retail store manager.`;

    const userQuery = prompt || task || 'Analyze inventory risks and suggest restocking actions.';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nTask: ${userQuery}\nAdditional Context: ${JSON.stringify(context || {})}` }],
        },
      ],
    });

    res.json({
      success: true,
      mode: 'gemini_2.5_flash',
      response: response.text,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      message: 'AI Copilot encountered an error',
      error: error?.message || 'Unknown error',
    });
  }
});

// ---------------- VITE & STATIC MIDDLEWARE ----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FreshPOS Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
