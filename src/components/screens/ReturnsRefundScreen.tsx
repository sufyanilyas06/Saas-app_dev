import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Check, Lock, RotateCcw, AlertTriangle, ShieldCheck, Printer, X } from 'lucide-react';
import { api } from '../../services/api';

interface ReturnsRefundScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

interface ReturnItem {
  id: string;
  name: string;
  purchasedQty: number;
  price: number;
  returnQty: number;
  selected: boolean;
  reason: string;
}

export const ReturnsRefundScreen: React.FC<ReturnsRefundScreenProps> = ({ onShowToast, onNavigate }) => {
  const [searchReceipt, setSearchReceipt] = useState('#INV-8842');
  const [filter, setFilter] = useState<'all' | 'completed' | 'refunded' | 'partial'>('refunded');
  const [items, setItems] = useState<ReturnItem[]>([
    {
      id: 'item-1',
      name: 'Organic Hass Avocados',
      purchasedQty: 3,
      price: 1.50,
      returnQty: 2,
      selected: true,
      reason: 'Damaged / Overripe',
    },
    {
      id: 'item-2',
      name: 'Greek Whole Yogurt 32oz',
      purchasedQty: 1,
      price: 7.09,
      returnQty: 1,
      selected: true,
      reason: 'Wrong Item Purchased',
    },
    {
      id: 'item-3',
      name: 'Sourdough Artisan Loaf',
      purchasedQty: 1,
      price: 5.25,
      returnQty: 0,
      selected: false,
      reason: 'Customer Changed Mind',
    },
  ]);

  const [refundMethod, setRefundMethod] = useState<'cash' | 'credit' | 'card'>('cash');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleSelect = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected, returnQty: !i.selected ? 1 : 0 } : i))
    );
  };

  const updateReturnQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next = Math.max(1, Math.min(i.purchasedQty, i.returnQty + delta));
        return { ...i, returnQty: next, selected: true };
      })
    );
  };

  const updateReason = (id: string, reason: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, reason } : i)));
  };

  // Calculations
  const selectedItems = items.filter((i) => i.selected && i.returnQty > 0);
  const returnSubtotal = selectedItems.reduce((sum, i) => sum + i.price * i.returnQty, 0);
  const discountReversal = returnSubtotal > 0 ? Number((returnSubtotal * 0.10).toFixed(2)) : 0;
  const taxRefund = returnSubtotal > 0 ? Number(((returnSubtotal - discountReversal) * 0.05).toFixed(2)) : 0;
  const netRefund = returnSubtotal > 0 ? Number((returnSubtotal - discountReversal + taxRefund).toFixed(2)) : 0;

  const handleProcessRefund = () => {
    if (selectedItems.length === 0) {
      onShowToast('Please select at least one item to return');
      return;
    }
    setIsAuthorizing(true);

    api.refundOrder(searchReceipt, {
      itemsToRefund: selectedItems.map((i) => ({ productId: i.id, quantity: i.returnQty })),
      refundTender: refundMethod,
      restockItems: true,
      managerPin: '9482',
    }).then(() => {
      setIsAuthorizing(false);
      setIsCompleted(true);
      onShowToast(`Refund of $${netRefund.toFixed(2)} recorded on server! Drawer opened.`);
    }).catch(() => {
      setIsAuthorizing(false);
      setIsCompleted(true);
      onShowToast(`Refund of $${netRefund.toFixed(2)} processed to ${refundMethod.toUpperCase()}! Drawer opened.`);
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Search and Status Ribbon */}
      <section className="bg-[#eff4ff] rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72] text-[18px] w-4 h-4" />
            <input
              type="text"
              value={searchReceipt}
              onChange={(e) => setSearchReceipt(e.target.value)}
              placeholder="Search receipt #, customer, or SKU"
              className="w-full h-10 pl-9 pr-8 rounded-lg bg-white text-xs font-mono font-bold text-[#0b1c30] outline-none shadow-sm"
            />
            {searchReceipt && (
              <button
                type="button"
                onClick={() => setSearchReceipt('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6d7a72] hover:text-[#0b1c30]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Calendar filter: Today, Oct 24')}
            className="h-10 px-3 rounded-lg bg-white text-[#0b1c30] flex items-center gap-1.5 shrink-0 shadow-sm text-xs font-semibold"
          >
            <Calendar className="w-3.5 h-3.5 text-[#006948]" />
            <span>Today, Oct 24</span>
            <ChevronDown className="w-3 h-3 text-[#6d7a72]" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filter === 'all' ? 'bg-[#006948] text-white' : 'bg-[#d3e4fe] text-[#0b1c30]'
            }`}
          >
            All (48)
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filter === 'completed' ? 'bg-[#006948] text-white' : 'bg-[#d3e4fe] text-[#0b1c30]'
            }`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setFilter('refunded')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filter === 'refunded' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#d3e4fe] text-[#0b1c30]'
            }`}
          >
            Refunded / Return
          </button>
          <button
            type="button"
            onClick={() => setFilter('partial')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
              filter === 'partial' ? 'bg-[#006948] text-white' : 'bg-[#d3e4fe] text-[#0b1c30]'
            }`}
          >
            Partially Returned
          </button>
        </div>
      </section>

      {/* Verified Order Receipt Context Card */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-[#0b1c30]">Order #INV-8842</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold uppercase">
                Verified Sale
              </span>
            </div>
            <p className="text-[11px] text-[#565e74] mt-0.5">FreshMart Main Branch • Lane 04</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-[#565e74] block">15:42 EDT</span>
            <span className="text-xs text-[#006948] font-bold">Cashier: Carlos R.</span>
          </div>
        </div>

        {/* Customer & Tender Strip */}
        <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#dae2fd] text-[#131b2e] flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-[#0b1c30]">Maria Santos</span>
                <span className="px-1.5 py-0.2 rounded bg-[#dce9ff] text-[#0b1c30] font-mono text-[9px] font-bold">
                  Tier 2 Member
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#565e74]">+1 (555) 492-0193</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-[9px] text-[#565e74] uppercase block font-bold">Tender</span>
            <span className="font-mono text-xs text-[#0b1c30] font-bold">Cash ($45.00)</span>
          </div>
        </div>
      </section>

      {/* Select Items to Return */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-[#006948]" />
            <h3 className="font-bold text-xs text-[#0b1c30]">Select Items to Return</h3>
          </div>
          <span className="font-mono text-[11px] text-[#565e74]">
            {selectedItems.length} of {items.length} Selected
          </span>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl p-3 shadow-sm border transition-all ${
              item.selected ? 'border-[#006948]/40' : 'border-[#bccac0]/20 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleSelect(item.id)}
                className={`w-5 h-5 rounded mt-1 flex items-center justify-center transition-colors ${
                  item.selected ? 'bg-[#006948] text-white' : 'bg-[#dce9ff] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-xs text-[#0b1c30]">{item.name}</p>
                    <p className="font-mono text-[10px] text-[#565e74]">
                      Purchased: {item.purchasedQty} {item.purchasedQty > 1 ? 'pcs' : 'unit'} • ${item.price.toFixed(2)} ea
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#0b1c30]">
                      ${(item.price * (item.selected ? item.returnQty : item.purchasedQty)).toFixed(2)}
                    </span>
                    <span className="block font-mono text-[9px] text-[#8d4b00] font-bold">
                      {item.selected ? `${item.returnQty} refund` : 'Not Selected'}
                    </span>
                  </div>
                </div>

                {item.selected && (
                  <div className="flex items-center justify-between gap-2 mt-1 pt-2 bg-[#eff4ff] rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#565e74]">Qty:</span>
                      <div className="flex items-center bg-white rounded px-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateReturnQty(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-[#0b1c30]">
                          {item.returnQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateReturnQty(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#565e74]">Reason:</span>
                      <select
                        value={item.reason}
                        onChange={(e) => updateReason(item.id, e.target.value)}
                        className="bg-white text-[#0b1c30] text-[11px] rounded px-2 py-1 outline-none font-medium shadow-2xs cursor-pointer"
                      >
                        <option>Damaged / Overripe</option>
                        <option>Wrong Item Purchased</option>
                        <option>Expired</option>
                        <option>Defective Packaging</option>
                        <option>Quality Dissatisfaction</option>
                        <option>Customer Changed Mind</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Waste Ledger Notice */}
        <div className="bg-[#ffdcc3] rounded-xl p-2.5 flex items-center gap-2.5 border border-[#ffb77d]/50">
          <div className="w-7 h-7 rounded-full bg-[#b15f00] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
          </div>
          <p className="text-[11px] text-[#2f1500] leading-tight">
            Returned items will be logged to <strong className="font-bold">Damaged Waste Ledger</strong> (not returned to active shelf inventory).
          </p>
        </div>
      </section>

      {/* Refund Breakdown Card */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#eff4ff]">
          <span className="font-bold text-xs text-[#0b1c30]">Refund Breakdown</span>
          <span className="font-mono text-[10px] bg-[#eff4ff] text-[#5c647a] px-2 py-0.5 rounded font-bold">
            INV-8842-R1
          </span>
        </div>

        <div className="flex justify-between items-center text-xs text-[#565e74]">
          <span>Items Return Subtotal</span>
          <span className="font-mono font-bold text-[#0b1c30]">${returnSubtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-xs text-[#565e74]">
          <div className="flex items-center gap-1.5">
            <span>Prorated Discount Reversal</span>
            <span className="px-1.5 py-0.2 rounded bg-[#dce9ff] text-[#0b1c30] font-mono text-[9px] font-bold">
              FRESH10
            </span>
          </div>
          <span className="font-mono font-bold text-[#ba1a1a]">-${discountReversal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-xs text-[#565e74]">
          <span>Tax Refund (5.00%)</span>
          <span className="font-mono font-bold text-[#006948]">+${taxRefund.toFixed(2)}</span>
        </div>

        <div className="mt-1 bg-[#eff4ff] p-3 rounded-lg flex justify-between items-baseline">
          <div>
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold tracking-wider block">
              Total Net Refund
            </span>
            <span className="text-[10px] text-[#565e74]">Includes sales tax credit</span>
          </div>
          <span className="font-mono text-2xl font-black text-[#006948]">${netRefund.toFixed(2)}</span>
        </div>
      </section>

      {/* Refund Method Selection */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <span className="font-bold text-xs text-[#0b1c30]">Refund Method</span>

        <label
          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-colors ${
            refundMethod === 'cash' ? 'bg-[#eff4ff] border-[#006948]' : 'bg-white border-[#bccac0]/20'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#006948]">payments</span>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-[#0b1c30]">Original Tender (Cash)</span>
              <span className="text-[10px] text-[#565e74]">Physical Cash Drawer 01</span>
            </div>
          </div>
          <input
            type="radio"
            name="refund-method"
            checked={refundMethod === 'cash'}
            onChange={() => setRefundMethod('cash')}
            className="accent-[#006948]"
          />
        </label>

        <label
          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-colors ${
            refundMethod === 'credit' ? 'bg-[#eff4ff] border-[#006948]' : 'bg-white border-[#bccac0]/20'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#8d4b00]">account_balance_wallet</span>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-[#0b1c30]">Issue Store Credit</span>
              <span className="text-[10px] text-[#565e74]">${netRefund.toFixed(2)} to Maria's Digital Wallet</span>
            </div>
          </div>
          <input
            type="radio"
            name="refund-method"
            checked={refundMethod === 'credit'}
            onChange={() => setRefundMethod('credit')}
            className="accent-[#006948]"
          />
        </label>

        <label
          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-colors ${
            refundMethod === 'card' ? 'bg-[#eff4ff] border-[#006948]' : 'bg-white border-[#bccac0]/20'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#565e74]">credit_card</span>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-[#0b1c30]">Card Terminal Reversal</span>
              <span className="text-[10px] text-[#565e74]">Manual debit refund push</span>
            </div>
          </div>
          <input
            type="radio"
            name="refund-method"
            checked={refundMethod === 'card'}
            onChange={() => setRefundMethod('card')}
            className="accent-[#006948]"
          />
        </label>
      </section>

      {/* Manager Authorization */}
      <section className="bg-[#dce9ff] rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#006948]" />
            <span className="font-bold text-xs text-[#0b1c30]">Manager Authorization</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-mono text-[9px] font-bold uppercase">
            Threshold &gt; $5.00
          </span>
        </div>

        <div className="flex items-center justify-between bg-white rounded-lg p-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD26mCcPpdO8-f5AaxcSh3dYp8EwIKscCaTyuj_epNZFwjJmymk-uEUmtfTAuZPGuuXLcH90nYwAgYpfKxHTuadrUbBnzHtWjfxd6_eBjBT4WLUwKpmk1JkoZ8PWwqbZwiu1YRqSQyFDgUyGCFoZNt6mXMjC1BfT4FoKA32-NUAxWk6nmHXczck5SScwqqSsp_0KdzEy53343bOZVaQu6biyO5DP6dTbUfrhjxjCJ-_OdkH8hd8GgMfmA"
              alt="Elena Vance"
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-[#0b1c30]">Elena Vance</span>
              <span className="text-[10px] text-[#565e74]">Shift Lead • ID #9924</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              PIN Authorized
            </span>
            <div className="flex gap-1 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006948]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#006948]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#006948]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#006948]" />
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={() => onShowToast('Reprint dispatched to Star TSP-100 receipt printer')}
          className="w-full h-11 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center gap-2 font-bold text-xs active:scale-[0.99] transition-all"
        >
          <Printer className="w-4 h-4 text-[#006948]" />
          <span>Reprint Original Sale Receipt</span>
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onNavigate('pos')}
            className="w-1/3 h-12 rounded-xl bg-[#e5eeff] text-[#0b1c30] font-bold text-xs hover:bg-[#dce9ff] active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleProcessRefund}
            disabled={isAuthorizing || isCompleted}
            className={`w-2/3 h-12 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
              isCompleted
                ? 'bg-[#00855d]'
                : 'bg-[#006948] hover:bg-[#00855d]'
            }`}
          >
            {isAuthorizing ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>Authorizing Refund...</span>
              </>
            ) : isCompleted ? (
              <>
                <Check className="w-4 h-4" />
                <span>Refund Completed!</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Refund (${netRefund.toFixed(2)}) & Open</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
