import React, { useState } from 'react';
import { Shield, ShoppingCart, DollarSign, RotateCcw, Box, BarChart3, Save, RotateCcw as ResetIcon, Lock, Check } from 'lucide-react';

interface RolesMatrixScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const RolesMatrixScreen: React.FC<RolesMatrixScreenProps> = ({ onShowToast, onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<'cashier' | 'manager' | 'inventory' | 'owner'>('cashier');
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    'pos-scan': true,
    'pos-override': false,
    'pos-discount': true,
    'pos-void-item': true,
    'pos-void-all': false,
    'drawer-sale': true,
    'drawer-nosale': false,
    'drawer-float': true,
    'drawer-petty': false,
    'drawer-zreport': false,
    'return-receipt': true,
    'return-reversal': false,
    'return-credit': true,
    'stock-view': true,
    'stock-adjust': false,
    'report-revenue': false,
  });

  const togglePermission = (key: string) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onShowToast('Permissions matrix deployed to 4 floor lanes over TLS 1.3 socket!');
  };

  const handleReset = () => {
    onShowToast('Restored default role permissions for Cashier');
  };

  // Count active entitlements
  const totalEntitlements = Object.keys(permissions).length;
  const activeCount = Object.values(permissions).filter(Boolean).length;
  const percentage = Math.round((activeCount / totalEntitlements) * 100);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Header */}
      <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-bold text-sm text-[#0b1c30]">Roles & Permissions Matrix</h1>
            <p className="text-[11px] text-[#565e74]">Configure role capabilities across store modules</p>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Custom role builder opened')}
            className="h-8 px-2.5 bg-[#006948] hover:bg-[#00855d] text-white text-[11px] font-bold rounded-lg shadow-sm flex items-center gap-1 shrink-0"
          >
            <span>+ New Role</span>
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setSelectedRole('cashier')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              selectedRole === 'cashier' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#eff4ff] text-[#565e74]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4]" />
            <span>Cashier (Active)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('manager')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              selectedRole === 'manager' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#eff4ff] text-[#565e74]'
            }`}
          >
            Store Manager
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('inventory')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              selectedRole === 'inventory' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#eff4ff] text-[#565e74]'
            }`}
          >
            Inventory Staff
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('owner')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              selectedRole === 'owner' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#eff4ff] text-[#565e74]'
            }`}
          >
            Shop Owner / Admin
          </button>
        </div>
      </div>

      {/* Role Overview Bento Card */}
      <div className="p-3.5 bg-white rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#dae2fd] text-[#131b2e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#0b1c30]">Cashier</span>
                <span className="px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[9px] font-bold">
                  Active Profile
                </span>
              </div>
              <p className="text-[10px] text-[#565e74]">Frontline till checkout, scanning, and settlement</p>
            </div>
          </div>
          <Shield className="w-5 h-5 text-[#006948]" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-[#eff4ff] rounded-lg">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold block">Assigned Users</span>
            <span className="font-mono font-bold text-[#0b1c30] mt-0.5 block">6 Staff Members</span>
          </div>
          <div className="p-2 bg-[#eff4ff] rounded-lg">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold block">Security Tier</span>
            <span className="font-mono font-bold text-[#006948] mt-0.5 block">Tier 1 (Floor)</span>
          </div>
          <div className="p-2 bg-[#eff4ff] rounded-lg col-span-2 flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold block">Default Float Limit</span>
              <span className="font-mono text-base font-bold text-[#006948]">$300.00</span>
            </div>
            <span className="px-2 py-0.5 bg-white rounded font-mono text-[9px] font-bold text-[#565e74] shadow-2xs">
              Auto-Enforced
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-1">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-mono text-[10px] text-[#565e74]">
              Active Entitlements: {activeCount} of {totalEntitlements} Enabled
            </span>
            <span className="font-mono text-xs text-[#006948] font-bold">{percentage}%</span>
          </div>
          <div className="w-full bg-[#eff4ff] h-1.5 rounded-full overflow-hidden flex">
            <div className="bg-[#006948] h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>

      {/* Category 1: Point of Sale & Billing */}
      <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20 overflow-hidden">
        <div className="px-3.5 py-2 bg-[#dce9ff]/60 flex items-center justify-between border-b border-[#bccac0]/20">
          <div className="flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4 text-[#006948]" />
            <h2 className="font-bold text-xs text-[#0b1c30]">1. Point of Sale & Billing</h2>
          </div>
          <span className="font-mono text-[9px] bg-[#85f8c4]/40 text-[#005137] px-2 py-0.5 rounded font-bold">
            3 Allowed
          </span>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          {/* 1.1 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="font-semibold text-xs text-[#0b1c30] block">Process Orders & Scan Items</span>
              <p className="text-[10px] text-[#565e74]">Add items to cart, lookup PLU, apply line weight tags</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('pos-scan')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['pos-scan'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['pos-scan'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 1.2 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xs text-[#0b1c30]">Manual Price Override</span>
                <span className="px-1.5 py-0.2 bg-[#ffdcc3] text-[#6e3900] rounded text-[9px] font-mono font-bold">
                  Manager PIN
                </span>
              </div>
              <p className="text-[10px] text-[#565e74]">Edit standard catalog shelf price at line level</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('pos-override')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['pos-override'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['pos-override'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 1.3 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xs text-[#0b1c30]">Line Item & Basket Discounts</span>
                <span className="px-1.5 py-0.2 bg-[#85f8c4]/40 text-[#005137] rounded text-[9px] font-mono font-bold">
                  Max 10%
                </span>
              </div>
              <p className="text-[10px] text-[#565e74]">Apply immediate promotional percentage coupons</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('pos-discount')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['pos-discount'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['pos-discount'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 1.4 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="font-semibold text-xs text-[#0b1c30] block">Void Scanned Line Items</span>
              <p className="text-[10px] text-[#565e74]">Remove mis-scanned lines before final tender</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('pos-void-item')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['pos-void-item'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['pos-void-item'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 1.5 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xs text-[#0b1c30]">Void Entire Transaction</span>
                <span className="px-1.5 py-0.2 bg-[#ffdad6] text-[#93000a] rounded text-[9px] font-mono font-bold">
                  Approval
                </span>
              </div>
              <p className="text-[10px] text-[#565e74]">Cancel active session after items have been rung</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('pos-void-all')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['pos-void-all'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['pos-void-all'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Category 2: Cash Drawer & Shifts */}
      <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20 overflow-hidden">
        <div className="px-3.5 py-2 bg-[#dce9ff]/60 flex items-center justify-between border-b border-[#bccac0]/20">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-[#565e74]" />
            <h2 className="font-bold text-xs text-[#0b1c30]">2. Cash Drawer & Shifts</h2>
          </div>
          <span className="font-mono text-[9px] bg-[#dae2fd] text-[#131b2e] px-2 py-0.5 rounded font-bold">
            2 Allowed
          </span>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="font-semibold text-xs text-[#0b1c30] block">Open Cash Drawer for Sale</span>
              <p className="text-[10px] text-[#565e74]">Automatic solenoid kick upon tendering cash currency</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('drawer-sale')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['drawer-sale'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['drawer-sale'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="font-semibold text-xs text-[#0b1c30] block">Open & Close Shift Float</span>
              <p className="text-[10px] text-[#565e74]">Count opening denomination bills and set assigned till</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('drawer-float')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['drawer-float'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['drawer-float'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xs text-[#0b1c30]">Finalize Shift & Print Official Z-Report</span>
                <Lock className="w-3 h-3 text-[#565e74]" />
              </div>
              <p className="text-[10px] text-[#565e74]">Lock thermal register totals and commit ledger to cloud</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('drawer-zreport')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['drawer-zreport'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['drawer-zreport'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Category 3: Refunds & Returns */}
      <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20 overflow-hidden">
        <div className="px-3.5 py-2 bg-[#dce9ff]/60 flex items-center justify-between border-b border-[#bccac0]/20">
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-[#8d4b00]" />
            <h2 className="font-bold text-xs text-[#0b1c30]">3. Refunds & Returns</h2>
          </div>
          <span className="font-mono text-[9px] bg-[#ffdcc3] text-[#6e3900] px-2 py-0.5 rounded font-bold">
            2 Allowed
          </span>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xs text-[#0b1c30]">Process Return with Receipt</span>
                <span className="px-1.5 py-0.2 bg-[#eff4ff] text-[#565e74] rounded text-[9px] font-mono font-bold">
                  &lt; $15 Threshold
                </span>
              </div>
              <p className="text-[10px] text-[#565e74]">Verify barcode against digital 30-day ticket log</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('return-receipt')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['return-receipt'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['return-receipt'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="font-semibold text-xs text-[#0b1c30] block">Issue Store Credit Wallet</span>
              <p className="text-[10px] text-[#565e74]">Generate gift token or customer account balance slip</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('return-credit')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['return-credit'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['return-credit'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Category 4 & 5 Compact */}
      <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20 overflow-hidden">
        <div className="px-3.5 py-2 bg-[#dce9ff]/60 flex items-center justify-between border-b border-[#bccac0]/20">
          <div className="flex items-center gap-1.5">
            <Box className="w-4 h-4 text-[#006948]" />
            <h2 className="font-bold text-xs text-[#0b1c30]">4. Inventory & Reports</h2>
          </div>
          <span className="font-mono text-[9px] bg-[#eff4ff] text-[#565e74] px-2 py-0.5 rounded font-bold">
            Controlled
          </span>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="font-semibold text-xs text-[#0b1c30] block">View Stock Levels & Barcode PLU</span>
              <p className="text-[10px] text-[#565e74]">Real-time glance at shelf counts and backroom stock</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('stock-view')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['stock-view'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['stock-view'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xs text-[#0b1c30]">View Daily Store Revenue & Profit</span>
                <Lock className="w-3 h-3 text-[#ba1a1a]" />
              </div>
              <p className="text-[10px] text-[#565e74]">Store gross margins, hourly volumes, and payout ledgers</p>
            </div>
            <button
              type="button"
              onClick={() => togglePermission('report-revenue')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                permissions['report-revenue'] ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                permissions['report-revenue'] ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleSave}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Role Permissions</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full h-10 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#565e74] font-mono text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <ResetIcon className="w-3.5 h-3.5" />
          <span>Reset Role to Default Preset</span>
        </button>
      </div>
    </div>
  );
};
