import React, { useState } from 'react';
import { Store, MapPin, Clock, DollarSign, Receipt, Check, ArrowRight, ArrowLeft, Image, Phone, Smile } from 'lucide-react';

interface StoreSetupScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const StoreSetupScreen: React.FC<StoreSetupScreenProps> = ({ onShowToast, onNavigate }) => {
  const [storeName, setStoreName] = useState('Downtown Organic Market #01');
  const [address, setAddress] = useState('442 Market St, Suite A, Seattle, WA 98101');
  const [timezone, setTimezone] = useState('Pacific Time (US & Canada) UTC-08:00');
  const [currency, setCurrency] = useState('USD ($) - United States Dollar');
  const [taxEngine, setTaxEngine] = useState('Single State Sales Tax (7.5%)');
  const [taxExemptProduce, setTaxExemptProduce] = useState(true);
  const [logoOnReceipt, setLogoOnReceipt] = useState(true);
  const [receiptHeader, setReceiptHeader] = useState('DOWNTOWN ORGANIC MARKET');
  const [receiptPhone, setReceiptPhone] = useState('+1 (206) 555-0199');
  const [receiptFooter, setReceiptFooter] = useState('Thank you for shopping local fresh!');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('Store profile & tax engine saved! Moving to Step 3 (Hardware)...');
      onNavigate('hardware_pairing');
    }, 900);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Onboarding Stepper Header */}
      <div className="bg-[#eff4ff] p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-mono text-[9px] text-[#006948] uppercase font-bold">Onboarding</span>
            <span className="text-[#bccac0] text-[10px]">•</span>
            <span className="font-bold text-xs text-[#0b1c30] truncate">Step 2 of 5: Store & Fiscal Setup</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-2 py-1 rounded bg-[#e5eeff] hover:bg-[#dce9ff] text-[#565e74] text-[10px] font-bold transition-colors shrink-0"
          >
            Save & Exit
          </button>
        </div>

        {/* 5-Step Bar */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full rounded-full bg-[#006948]" />
            <span className="font-mono text-[9px] text-[#006948] font-bold truncate">1. Account</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full rounded-full bg-[#006948]" />
            <span className="font-mono text-[9px] text-[#006948] font-bold truncate">2. Store</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full rounded-full bg-[#bccac0]/40" />
            <span className="font-mono text-[9px] text-[#6d7a72] truncate">3. Registers</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full rounded-full bg-[#bccac0]/40" />
            <span className="font-mono text-[9px] text-[#6d7a72] truncate">4. Products</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full rounded-full bg-[#bccac0]/40" />
            <span className="font-mono text-[9px] text-[#6d7a72] truncate">5. Complete</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#85f8c4]/20 shadow-sm border border-[#85f8c4]/40">
        <div className="w-10 h-10 rounded-lg bg-[#006948] flex items-center justify-center text-white shrink-0">
          <Store className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-xs text-[#0b1c30] truncate">Branch Profile & Sales Tax</span>
          <span className="text-[11px] text-[#565e74]">Calibrate your physical terminal presence and thermal printer receipts.</span>
        </div>
      </div>

      {/* Section 1: Store Identification */}
      <section className="bg-white p-3.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-1 border-b border-[#eff4ff]">
          <span className="material-symbols-outlined text-[#006948] text-[20px]">badge</span>
          <h2 className="font-bold text-xs text-[#0b1c30]">Store Identification & Operating Details</h2>
        </div>

        {/* Store Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Store / Branch Name</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-[#565e74]" />
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] text-xs font-semibold outline-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Physical Store Address</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#006948]" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] text-xs font-semibold outline-none"
            />
            <button
              type="button"
              onClick={() => onShowToast('Map Pin calibrated to Seattle Central Market')}
              className="text-[#006948] text-[10px] font-mono font-bold uppercase hover:underline shrink-0"
            >
              Map Pin
            </button>
          </div>
        </div>

        {/* GPS Badge */}
        <div className="relative w-full h-24 rounded-lg overflow-hidden bg-[#e5eeff] flex items-center justify-center border border-[#bccac0]/20">
          <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80)' }} />
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-lg flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#006948]" />
            <span className="font-mono text-[10px] text-[#0b1c30] font-bold">47.6062° N, 122.3321° W</span>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Operating Timezone & Hours</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#565e74]" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] text-xs font-semibold outline-none cursor-pointer"
            >
              <option>Pacific Time (US & Canada) UTC-08:00</option>
              <option>Eastern Time (US & Canada) UTC-05:00</option>
              <option>Central Time (US & Canada) UTC-06:00</option>
              <option>Mountain Time (US & Canada) UTC-07:00</option>
            </select>
          </div>
        </div>

        {/* Store Hours Card */}
        <div className="flex items-center justify-between p-2.5 bg-[#eff4ff] rounded-lg">
          <div className="flex flex-col">
            <span className="font-bold text-xs text-[#0b1c30]">Store Hours</span>
            <span className="text-[10px] text-[#565e74]">Mon – Sun: 07:00 AM – 10:00 PM</span>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Hours schedule dialog opened')}
            className="px-2 py-1 rounded bg-[#e5eeff] text-[#006948] font-mono text-[10px] font-bold uppercase hover:bg-[#dce9ff]"
          >
            Adjust
          </button>
        </div>
      </section>

      {/* Section 2: Fiscal & Sales Tax */}
      <section className="bg-white p-3.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-1 border-b border-[#eff4ff]">
          <DollarSign className="w-4 h-4 text-[#006948]" />
          <h2 className="font-bold text-xs text-[#0b1c30]">Currency & Regional Compliance</h2>
        </div>

        {/* Currency Select */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Primary Currency</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#565e74]" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] text-xs font-semibold outline-none cursor-pointer"
            >
              <option>USD ($) - United States Dollar</option>
              <option>CAD ($) - Canadian Dollar</option>
              <option>EUR (€) - Euro</option>
              <option>GBP (£) - British Pound</option>
            </select>
          </div>
        </div>

        {/* Tax Engine */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Sales Tax Calculation Engine</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#565e74]" />
            <select
              value={taxEngine}
              onChange={(e) => setTaxEngine(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] text-xs font-semibold outline-none cursor-pointer"
            >
              <option>Single State Sales Tax (7.5%)</option>
              <option>Combined County + Municipal Standard (8.25%)</option>
              <option>Automated Geo-lookup (TaxCloud Integration)</option>
            </select>
          </div>
        </div>

        {/* Tax-exempt Produce Toggle */}
        <div className="flex items-center justify-between p-2.5 bg-[#eff4ff] rounded-lg">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <span className="material-symbols-outlined text-[#006948] text-[20px] shrink-0">local_florist</span>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30]">Tax-exempt grocery staples</span>
              <span className="text-[10px] text-[#565e74] truncate">Zero-tax on fresh milk, raw produce & grains</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTaxExemptProduce(!taxExemptProduce)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
              taxExemptProduce ? 'bg-[#006948]' : 'bg-[#bccac0]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                taxExemptProduce ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Section 3: Receipt Customization & Live Thermal Tape */}
      <section className="bg-white p-3.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#006948]" />
            <h2 className="font-bold text-xs text-[#0b1c30]">Receipt & Invoice Customization</h2>
          </div>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] font-bold uppercase">
            ESC/POS Ready
          </span>
        </div>

        {/* Logo Toggle */}
        <div className="flex items-center justify-between p-2.5 bg-[#eff4ff] rounded-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006948]">
              <Image className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-[#0b1c30]">Thermal Receipt Logo</span>
              <span className="text-[10px] text-[#565e74]">Monochrome 1-bit raster preview</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLogoOnReceipt(!logoOnReceipt)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
              logoOnReceipt ? 'bg-[#006948]' : 'bg-[#bccac0]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                logoOnReceipt ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Header Tape */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Header Name on Thermal Tape</label>
          <input
            type="text"
            value={receiptHeader}
            onChange={(e) => setReceiptHeader(e.target.value)}
            className="h-10 bg-[#eff4ff] rounded-lg px-3 font-mono text-xs font-bold text-[#0b1c30] outline-none"
          />
        </div>

        {/* Support Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Customer Support Phone</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#565e74]" />
            <input
              type="text"
              value={receiptPhone}
              onChange={(e) => setReceiptPhone(e.target.value)}
              className="w-full bg-transparent font-mono text-xs font-bold text-[#0b1c30] outline-none"
            />
          </div>
        </div>

        {/* Custom Footer */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#565e74] font-medium">Custom Footer Greeting</label>
          <div className="h-10 bg-[#eff4ff] rounded-lg px-3 flex items-center gap-2">
            <Smile className="w-4 h-4 text-[#565e74]" />
            <input
              type="text"
              value={receiptFooter}
              onChange={(e) => setReceiptFooter(e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-[#0b1c30] outline-none"
            />
          </div>
        </div>

        {/* Live Thermal Receipt Preview Box */}
        <div className="p-3 bg-[#eff4ff] rounded-xl flex flex-col items-center justify-center font-mono text-[11px] text-[#565e74] gap-1 text-center border border-[#bccac0]/20">
          <span className="font-bold text-xs text-[#0b1c30] tracking-wider uppercase">
            *** {receiptHeader} ***
          </span>
          <span>442 MARKET ST, SEATTLE WA</span>
          <span>TEL: {receiptPhone}</span>
          <div className="w-full border-t border-dashed border-[#bccac0] my-1" />
          <div className="w-full flex justify-between text-[11px] font-bold text-[#0b1c30]">
            <span>SUBTOTAL: $14.20</span>
            <span>TAX (7.5%): $1.06</span>
          </div>
          <div className="w-full border-t border-dashed border-[#bccac0] my-1" />
          <span className="text-[#006948] font-bold italic">"{receiptFooter}"</span>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-1/3 h-12 rounded-xl bg-[#e5eeff] text-[#0b1c30] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#dce9ff]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full sm:w-2/3 h-12 rounded-xl bg-[#006948] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#00855d] active:scale-95 transition-all"
        >
          {isSaving ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>Saving Configuration...</span>
            </>
          ) : (
            <>
              <span>Save & Continue to Registers</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
