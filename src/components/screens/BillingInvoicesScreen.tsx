import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Trash2, 
  ShieldCheck, 
  Plus, 
  BadgeCheck, 
  Download, 
  Receipt, 
  Mail, 
  Building2, 
  Hash, 
  Headphones 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface BillingInvoicesScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const BillingInvoicesScreen: React.FC<BillingInvoicesScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'failed'>('all');

  const invoices = [
    { id: 'INV-2024-10', date: 'Oct 28, 2024', plan: 'Growth Plan Renewal', amount: '$79.00', status: 'PAID' },
    { id: 'INV-2024-09', date: 'Sep 28, 2024', plan: 'Growth Plan Renewal', amount: '$79.00', status: 'PAID' },
    { id: 'INV-2024-08', date: 'Aug 28, 2024', plan: 'Plan + 1 Extra Register Add-on', amount: '$94.00', status: 'PAID' },
    { id: 'INV-2024-07', date: 'Jul 28, 2024', plan: 'Growth Plan Renewal', amount: '$79.00', status: 'PAID' },
  ];

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 space-y-3">
        {/* Header Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('subscription_overview')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg font-bold text-[#0b1c30] truncate">Billing & Invoices</h1>
            <p className="text-[11px] text-[#565e74] truncate">Manage cards, view transaction ledger & download tax receipts</p>
          </div>
        </div>

        {/* Primary Payment Method Card */}
        <div className="relative overflow-hidden rounded-xl bg-white p-3.5 shadow-sm border border-[#bccac0]/30 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-11 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948] font-bold text-xs italic tracking-tighter shadow-sm border border-[#bccac0]/30">
                VISA
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#0b1c30]">Visa •••• 4242</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold uppercase">
                    DEFAULT
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#565e74]">Expires 08/27</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onShowToast('Edit card modal')}
                className="px-2.5 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Cannot delete primary default payment method')}
                className="p-1.5 rounded-lg bg-[#eff4ff] text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#6d7a72] uppercase font-bold">Cardholder</span>
              <span className="text-xs text-[#0b1c30] font-medium truncate">Sarah Jenkins (FreshMart LLC)</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#006948]/10 flex items-center justify-center text-[#006948]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Backup Payment Method */}
        <div className="rounded-xl bg-white p-3.5 shadow-sm border border-[#bccac0]/30 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-11 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#8d4b00] shadow-sm border border-[#bccac0]/30">
                <CreditCard className="w-4 h-4 text-[#8d4b00]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] truncate">Mastercard •••• 9104</span>
                <span className="font-mono text-[11px] text-[#565e74]">Expires 11/26 • Backup Card</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('Mastercard set as primary payment method')}
              className="h-8 px-2.5 shrink-0 rounded-lg bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#85f8c4] transition-colors"
            >
              Set as Default
            </button>
          </div>
        </div>

        {/* Add New Payment Method Action Card */}
        <button
          type="button"
          onClick={() => onShowToast('Launching PCI-compliant card tokenization iframe')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors shadow-sm group border border-[#bccac0]/30"
        >
          <span className="w-6 h-6 rounded-full bg-[#00855d] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-[#006948]">Add Card or Bank Direct Debit</span>
        </button>

        {/* Billing Contact & Tax Invoice Information */}
        <div className="rounded-xl bg-white p-3.5 shadow-sm border border-[#bccac0]/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#006948]" />
              <h2 className="text-xs font-bold text-[#0b1c30]">Billing Information</h2>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('Editing legal entity details')}
              className="text-xs text-[#006948] font-bold hover:underline"
            >
              Edit Info
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1.5 pt-1">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff]">
              <span className="text-[11px] text-[#565e74]">Billing Email</span>
              <span className="font-mono text-xs text-[#0b1c30] font-medium">billing@freshmart.pos</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff]">
              <span className="text-[11px] text-[#565e74]">Legal Company</span>
              <span className="text-xs text-[#0b1c30] font-medium truncate">FreshMart Superstore LLC</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff]">
              <span className="text-[11px] text-[#565e74]">Tax ID / VAT</span>
              <span className="font-mono text-xs text-[#0b1c30] font-bold">US-98319402</span>
            </div>
          </div>
        </div>

        {/* Invoice & Payment History Ledger */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0b1c30]">Invoice Ledger</h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold ${
                  filter === 'all' ? 'bg-[#006948] text-white' : 'bg-[#dce9ff] text-[#565e74]'
                }`}
              >
                All (12)
              </button>
              <button
                type="button"
                onClick={() => setFilter('paid')}
                className={`px-2 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold ${
                  filter === 'paid' ? 'bg-[#006948] text-white' : 'bg-[#dce9ff] text-[#565e74]'
                }`}
              >
                Paid (11)
              </button>
            </div>
          </div>

          {invoices.map((inv) => (
            <div key={inv.id} className="rounded-xl bg-white p-3.5 shadow-sm border border-[#bccac0]/30 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#0b1c30]">#{inv.id}</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                      {inv.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#565e74]">{inv.plan} • {inv.date}</span>
                </div>
                <span className="font-mono text-sm text-[#0b1c30] font-bold">{inv.amount}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onShowToast(`Downloaded tax invoice PDF for ${inv.id}`)}
                  className="flex-1 h-8 flex items-center justify-center gap-1 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#565e74]" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast(`Displaying digital fiscal receipt for ${inv.id}`)}
                  className="flex-1 h-8 flex items-center justify-center gap-1 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
                >
                  <Receipt className="w-3.5 h-3.5 text-[#565e74]" />
                  <span>View Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Support Note Footer */}
        <div className="rounded-xl bg-[#dae2fd] p-3.5 flex items-start gap-2 border border-[#bccac0]/30">
          <Headphones className="w-5 h-5 text-[#131b2e] shrink-0 mt-0.5" />
          <p className="text-xs text-[#131b2e]">
            Need custom consolidated enterprise billing? Contact <a href="mailto:support@freshpos.io" className="font-bold underline">support@freshpos.io</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
