import React, { useState } from 'react';
import { CompletedOrder, TenderMode } from '../../types';
import { Search, Printer, RotateCcw, CheckCircle2, ChevronRight, X, Calendar, Receipt } from 'lucide-react';

interface TransactionsHistoryScreenProps {
  orders: CompletedOrder[];
  onShowToast: (msg: string) => void;
  onNavigateToPos: () => void;
}

export const TransactionsHistoryScreen: React.FC<TransactionsHistoryScreenProps> = ({
  orders,
  onShowToast,
  onNavigateToPos,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTender, setSelectedTender] = useState<string>('all');
  const [activeOrderForReceipt, setActiveOrderForReceipt] = useState<CompletedOrder | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      searchQuery === '' ||
      o.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.cashier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customer && o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTender = selectedTender === 'all' || o.tenderMode === selectedTender;

    return matchesSearch && matchesTender;
  });

  const totalVolume = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Overview Metric Banner */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
            Settled Shift Journal
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-mono text-2xl font-black text-[#0b1c30]">
              ${totalVolume.toFixed(2)}
            </span>
            <span className="font-mono text-xs text-[#006948] font-bold">
              {orders.length} txns
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#006948]">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse" />
          <span>Batch Open #04</span>
        </div>
      </div>

      {/* Search & Tender Filter */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice number, cashier, customer..."
            className="w-full h-11 pl-9 pr-9 rounded-xl bg-white text-xs text-[#0b1c30] placeholder-[#6d7a72] focus:outline-none shadow-sm border border-[#bccac0]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6d7a72]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          {['all', 'cash', 'card', 'qr', 'khata'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSelectedTender(mode)}
              className={`px-3 h-8 rounded-full font-mono text-[10px] uppercase font-bold whitespace-nowrap shadow-2xs transition-all ${
                selectedTender === mode
                  ? 'bg-[#006948] text-white'
                  : 'bg-white text-[#0b1c30] border border-[#bccac0]/25 hover:bg-[#eff4ff]'
              }`}
            >
              {mode === 'all' ? 'All Tenders' : mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-2">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-[#565e74] flex flex-col items-center gap-2">
            <Receipt className="w-8 h-8 text-[#bccac0]" />
            <p className="text-xs">No transactions match your query.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setActiveOrderForReceipt(order)}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex items-center justify-between hover:bg-[#eff4ff]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006948] shrink-0 font-mono font-bold text-xs">
                  <Receipt className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#0b1c30] truncate">
                      {order.invoiceNumber}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#d3e4fe] font-mono text-[9px] text-[#0b1c30] uppercase font-bold">
                      {order.tenderMode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#565e74] truncate mt-0.5">
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>{order.cashier}</span>
                    {order.customer && (
                      <>
                        <span>•</span>
                        <span className="text-[#006948] font-medium truncate">
                          {order.customer.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 pl-2">
                <span className="font-mono text-sm font-black text-[#0b1c30] block">
                  ${order.total.toFixed(2)}
                </span>
                <span className="font-mono text-[10px] text-[#006948] font-bold">
                  {order.items.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Thermal Receipt Preview Modal */}
      {activeOrderForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#213145]/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#0b1c30]">
                Thermal Journal Details
              </span>
              <button
                type="button"
                onClick={() => setActiveOrderForReceipt(null)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Receipt Preview */}
            <div className="bg-[#eff4ff] rounded-xl p-3 font-mono text-[11px] text-[#0b1c30] border border-black/5 flex flex-col gap-1.5 shadow-inner">
              <div className="text-center">
                <span className="font-bold text-xs uppercase block">FreshMart Superstore</span>
                <span className="text-[10px] text-[#565e74]">
                  Terminal: {activeOrderForReceipt.counter} • Cashier: {activeOrderForReceipt.cashier}
                </span>
                <div className="w-full my-1 border-b border-dashed border-[#bccac0]" />
              </div>

              <div className="flex justify-between font-bold text-[10px] text-[#565e74] uppercase">
                <span>Invoice: {activeOrderForReceipt.invoiceNumber}</span>
                <span>{activeOrderForReceipt.date}</span>
              </div>

              <div className="flex flex-col gap-1 my-1">
                {activeOrderForReceipt.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between">
                    <span className="truncate pr-2">
                      {it.quantity}x {it.product.name}
                    </span>
                    <span>${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="w-full my-1 border-b border-dashed border-[#bccac0]" />

              <div className="flex justify-between font-bold text-xs">
                <span>Total Settled:</span>
                <span className="text-[#006948]">${activeOrderForReceipt.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-[#565e74]">
                <span>Tender: {activeOrderForReceipt.tenderMode.toUpperCase()}</span>
                <span>Change: ${activeOrderForReceipt.changeAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onShowToast(`Reprinting ${activeOrderForReceipt.invoiceNumber}...`);
                  setActiveOrderForReceipt(null);
                }}
                className="h-10 rounded-xl bg-[#006948] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Reprint Slip</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onShowToast(`Refund processing authorized for ${activeOrderForReceipt.invoiceNumber}`);
                  setActiveOrderForReceipt(null);
                }}
                className="h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Void / Refund</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
