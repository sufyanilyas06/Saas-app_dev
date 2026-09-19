import React, { useState } from 'react';
import { CartItem, Customer, TenderMode, CompletedOrder } from '../../types';
import { ArrowLeft, Printer, Share2, CheckCircle2, QrCode, CreditCard, Banknote, BookOpen, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface TenderPaymentScreenProps {
  cart: CartItem[];
  customer: Customer | null;
  onCompleteSale: (order: CompletedOrder) => void;
  onBackToPos: () => void;
  onShowToast: (msg: string) => void;
}

export const TenderPaymentScreen: React.FC<TenderPaymentScreenProps> = ({
  cart,
  customer,
  onCompleteSale,
  onBackToPos,
  onShowToast,
}) => {
  const [tenderMode, setTenderMode] = useState<TenderMode>('cash');
  const [tenderedAmount, setTenderedAmount] = useState<number>(30.0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Financial calculations
  const rawSubtotal = cart.length > 0 
    ? cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    : 28.50;

  const discountAmount = customer?.isVip ? 3.65 : 0;
  const taxableAmount = Math.max(0, rawSubtotal - discountAmount);
  const tax = taxableAmount * 0.05;
  const totalPayable = taxableAmount + tax;

  const changeDue = Math.max(0, tenderedAmount - totalPayable);

  // Fast cash options
  const fastKeyOptions = [
    { label: 'Exact', amount: totalPayable },
    { label: 'Fast Pay', amount: 30.0 },
    { label: 'Two 20s', amount: 40.0 },
    { label: 'Single Bill', amount: 50.0 },
  ];

  const handleSelectFastKey = (amount: number) => {
    setTenderedAmount(amount);
    const diff = Math.max(0, amount - totalPayable);
    onShowToast(`Cash tender set to $${amount.toFixed(2)}. Change: $${diff.toFixed(2)}`);
  };

  const handleFinishTransaction = () => {
    setIsProcessing(true);
    // Play physical drawer kick tone
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Ignored
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onShowToast('Sale finalized! Auto-kick signal sent to cash drawer #1.');

      const newOrder: CompletedOrder = {
        id: `ord-${Date.now()}`,
        invoiceNumber: '#INV-8842',
        date: 'Just now',
        cashier: 'Sarah J.',
        counter: 'Terminal 04',
        items: [...cart],
        subtotal: rawSubtotal,
        discountCode: customer?.isVip ? 'FRESH10' : '',
        discountAmount: discountAmount,
        tax: tax,
        total: totalPayable,
        tenderMode: tenderMode,
        tenderedAmount: tenderMode === 'cash' ? tenderedAmount : totalPayable,
        changeAmount: tenderMode === 'cash' ? changeDue : 0,
        customer: customer || undefined,
      };

      onCompleteSale(newOrder);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Active Customer & Status Ribbon */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#002114] shrink-0">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[#0b1c30] truncate">
                {customer ? customer.name : 'Maria Santos'}
              </span>
              <span className="bg-[#85f8c4] text-[#002114] font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                {customer ? customer.tier : 'Loyalty Tier 2'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#565e74]">
              {customer ? customer.phone : '+1 (555) 019-2831'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#dce9ff] px-2.5 py-1 rounded-full text-[#006948] shrink-0">
          <span className="material-symbols-outlined text-[14px]">bluetooth_connected</span>
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
            TSP-100 Ready
          </span>
        </div>
      </div>

      {/* Order Header Bar */}
      <div className="bg-[#e5eeff] rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30]">
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </div>
          <div>
            <h2 className="font-semibold text-xs text-[#0b1c30]">
              Order #INV-8842 • {cart.length > 0 ? cart.reduce((s, i) => s + i.quantity, 0) : 5} Items
            </h2>
            <p className="font-mono text-[11px] text-[#565e74]">
              Register 04 • Countertop Mobile
            </p>
          </div>
        </div>
        <span className="bg-[#00855d] text-[#f5fff7] px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold">
          Ready to Tender
        </span>
      </div>

      {/* Bill Calculation Card */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
          <span className="font-semibold text-xs text-[#0b1c30]">Bill Summary</span>
          <span className="font-mono text-[11px] text-[#565e74] uppercase font-bold">USD ($)</span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#565e74]">
          <span>Subtotal ({cart.length > 0 ? cart.reduce((s, i) => s + i.quantity, 0) : 5} items)</span>
          <span className="font-mono font-medium text-[#0b1c30]">${rawSubtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-xs text-[#006948] bg-[#85f8c4]/20 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">sell</span>
              <span className="font-medium text-[11px]">
                Discount applied: <strong className="font-mono font-bold">FRESH10</strong>
              </span>
            </div>
            <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-[#565e74]">
          <div className="flex items-center gap-1">
            <span>Tax / GST (5.0%)</span>
            <span className="material-symbols-outlined text-[13px] text-[#565e74]">info</span>
          </div>
          <span className="font-mono font-medium text-[#0b1c30]">${tax.toFixed(2)}</span>
        </div>

        <div className="mt-1 bg-[#eff4ff] p-3 rounded-xl flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold block">
              Grand Total
            </span>
            <span className="text-[11px] text-[#565e74]">Round-off applied</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-2xl font-black text-[#006948]">
              ${totalPayable.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Tender Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-semibold text-xs text-[#0b1c30]">Select Tender Mode</span>
          <span className="font-mono text-[10px] text-[#006948] uppercase font-bold">
            Quick Tap
          </span>
        </div>

        {/* 4 Tender Modes Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Cash Option */}
          <button
            type="button"
            onClick={() => setTenderMode('cash')}
            className={`flex flex-col p-3 rounded-xl text-left shadow-sm transition-all relative overflow-hidden border ${
              tenderMode === 'cash'
                ? 'bg-[#00855d] text-white border-transparent'
                : 'bg-white text-[#0b1c30] border-[#bccac0]/25 hover:bg-[#eff4ff]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <Banknote className="w-5 h-5" />
              {tenderMode === 'cash' && (
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              )}
            </div>
            <span className="font-semibold text-xs leading-snug">Cash Tender</span>
            <span className={`text-[11px] ${tenderMode === 'cash' ? 'opacity-90' : 'text-[#565e74]'}`}>
              Drawer #1 Linked
            </span>
          </button>

          {/* Card POS */}
          <button
            type="button"
            onClick={() => setTenderMode('card')}
            className={`flex flex-col p-3 rounded-xl text-left shadow-sm transition-all border ${
              tenderMode === 'card'
                ? 'bg-[#00855d] text-white border-transparent'
                : 'bg-white text-[#0b1c30] border-[#bccac0]/25 hover:bg-[#eff4ff]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <CreditCard className="w-5 h-5 text-secondary" />
              {tenderMode === 'card' && (
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              )}
            </div>
            <span className="font-semibold text-xs leading-snug">Card POS</span>
            <span className={`text-[11px] ${tenderMode === 'card' ? 'opacity-90' : 'text-[#565e74]'}`}>
              Verifone P400
            </span>
          </button>

          {/* Dynamic QR */}
          <button
            type="button"
            onClick={() => setTenderMode('qr')}
            className={`flex flex-col p-3 rounded-xl text-left shadow-sm transition-all border ${
              tenderMode === 'qr'
                ? 'bg-[#00855d] text-white border-transparent'
                : 'bg-white text-[#0b1c30] border-[#bccac0]/25 hover:bg-[#eff4ff]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <QrCode className="w-5 h-5 text-secondary" />
              {tenderMode === 'qr' && (
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              )}
            </div>
            <span className="font-semibold text-xs leading-snug">Dynamic QR</span>
            <span className={`text-[11px] ${tenderMode === 'qr' ? 'opacity-90' : 'text-[#565e74]'}`}>
              Instant UPI / Pay
            </span>
          </button>

          {/* Store Credit */}
          <button
            type="button"
            onClick={() => setTenderMode('khata')}
            className={`flex flex-col p-3 rounded-xl text-left shadow-sm transition-all border ${
              tenderMode === 'khata'
                ? 'bg-[#00855d] text-white border-transparent'
                : 'bg-white text-[#0b1c30] border-[#bccac0]/25 hover:bg-[#eff4ff]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <BookOpen className="w-5 h-5 text-secondary" />
              {tenderMode === 'khata' && (
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              )}
            </div>
            <span className="font-semibold text-xs leading-snug">Store Credit</span>
            <span className={`text-[11px] ${tenderMode === 'khata' ? 'opacity-90' : 'text-[#565e74]'}`}>
              Avail: $120.00
            </span>
          </button>
        </div>

        {/* Cash Tender Sub-Panel: Fast keys and Change Due */}
        {tenderMode === 'cash' && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
                Cash Received Fast-Keys
              </span>
              <span className="text-[11px] text-[#006948] font-medium">Tap to recalculate</span>
            </div>

            {/* Fast denomination pills */}
            <div className="grid grid-cols-4 gap-1.5">
              {fastKeyOptions.map((opt) => {
                const isSelected = Math.abs(tenderedAmount - opt.amount) < 0.01;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectFastKey(opt.amount)}
                    className={`py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#85f8c4] text-[#002114] shadow-sm font-bold'
                        : 'bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30]'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#565e74]">
                      {opt.label}
                    </span>
                    <span className="font-mono text-xs font-bold mt-0.5">
                      ${opt.amount.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Change Due Display */}
            <div className="bg-[#dce9ff]/60 rounded-lg p-2.5 flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold block">
                    Change to return
                  </span>
                  <span className="text-xs text-[#0b1c30]">
                    Given: ${tenderedAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-lg font-black text-[#8d4b00] block">
                  ${changeDue.toFixed(2)}
                </span>
                <span className="font-mono text-[9px] text-[#565e74] uppercase">
                  Dispense {Math.floor(changeDue)}x $1, 1x ${(changeDue % 1).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Card POS Standby */}
        {tenderMode === 'card' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/20 flex flex-col items-center justify-center text-center gap-1.5">
            <span className="material-symbols-outlined text-[36px] text-[#006948] animate-pulse">
              contactless
            </span>
            <span className="font-semibold text-xs text-[#0b1c30]">Ready on Verifone P400</span>
            <p className="text-[11px] text-[#565e74]">
              Customer to tap NFC Card or insert EMV Chip.
            </p>
            <span className="font-mono text-[10px] bg-[#eff4ff] px-2.5 py-0.5 rounded-full text-[#0b1c30] mt-1">
              Terminal ID: POS-T09-88
            </span>
          </div>
        )}

        {/* Dynamic QR */}
        {tenderMode === 'qr' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/20 flex flex-col items-center justify-center text-center gap-1.5">
            <div className="w-32 h-32 bg-[#eff4ff] rounded-lg p-2 flex items-center justify-center border border-black/5">
              <svg className="w-full h-full text-[#0b1c30]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M10 10h30v30h-30zM16 16v18h18v-18zM60 10h30v30h-30zM66 16v18h18v-18zM10 60h30v30h-30zM16 66v18h18v-18zM46 10h8v8h-8zM46 26h8v8h-8zM46 42h8v8h-8zM10 46h8v8h-8zM26 46h8v8h-8zM60 46h8v8h-8zM76 46h14v8h-14zM46 60h8v8h-8zM60 60h8v8h-8zM76 60h8v8h-8zM46 76h8v14h-8zM60 76h14v8h-14zM76 82h14v8h-14z" />
              </svg>
            </div>
            <span className="font-semibold text-xs text-[#0b1c30] mt-1">
              Scan to Pay ${totalPayable.toFixed(2)}
            </span>
            <span className="font-mono text-[10px] text-[#565e74]">
              UPI ID: freshmart.pos@icici
            </span>
          </div>
        )}

        {/* Store Credit */}
        {tenderMode === 'khata' && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#0b1c30]">Store Account Ledger</span>
              <span className="bg-[#85f8c4] text-[#002114] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Good Standing
              </span>
            </div>
            <div className="bg-[#eff4ff] p-2.5 rounded-lg flex justify-between items-center text-xs text-[#0b1c30]">
              <div>
                <div className="font-medium">{customer ? customer.name : 'Maria Santos'}</div>
                <div className="font-mono text-[10px] text-[#565e74]">Ledger #KS-8902</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-[#565e74] uppercase">New Balance</div>
                <div className="font-mono font-bold text-[#8d4b00]">
                  ${(totalPayable + 120.0).toFixed(2)} / $500
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thermal Receipt Preview Card */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#565e74]">receipt</span>
            <h3 className="font-semibold text-xs text-[#0b1c30]">Thermal Receipt Preview</h3>
          </div>
          <span className="font-mono text-[10px] text-[#565e74]">ESC/POS 80mm</span>
        </div>

        {/* Skeuomorphic Thermal Receipt Slip */}
        <div className="bg-[#eff4ff] rounded-lg p-3 text-[#0b1c30] flex flex-col gap-1.5 shadow-inner font-mono text-[11px] border border-black/5">
          {/* Header */}
          <div className="text-center flex flex-col items-center">
            <span className="font-bold text-xs uppercase tracking-tight">FreshMart Superstore</span>
            <span className="text-[10px] text-[#565e74]">Store #104 - Broadway Mall, NY</span>
            <span className="text-[10px] text-[#565e74]">Tel: +1 (800) 555-3737 • GSTIN: 27AABCF1209</span>
            <div className="w-full my-1 border-b border-dashed border-[#bccac0]" />
          </div>

          {/* Metadata */}
          <div className="flex justify-between text-[10px] text-[#565e74]">
            <span>Date: 24-Oct-2023 15:42</span>
            <span>Cashier: Sarah J.</span>
          </div>
          <div className="flex justify-between text-[10px] text-[#565e74]">
            <span>Invoice: #INV-8842</span>
            <span>Counter: Terminal 04</span>
          </div>
          <div className="w-full my-1 border-b border-dashed border-[#bccac0]" />

          {/* Itemized lines */}
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between font-bold text-[10px] text-[#565e74] uppercase">
              <span>Item • Qty</span>
              <span>Amt ($)</span>
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-medium truncate">{item.product.name}</span>
                    <span className="text-[9px] text-[#565e74]">
                      {item.quantity} unit @ ${item.product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="shrink-0 font-medium">
                    {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between">
                  <span>Organic Hass Avocados (3 pcs)</span>
                  <span>4.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Farm Fresh 2% Milk 1 Gal</span>
                  <span>3.89</span>
                </div>
                <div className="flex justify-between">
                  <span>Sourdough Artisan Loaf</span>
                  <span>5.25</span>
                </div>
                <div className="flex justify-between">
                  <span>Honeycrisp Apples (1.85 kg)</span>
                  <span>7.77</span>
                </div>
                <div className="flex justify-between">
                  <span>Greek Whole Yogurt 32oz</span>
                  <span>7.09</span>
                </div>
              </>
            )}
          </div>

          <div className="w-full my-1 border-b border-dashed border-[#bccac0]" />

          {/* Breakdown */}
          <div className="flex flex-col gap-0.5 text-[10px] text-[#565e74]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${rawSubtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#006948] font-bold">
                <span>Coupon Promo FRESH10:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Sales Tax (5.0%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#0b1c30] text-xs pt-1 border-t border-[#bccac0]/40">
              <span>Total Payable:</span>
              <span className="text-[#006948]">${totalPayable.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span>Tendered ({tenderMode.toUpperCase()}):</span>
              <span>${(tenderMode === 'cash' ? tenderedAmount : totalPayable).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#8d4b00]">
              <span>Change Dispensed:</span>
              <span>${(tenderMode === 'cash' ? changeDue : 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Barcode Graphic */}
          <div className="flex flex-col items-center justify-center pt-2 gap-1">
            <div className="h-8 flex items-center gap-[2px] overflow-hidden px-3 py-1 bg-white rounded border border-black/10">
              {[2, 1, 3, 1, 4, 2, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 4, 1, 2, 3, 1].map((w, idx) => (
                <span key={idx} style={{ width: `${w}px` }} className="h-6 bg-black" />
              ))}
            </div>
            <span className="text-[9px] tracking-widest text-[#565e74]">8842-9901-2831</span>
            <span className="text-[9px] text-[#565e74] text-center">
              Thank you for choosing FreshMart! Fresh, Local & Organic.
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Print & WhatsApp */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onShowToast('Bluetooth print queued to Star TSP-100')}
          className="h-11 bg-[#e5eeff] hover:bg-[#dce9ff] active:scale-95 text-[#0b1c30] rounded-xl flex items-center justify-center gap-1.5 px-3 shadow-sm font-semibold text-xs transition-transform"
        >
          <Printer className="w-4 h-4 text-[#006948]" />
          <span>Print Receipt</span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast('e-Receipt sent to Maria via WhatsApp (+1 555-019-2831)')}
          className="h-11 bg-[#e5eeff] hover:bg-[#dce9ff] active:scale-95 text-[#0b1c30] rounded-xl flex items-center justify-center gap-1.5 px-3 shadow-sm font-semibold text-xs transition-transform"
        >
          <Share2 className="w-4 h-4 text-[#006948]" />
          <span>WhatsApp/SMS</span>
        </button>
      </div>

      {/* Primary Complete & Open Drawer CTA */}
      <div className="pt-1 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleFinishTransaction}
          disabled={isProcessing || isCompleted}
          className={`h-14 rounded-xl flex items-center justify-between px-4 shadow-lg transition-all ${
            isCompleted
              ? 'bg-[#00855d] text-white cursor-default'
              : 'bg-[#006948] hover:bg-[#00855d] active:scale-[0.99] text-white cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              {isProcessing ? (
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
              ) : isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
              )}
            </div>
            <div className="text-left">
              <span className="font-bold text-xs block leading-tight">
                {isProcessing
                  ? 'Popping Cash Drawer & Syncing...'
                  : isCompleted
                  ? 'Transaction Approved • Drawer Open!'
                  : 'Complete & Open Drawer'}
              </span>
              <span className="text-[10px] opacity-90">
                {isCompleted ? 'Receipt dispatched' : 'Auto-kick cash drawer signal sent'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-base font-bold">
            <span>${totalPayable.toFixed(2)}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <div className="flex items-center justify-center gap-1 text-[#565e74] text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
          <span>Secured PCI-DSS Compliant Cashier Station</span>
        </div>
      </div>
    </div>
  );
};
