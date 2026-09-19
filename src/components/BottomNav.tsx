import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  LayoutDashboard,
  ShoppingBag,
  Boxes,
  Receipt,
  SlidersHorizontal,
  Lock,
  Building2,
  Sparkles,
  RotateCcw,
  Printer,
  Cpu,
  Store,
  Users,
  Shield,
  Key,
  ShoppingCart,
  UserPlus,
  Truck,
  ArrowUpDown,
  CreditCard,
  Layers,
  WifiOff,
  Wrench,
  BarChart3,
  Activity,
  FileCheck,
  Building,
  Monitor,
  ShieldAlert,
  LayoutGrid
} from 'lucide-react';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, cartCount = 0 }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as ScreenType,
      label: 'Owner',
      icon: LayoutDashboard,
    },
    {
      id: 'pos' as ScreenType,
      label: 'POS',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: 'inventory' as ScreenType,
      label: 'Stock',
      icon: Boxes,
    },
    {
      id: 'orders' as ScreenType,
      label: 'Orders',
      icon: Receipt,
    },
  ];

  const quickScreens: { category: string; screens: { id: ScreenType; label: string; desc: string; icon: React.ElementType }[] }[] = [
    {
      category: 'Enterprise Web HQ',
      screens: [
        { id: 'web_dashboard', label: 'Super Admin Global HQ', desc: 'Multi-tenant fleet & GMV command center', icon: LayoutGrid },
        { id: 'web_tenants', label: 'Businesses & Store Fleet', desc: 'Multi-store franchises & provisioned DBs', icon: Building },
        { id: 'web_auth', label: 'Operations Auth & SSO Hub', desc: 'Enterprise FIPS 140-2 Web Gateway', icon: Monitor },
        { id: 'web_root_console', label: 'Master Root Access Console', desc: 'Hardware enclave & HSM kernel decryption', icon: ShieldAlert },
      ],
    },
    {
      category: 'Register & Checkout',
      screens: [
        { id: 'cart_tender', label: 'Active Cart & Tender', desc: 'Line items, discounts, split pay', icon: ShoppingCart },
        { id: 'tender', label: 'Tender Payment Deck', desc: 'Cash, Card, QR & Receipt', icon: Sparkles },
        { id: 'returns', label: 'Returns & Refunds', desc: 'Receipt lookup & manager approval', icon: RotateCcw },
        { id: 'transactions', label: 'Settled Transactions', desc: 'Order ledger & reprints', icon: Receipt },
        { id: 'customers', label: 'Customer Loyalty', desc: 'VIP accounts, store credit & points', icon: Users },
      ],
    },
    {
      category: 'Purchasing & Supply Chain',
      screens: [
        { id: 'purchase_orders', label: 'Purchase Orders & Intake', desc: 'Dock receiving & credit memos', icon: Truck },
        { id: 'stock_adjustments', label: 'Stock Adjustments & Waste', desc: 'Spoilage, shrinkage & compost log', icon: ArrowUpDown },
        { id: 'stock_transfers', label: 'Inter-Store Transfers', desc: 'Waybill manifests & transit tracking', icon: Store },
        { id: 'inventory', label: 'Stock Inventory Ledger', desc: 'Catalog, barcode labels & stock', icon: Boxes },
      ],
    },
    {
      category: 'Hardware & Sync Fleet',
      screens: [
        { id: 'fleet_hub', label: 'Register & Hardware Fleet', desc: 'Lane diagnostics & device telemetry', icon: Cpu },
        { id: 'offline_sync', label: 'Offline Sync Center', desc: 'SQLite queue & conflict resolution', icon: WifiOff },
        { id: 'hardware_diagnostics', label: 'Peripheral Test Suite', desc: 'Cutter, printer slip & scanner test', icon: Wrench },
        { id: 'hardware_pairing', label: 'Hardware Pairing Wizard', desc: 'Scale, printer & barcode scanner', icon: Cpu },
      ],
    },
    {
      category: 'Billing & Merchant Plans',
      screens: [
        { id: 'subscription_overview', label: 'Plan & Usage Overview', desc: 'Active tier, register & staff quotas', icon: CreditCard },
        { id: 'billing_plans', label: 'Upgrade Plans & Tiers', desc: 'Starter, Growth & Enterprise tiers', icon: Sparkles },
        { id: 'billing_invoices', label: 'Invoices & Payment Methods', desc: 'Card vault, tax ID & PDF receipts', icon: Receipt },
      ],
    },
    {
      category: 'Analytics & Fiscal Audits',
      screens: [
        { id: 'analytics_hub', label: 'Sales & Revenue Analytics', desc: 'Hourly velocity, rush & tender mix', icon: BarChart3 },
        { id: 'cashier_performance', label: 'Cashier & Till Performance', desc: 'Shift variance audit & leaderboard', icon: Activity },
        { id: 'tax_audit', label: 'Category Margins & Tax Audit', desc: 'COGS, 7.5% tax & zero-tax exemptions', icon: FileCheck },
        { id: 'z_report', label: 'Shift & Z-Report', desc: 'Till audit, float & fiscal close', icon: Printer },
      ],
    },
    {
      category: 'Staff & Security',
      screens: [
        { id: 'staff_directory', label: 'Staff Directory', desc: 'Floor team, active shifts, PINs', icon: Users },
        { id: 'roles_matrix', label: 'Roles & Permissions', desc: 'Granular entitlement toggles', icon: Shield },
        { id: 'invite_staff', label: 'Invite New Staff', desc: 'Enrollment & lane assignments', icon: UserPlus },
        { id: 'password_recovery', label: 'Password Recovery', desc: 'Vault reset & terminal sign-out', icon: Key },
        { id: 'pin_auth', label: '4-Digit PIN Lock', desc: 'Fast counter login keypad', icon: Lock },
        { id: 'workspace_login', label: 'Workspace Sign In', desc: 'Store domain & biometrics', icon: Building2 },
        { id: 'store_setup', label: 'Store Setup Wizard', desc: 'Tax rates, currency & branch profile', icon: Building },
        { id: 'settings', label: 'Terminal Settings', desc: 'Local peripherals & offline cache', icon: SlidersHorizontal },
      ],
    },
  ];

  return (
    <>
      {/* "More" Drawer Backdrop & Sheet */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-xs flex flex-col justify-end">
          <div
            className="fixed inset-0"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl mx-auto bg-white rounded-t-2xl p-4 pb-8 max-h-[85vh] overflow-y-auto shadow-2xl border-t border-[#bccac0]/30 animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-[#bccac0]/60 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <h3 className="font-bold text-sm text-[#0b1c30]">Store & Terminal Workspaces</h3>
                <span className="font-mono text-[10px] text-[#565e74] uppercase tracking-wider">
                  All 13 FreshPOS modules connected
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(false)}
                className="px-3 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-xs text-[#006948] font-bold"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {quickScreens.map((group) => (
                <div key={group.category} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold tracking-wider px-1">
                    {group.category}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {group.screens.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentScreen === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onNavigate(item.id);
                            setIsMoreMenuOpen(false);
                          }}
                          className={`p-2.5 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                            isActive
                              ? 'bg-[#85f8c4]/20 border-[#006948] text-[#006948]'
                              : 'bg-[#eff4ff] border-transparent text-[#0b1c30] hover:bg-[#e5eeff]'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                            isActive ? 'bg-[#006948] text-white' : 'bg-white text-[#006948]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate leading-tight">{item.label}</div>
                            <div className="text-[10px] text-[#565e74] truncate leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Dock Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#bccac0]/25 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-[#006948] font-bold'
                    : 'text-[#565e74] hover:text-[#0b1c30]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2 bg-[#ba1a1a] text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] tracking-tight">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#006948] -mt-0.5" />
                )}
              </button>
            );
          })}

          {/* More button */}
          <button
            type="button"
            onClick={() => setIsMoreMenuOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 rounded-xl transition-all ${
              !['dashboard', 'pos', 'inventory', 'orders'].includes(currentScreen)
                ? 'text-[#006948] font-bold'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-mono text-[11px] tracking-tight">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
