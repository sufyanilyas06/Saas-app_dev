/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, UserRole, Product, CartItem, Customer, CompletedOrder, ToastMessage } from './types';
import { MOCK_PRODUCTS, MOCK_COMPLETED_ORDERS, MOCK_CUSTOMERS } from './data/mockData';
import { api, ServerHealth } from './services/api';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';

// Screen components
import { PosBillingScreen } from './components/screens/PosBillingScreen';
import { TenderPaymentScreen } from './components/screens/TenderPaymentScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { PinAuthScreen } from './components/screens/PinAuthScreen';
import { WorkspaceLoginScreen } from './components/screens/WorkspaceLoginScreen';
import { TransactionsHistoryScreen } from './components/screens/TransactionsHistoryScreen';
import { CustomersScreen } from './components/screens/CustomersScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ReturnsRefundScreen } from './components/screens/ReturnsRefundScreen';
import { ShiftZReportScreen } from './components/screens/ShiftZReportScreen';
import { HardwarePairingScreen } from './components/screens/HardwarePairingScreen';
import { StoreSetupScreen } from './components/screens/StoreSetupScreen';
import { StaffDirectoryScreen } from './components/screens/StaffDirectoryScreen';
import { RolesMatrixScreen } from './components/screens/RolesMatrixScreen';
import { InviteStaffScreen } from './components/screens/InviteStaffScreen';
import { PasswordRecoveryScreen } from './components/screens/PasswordRecoveryScreen';
import { ActiveCartTenderScreen } from './components/screens/ActiveCartTenderScreen';
import { PurchaseOrdersScreen } from './components/screens/PurchaseOrdersScreen';
import { StockAdjustmentsScreen } from './components/screens/StockAdjustmentsScreen';
import { StockTransfersScreen } from './components/screens/StockTransfersScreen';
import { PlanUpgradeScreen } from './components/screens/PlanUpgradeScreen';
import { BillingInvoicesScreen } from './components/screens/BillingInvoicesScreen';
import { SubscriptionOverviewScreen } from './components/screens/SubscriptionOverviewScreen';
import { FleetHubScreen } from './components/screens/FleetHubScreen';
import { OfflineSyncScreen } from './components/screens/OfflineSyncScreen';
import { HardwareDiagnosticsScreen } from './components/screens/HardwareDiagnosticsScreen';
import { AnalyticsHubScreen } from './components/screens/AnalyticsHubScreen';
import { CashierPerformanceScreen } from './components/screens/CashierPerformanceScreen';
import { TaxAuditScreen } from './components/screens/TaxAuditScreen';
import { WebAuthPortalScreen } from './components/web/WebAuthPortalScreen';
import { WebMasterRootConsoleScreen } from './components/web/WebMasterRootConsoleScreen';
import { WebSuperAdminHqScreen } from './components/web/WebSuperAdminHqScreen';
import { WebTenantFleetScreen } from './components/web/WebTenantFleetScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('pos');
  const [activeRole, setActiveRole] = useState<UserRole>('cashier');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Initial cart with items matching the reference receipt
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 3 }, // Organic Hass Avocados (3 pcs)
    { product: MOCK_PRODUCTS[1], quantity: 1 }, // Farm Fresh 2% Milk (1 gal)
    { product: MOCK_PRODUCTS[2], quantity: 1 }, // Artisanal Sourdough (1 loaf)
    { product: MOCK_PRODUCTS[3], quantity: 1 }, // Honeycrisp Apples (1.85 kg)
    { product: MOCK_PRODUCTS[5], quantity: 1 }, // Greek Whole Milk Yogurt
  ]);

  const [customer, setCustomer] = useState<Customer | null>(MOCK_CUSTOMERS[0]); // Maria Santos (Tier 2 VIP)
  const [orders, setOrders] = useState<CompletedOrder[]>(MOCK_COMPLETED_ORDERS);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [serverHealth, setServerHealth] = useState<ServerHealth | null>(null);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToast({
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type,
    });
  };

  // Sync state with FreshPOS backend
  useEffect(() => {
    let isMounted = true;

    async function initBackendSync() {
      try {
        const [healthData, productsData, ordersData] = await Promise.all([
          api.getHealth(),
          api.getProducts(),
          api.getOrders(),
        ]);

        if (isMounted) {
          setServerHealth(healthData);
          if (productsData && productsData.length > 0) {
            setProducts(productsData);
          }
          if (ordersData && ordersData.length > 0) {
            setOrders(ordersData);
          }
        }
      } catch (err) {
        console.warn('Initial backend sync error:', err);
      }
    }

    initBackendSync();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateCart = (productId: string, delta: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === productId);
      if (!existing) {
        if (delta <= 0) return prevCart;
        const prod = products.find((p) => p.id === productId);
        if (!prod) return prevCart;
        return [...prevCart, { product: prod, quantity: delta }];
      }

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prevCart.filter((item) => item.product.id !== productId);
      }

      return prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
    api.updateStock(productId, { newStock }).catch((err) => {
      console.warn('Could not sync stock to backend:', err);
    });
  };

  const handleCompleteSale = (completedOrder: CompletedOrder) => {
    setOrders((prev) => [completedOrder, ...prev]);

    // Deduct stock for each cart item
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const sold = completedOrder.items.find((i) => i.product.id === p.id);
        if (sold) {
          return { ...p, stock: Math.max(0, p.stock - sold.quantity) };
        }
        return p;
      })
    );

    // Empty cart for new transaction
    setCart([]);

    // Persist to backend server
    api.createOrder(completedOrder).then((created) => {
      if (created) {
        showToast(`Order ${created.invoiceNumber} synced to backend server`, 'success');
      }
    }).catch(console.warn);
  };

  const handleBarcodeScan = (scannedProduct: Product) => {
    if (currentScreen === 'pos' || currentScreen === 'tender') {
      handleUpdateCart(scannedProduct.id, 1);
      showToast(`Scanned: ${scannedProduct.name} (+$${scannedProduct.price.toFixed(2)})`, 'success');
    } else {
      showToast(`Located in inventory: ${scannedProduct.name} - ${scannedProduct.aisleShelf}`, 'info');
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    if (newRole === 'owner') {
      setCurrentScreen('dashboard');
    } else if (newRole === 'inventory') {
      setCurrentScreen('inventory');
    } else {
      setCurrentScreen('pos');
    }
    showToast(`Switched active terminal role to: ${newRole.toUpperCase()}`);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Determine screen title
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'pos':
        return 'Point of Sale';
      case 'cart_tender':
        return 'Active Cart & Tender';
      case 'tender':
        return 'Tender Payment';
      case 'returns':
        return 'Returns & Refunds';
      case 'z_report':
        return 'Shift & Z-Report';
      case 'hardware_pairing':
        return 'Hardware Pairing';
      case 'store_setup':
      case 'create-store':
        return 'Store Profile & Tax Setup';
      case 'staff_directory':
        return 'Staff & Team Directory';
      case 'roles_matrix':
        return 'Roles & Permissions Matrix';
      case 'invite_staff':
        return 'Invite New Staff';
      case 'password_recovery':
        return 'Password Recovery';
      case 'inventory':
        return 'Stock Ledger';
      case 'dashboard':
        return 'Store Intelligence';
      case 'pin_auth':
      case 'pin-lock':
        return 'Staff Authentication';
      case 'workspace_login':
      case 'workspace-login':
        return 'Workspace Sign In';
      case 'transactions':
      case 'orders':
        return 'Settled Transactions';
      case 'customers':
        return 'Customer Loyalty';
      case 'settings':
        return 'Terminal Setup';
      case 'purchase_orders':
        return 'Purchase Orders & Intake';
      case 'stock_adjustments':
        return 'Stock Adjustments & Waste';
      case 'stock_transfers':
        return 'Inter-Store Transfers';
      case 'billing_plans':
        return 'Upgrade Plans & Tiers';
      case 'billing_invoices':
        return 'Billing & Invoices';
      case 'subscription_overview':
        return 'Subscription & Plan Usage';
      case 'fleet_hub':
        return 'Register Fleet Hub';
      case 'offline_sync':
        return 'Offline Sync Center';
      case 'hardware_diagnostics':
        return 'Hardware Diagnostics Suite';
      case 'analytics_hub':
        return 'Sales & Revenue Analytics';
      case 'cashier_performance':
        return 'Cashier & Till Performance';
      case 'tax_audit':
        return 'Category Margins & Tax Audit';
      case 'web_auth':
        return 'Enterprise Access Portal';
      case 'web_root_console':
        return 'Master Root Access Console';
      case 'web_dashboard':
        return 'FreshPOS Cloud Central HQ';
      case 'web_tenants':
        return 'Businesses & Tenant Management';
      default:
        return 'FreshPOS';
    }
  };

  const isSubScreen = [
    'tender',
    'cart_tender',
    'returns',
    'z_report',
    'hardware_pairing',
    'store_setup',
    'create-store',
    'staff_directory',
    'roles_matrix',
    'invite_staff',
    'password_recovery',
    'workspace_login',
    'workspace-login',
    'transactions',
    'orders',
    'customers',
    'settings',
    'purchase_orders',
    'stock_adjustments',
    'stock_transfers',
    'billing_plans',
    'billing_invoices',
    'subscription_overview',
    'fleet_hub',
    'offline_sync',
    'hardware_diagnostics',
    'analytics_hub',
    'cashier_performance',
    'tax_audit',
    'web_auth',
    'web_root_console',
    'web_dashboard',
    'web_tenants',
  ].includes(currentScreen);

  // Dedicated Web Portal layout for Enterprise HQ web screens
  if (currentScreen === 'web_dashboard') {
    return (
      <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#85f8c4] selection:text-[#002114] antialiased">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <WebSuperAdminHqScreen
          onShowToast={showToast}
          onNavigate={setCurrentScreen}
        />
      </div>
    );
  }

  if (currentScreen === 'web_tenants') {
    return (
      <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#85f8c4] selection:text-[#002114] antialiased">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <WebTenantFleetScreen
          onShowToast={showToast}
          onNavigate={setCurrentScreen}
        />
      </div>
    );
  }

  if (currentScreen === 'web_auth') {
    return (
      <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#85f8c4] selection:text-[#002114] antialiased">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <WebAuthPortalScreen
          onShowToast={showToast}
          onNavigateToMobileApp={() => setCurrentScreen('pos')}
          onNavigate={setCurrentScreen}
          onLoginSuccess={(mode) => {
            showToast(`Master session active (${mode} mode). Launching Back-Office cluster.`, 'success');
            if (mode === 'hq') {
              setCurrentScreen('web_dashboard');
            }
          }}
        />
      </div>
    );
  }

  if (currentScreen === 'web_root_console') {
    return (
      <div className="min-h-screen bg-[#f4f7fc] text-[#0b1c30] flex flex-col font-sans selection:bg-[#006948] selection:text-white antialiased">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <WebMasterRootConsoleScreen
          onShowToast={showToast}
          onNavigate={setCurrentScreen}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#85f8c4] selection:text-[#002114] antialiased">
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main App Bar Header */}
      <Header
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        cartCount={totalCartCount}
        title={getScreenTitle()}
        showBack={isSubScreen}
        onBack={() => setCurrentScreen('pos')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-14">
        {currentScreen === 'pos' && (
          <PosBillingScreen
            products={products}
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onOpenScanner={() => setIsScannerOpen(true)}
            onNavigateToTender={() => setCurrentScreen('tender')}
            customer={customer}
            onAttachCustomer={setCustomer}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'cart_tender' && (
          <ActiveCartTenderScreen
            cart={cart}
            customer={customer}
            onUpdateCart={handleUpdateCart}
            onNavigateToTender={() => setCurrentScreen('tender')}
            onOpenScanner={() => setIsScannerOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'tender' && (
          <TenderPaymentScreen
            cart={cart}
            customer={customer}
            onCompleteSale={handleCompleteSale}
            onBackToPos={() => setCurrentScreen('pos')}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'returns' && (
          <ReturnsRefundScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'z_report' && (
          <ShiftZReportScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'hardware_pairing' && (
          <HardwarePairingScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'store_setup' && (
          <StoreSetupScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'staff_directory' && (
          <StaffDirectoryScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'roles_matrix' && (
          <RolesMatrixScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'invite_staff' && (
          <InviteStaffScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'password_recovery' && (
          <PasswordRecoveryScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'inventory' && (
          <InventoryScreen
            products={products}
            onUpdateStock={handleUpdateStock}
            onOpenScanner={() => setIsScannerOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigateToPOS={() => setCurrentScreen('pos')}
            onNavigateToStock={() => setCurrentScreen('inventory')}
            onShowToast={showToast}
          />
        )}

        {(currentScreen === 'pin_auth' || currentScreen === 'pin-lock') && (
          <PinAuthScreen
            onSuccess={(role) => {
              setActiveRole(role);
              if (role === 'owner') setCurrentScreen('dashboard');
              else if (role === 'inventory') setCurrentScreen('inventory');
              else setCurrentScreen('pos');
            }}
            onShowToast={showToast}
          />
        )}

        {(currentScreen === 'workspace_login' || currentScreen === 'workspace-login') && (
          <WorkspaceLoginScreen
            onSignInSuccess={() => setCurrentScreen('dashboard')}
            onNavigateToPin={() => setCurrentScreen('pin_auth')}
            onShowToast={showToast}
          />
        )}

        {(currentScreen === 'transactions' || currentScreen === 'orders') && (
          <TransactionsHistoryScreen
            orders={orders}
            onShowToast={showToast}
            onNavigateToPos={() => setCurrentScreen('pos')}
          />
        )}

        {currentScreen === 'customers' && (
          <CustomersScreen
            onSelectCustomer={(c) => {
              setCustomer(c);
              setCurrentScreen('pos');
            }}
            onShowToast={showToast}
            onNavigateToPos={() => setCurrentScreen('pos')}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen onShowToast={showToast} />
        )}

        {currentScreen === 'purchase_orders' && (
          <PurchaseOrdersScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'stock_adjustments' && (
          <StockAdjustmentsScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'stock_transfers' && (
          <StockTransfersScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'billing_plans' && (
          <PlanUpgradeScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'billing_invoices' && (
          <BillingInvoicesScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'subscription_overview' && (
          <SubscriptionOverviewScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'fleet_hub' && (
          <FleetHubScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'offline_sync' && (
          <OfflineSyncScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'hardware_diagnostics' && (
          <HardwareDiagnosticsScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'analytics_hub' && (
          <AnalyticsHubScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'cashier_performance' && (
          <CashierPerformanceScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'tax_audit' && (
          <TaxAuditScreen
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        )}
      </main>

      {/* Persistent Bottom Bar with 4 primary destinations and '+ More' Drawer */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        cartCount={totalCartCount}
      />

      {/* Laser Barcode Reticle Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanMatch={handleBarcodeScan}
        products={products}
      />
    </div>
  );
}

