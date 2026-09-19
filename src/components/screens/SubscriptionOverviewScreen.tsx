import React from 'react';
import { 
  CreditCard, 
  ArrowRightLeft, 
  Store, 
  Users, 
  BarChart3, 
  CloudCheck, 
  BadgeCheck, 
  Receipt, 
  PlusCircle, 
  FileText 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface SubscriptionOverviewScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SubscriptionOverviewScreen: React.FC<SubscriptionOverviewScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 flex flex-col gap-3">
        {/* Title Header */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-[#0b1c30]">Subscription & Plan</h1>
            <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114]">
              Tier Pro
            </span>
          </div>
          <p className="text-xs text-[#565e74]">
            FreshMart Superstore (Merchant ID: <span className="font-mono text-[#0b1c30] font-bold">#MER-9821</span>)
          </p>
        </div>

        {/* Operating Tier Hero Card */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] uppercase font-bold text-[#565e74]">Current Operating Tier</span>
              <span className="text-base font-bold text-[#0b1c30]">Growth Store Plan</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#006948] font-mono">$79</span>
                <span className="text-xs text-[#565e74]">/ month • Billed Monthly</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-ping"></span>
              Active & Verified
            </span>
          </div>

          <div className="rounded-lg bg-[#eff4ff] p-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#e5eeff] flex items-center justify-center shrink-0 text-[#0b1c30]">
                <CreditCard className="w-4 h-4 text-[#006948]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#0b1c30] font-medium truncate">Renews Nov 28, 2024</span>
                <span className="font-mono text-[10px] text-[#565e74] truncate">Visa ending in •••• 4242</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('billing_invoices')}
              className="h-7 px-2.5 rounded-lg bg-white text-[#0b1c30] font-bold text-[11px] hover:bg-[#e5eeff] transition-colors shrink-0 shadow-sm border border-[#bccac0]/30"
            >
              Edit
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => onNavigate('billing_plans')}
              className="h-8 px-3 rounded-lg bg-[#dce9ff] text-[#0b1c30] font-bold text-xs hover:bg-[#cbdbf5] transition-colors flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Change Plan</span>
            </button>
            <button
              onClick={() => onShowToast('Contact support@freshpos.io to request plan cancellation')}
              className="text-xs text-[#ba1a1a] hover:underline underline-offset-4 py-1 px-1 font-medium"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Entitlements & Operational Limits */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#0b1c30] uppercase font-mono">Entitlements & Operational Limits</h2>
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Cycle resets in 14d</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* Registers Gauge */}
            <div className="rounded-xl bg-white shadow-sm p-3 border border-[#bccac0]/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#85f8c4]/50 flex items-center justify-center text-[#006948]">
                    <Store className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30]">Registers Connected</span>
                </div>
                <span className="font-mono text-[10px] text-[#8d4b00] px-2 py-0.5 rounded-full bg-[#ffdcc3] font-bold">
                  80% • Near Cap
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-[11px] text-[#565e74]">Live active POS terminals</span>
                <span className="font-mono text-xs text-[#0b1c30] font-bold">
                  <span className="text-[#006948]">4</span> / 5 max
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#dce9ff] overflow-hidden">
                <div className="h-full rounded-full bg-[#8d4b00]" style={{ width: '80%' }}></div>
              </div>
            </div>

            {/* Staff Seats Gauge */}
            <div className="rounded-xl bg-white shadow-sm p-3 border border-[#bccac0]/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#565e74]">
                    <Users className="w-4 h-4 text-[#006948]" />
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30]">Staff Member Accounts</span>
                </div>
                <span className="font-mono text-[10px] text-[#565e74] px-2 py-0.5 rounded-full bg-[#eff4ff] font-bold">
                  53% capacity
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-[11px] text-[#565e74]">Floor clerks, managers & stockers</span>
                <span className="font-mono text-xs text-[#0b1c30] font-bold">8 / 15 seats</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#dce9ff] overflow-hidden">
                <div className="h-full rounded-full bg-[#006948]" style={{ width: '53%' }}></div>
              </div>
            </div>

            {/* Monthly Sales Volume */}
            <div className="rounded-xl bg-white shadow-sm p-3 border border-[#bccac0]/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#565e74]">
                    <BarChart3 className="w-4 h-4 text-[#006948]" />
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30]">Monthly Sales Volume</span>
                </div>
                <span className="font-mono text-[10px] text-[#565e74] px-2 py-0.5 rounded-full bg-[#eff4ff] font-bold">
                  42% utilized
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-[11px] text-[#565e74]">0% FreshPOS transaction surcharge</span>
                <span className="font-mono text-xs text-[#0b1c30] font-bold">$42,850 / $100k</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#dce9ff] overflow-hidden">
                <div className="h-full rounded-full bg-[#00855d]" style={{ width: '42.85%' }}></div>
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white shadow-sm p-3 border border-[#bccac0]/30 flex flex-col justify-between">
                <span className="text-[11px] text-[#565e74] font-medium">Multi-Store</span>
                <div className="mt-1">
                  <div className="text-base font-bold text-[#0b1c30]">2 / 3</div>
                  <span className="text-[10px] text-[#565e74]">Outlets active</span>
                </div>
              </div>
              <div className="rounded-xl bg-white shadow-sm p-3 border border-[#bccac0]/30 flex flex-col justify-between">
                <span className="text-[11px] text-[#565e74] font-medium">AI Forecasting</span>
                <div className="mt-1">
                  <div className="inline-flex items-center gap-1 text-[#006948] text-xs font-bold">
                    <CloudCheck className="w-3.5 h-3.5" />
                    Synced
                  </div>
                  <span className="block text-[10px] text-[#565e74]">Continuous backup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Health Notice */}
        <div className="rounded-xl bg-[#eff4ff] p-3.5 flex flex-col gap-2 shadow-sm border border-[#bccac0]/30">
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-[#85f8c4] text-[#006948] flex items-center justify-center shrink-0 mt-0.5">
              <BadgeCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Billing Health Confirmed</span>
              <p className="text-[11px] text-[#565e74]">
                All payments up to date. Next automatic deduction of <span className="font-mono text-[#0b1c30] font-bold">$79.00</span> scheduled for Nov 28, 2024.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 bg-white/70 rounded-lg p-2">
            <div className="flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-[#565e74]" />
              <span className="text-[11px] text-[#0b1c30] font-medium">Tax Identifier</span>
            </div>
            <span className="font-mono text-xs text-[#0b1c30] bg-[#e5eeff] px-2 py-0.5 rounded font-bold">
              US-98319402
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1 pb-4">
          <button
            onClick={() => onNavigate('billing_plans')}
            className="w-full h-12 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs shadow-sm active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upgrade Plan & Add Add-ons</span>
          </button>
          <button
            onClick={() => onNavigate('billing_invoices')}
            className="w-full h-11 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#bccac0]/30"
          >
            <FileText className="w-4 h-4 text-[#565e74]" />
            <span>Manage Payment Methods & Invoices</span>
          </button>
        </div>
      </div>
    </div>
  );
};
