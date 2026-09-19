import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Barcode, 
  PlusCircle, 
  MinusCircle, 
  History, 
  Lock, 
  ShieldCheck, 
  DollarSign, 
  Recycle, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface StockAdjustmentsScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const StockAdjustmentsScreen: React.FC<StockAdjustmentsScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [stockMode, setStockMode] = useState<'increase' | 'decrease'>('decrease');
  const [qty, setQty] = useState<number>(8);
  const [baseStock] = useState<number>(48);
  const [unitCost] = useState<number>(1.50);
  const [reason, setReason] = useState('Damaged / Spoilage (Cold room failure)');
  const [notes, setNotes] = useState('Found crushed crates during morning intake inspection. Batch #LOT-2023-99.');
  const [isCompostLog, setIsCompostLog] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const newBalance = stockMode === 'decrease' ? Math.max(0, baseStock - qty) : baseStock + qty;
  const costTotal = (qty * unitCost).toFixed(2);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`Posted ${stockMode === 'decrease' ? '-' : '+'}${qty} pcs to Stock Ledger • Reason: ${reason}`);
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      {/* Branch Banner & Search Header */}
      <div className="px-3 pt-3 pb-2 bg-[#f8f9ff] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <Store className="w-4 h-4 text-[#006948] fill-[#006948]" />
            <span className="text-sm font-bold text-[#0b1c30] truncate">FreshMart Main Branch</span>
          </div>
          <span className="bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse"></span>
            POS-SYNC ACTIVE
          </span>
        </div>

        {/* Quick Search Bar */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-3 flex items-center pointer-events-none text-[#6d7a72]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            defaultValue="8849-0192 (Organic Hass Avocados)"
            className="w-full h-11 pl-9 pr-12 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] placeholder:text-[#6d7a72] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#006948] shadow-sm font-medium"
            placeholder="Scan barcode, enter SKU, or product..."
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            <button
              onClick={() => onShowToast('Laser Barcode Imager Ready')}
              className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006948] active:scale-95 transition-transform"
            >
              <Barcode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {['All Adjustments', 'Damaged', 'Expired', 'Lost / Theft', 'Manual Count'].map((filter, i) => (
            <button
              key={filter}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase transition-colors ${
                i === 0
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'bg-[#dce9ff] text-[#3d4a42] hover:bg-[#d3e4fe]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Operational Metric Summary Strip */}
      <div className="px-3 mb-3">
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-white rounded-xl shadow-sm border border-[#bccac0]/30">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#6d7a72] uppercase tracking-wider font-bold">Items Counted</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-mono text-base font-bold text-[#0b1c30]">142</span>
              <span className="font-mono text-[9px] text-[#006948]">SKUs</span>
            </div>
          </div>
          <div className="flex flex-col border-l border-[#bccac0]/20 pl-2">
            <span className="font-mono text-[9px] text-[#6d7a72] uppercase tracking-wider font-bold">Net Variance</span>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="font-mono text-base font-bold text-[#ba1a1a]">-$342.50</span>
            </div>
          </div>
          <div className="flex flex-col border-l border-[#bccac0]/20 pl-2">
            <span className="font-mono text-[9px] text-[#6d7a72] uppercase tracking-wider font-bold">Pending Audits</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-base font-bold text-[#8d4b00]">2</span>
              <span className="w-2 h-2 rounded-full bg-[#ffb77d]"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stock Item Adjustment Editor Card */}
      <div className="px-3 mb-4">
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3 relative overflow-hidden">
          {/* Top Selected Product Strip */}
          <div className="flex items-start gap-2.5">
            <div className="w-14 h-14 rounded-lg bg-[#e5eeff] overflow-hidden flex-shrink-0 relative shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8hymAxnhdlHVpuFWgZdVLd2LubN3tTWbUj6xprfle4AkHevw3EgOndIEbj9VDAqRDmcIsHJi4YqWm036y5teRJvRJrFjTUIWyGIm-0sR3kC1cgJ32Riaemc0l7YJv7YmwtSfFs1w1n8QDwZJ_DGRX8MDqSG9Pq7hf0SIW-au4tzMz3Dftf1igFV-Qwbww6hPSpt-0ylzaaGC0T5IX4eHUvQCh4_ue10oGFBb7NFIIGl6gDC3bk0UiiQ"
                alt="Organic Hass Avocados"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-[#006948] text-white font-mono text-[8px] px-1 py-0.2 rounded-tl">A-02</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0b1c30] truncate">Organic Hass Avocados</span>
                <span className="font-mono text-[9px] text-[#006948] bg-[#85f8c4]/40 px-1.5 py-0.5 rounded font-bold">RECON-ACTIVE</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-mono text-[11px] text-[#6d7a72]">SKU: 8849-0192</span>
                <span className="text-[#6d7a72] text-[10px]">•</span>
                <span className="text-[11px] text-[#565e74] truncate">Aisle 02 - Fresh Produce</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-[#565e74]">Current On-Hand:</span>
                <span className="font-mono text-[11px] text-[#0b1c30] font-semibold bg-[#dce9ff] px-1.5 py-0.5 rounded">48 pcs</span>
              </div>
            </div>
          </div>

          {/* Segmented Mode Selector: Stock Direction */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Adjustment Direction</label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#eff4ff] rounded-lg">
              <button
                type="button"
                onClick={() => setStockMode('increase')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  stockMode === 'increase'
                    ? 'bg-white shadow-sm font-bold text-[#006948]'
                    : 'text-[#565e74] hover:text-[#0b1c30]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                Increase Stock (+)
              </button>
              <button
                type="button"
                onClick={() => setStockMode('decrease')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all ${
                  stockMode === 'decrease'
                    ? 'bg-white shadow-sm font-bold text-[#ba1a1a]'
                    : 'text-[#565e74] hover:text-[#0b1c30]'
                }`}
              >
                <MinusCircle className="w-4 h-4" />
                Decrease Stock (-)
              </button>
            </div>
          </div>

          {/* Stepper & Resulting Calculation Box */}
          <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Adjustment Quantity</span>
              <div className="flex items-center gap-1 text-[#565e74] font-mono text-[11px]">
                <span>NEW BALANCE:</span>
                <span className="text-[#006948] font-bold bg-white px-1.5 py-0.5 rounded shadow-sm">
                  {newBalance} pcs
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 rounded-lg bg-white hover:bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center shadow-sm active:scale-90 transition-transform font-bold text-lg"
              >
                -
              </button>
              <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg py-1 shadow-inner">
                <div className="flex items-baseline gap-1">
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className={`w-16 text-center text-2xl font-black bg-transparent focus:outline-none ${
                      stockMode === 'decrease' ? 'text-[#ba1a1a]' : 'text-[#006948]'
                    }`}
                  />
                  <span className="text-sm font-semibold text-[#6d7a72]">pcs</span>
                </div>
                <span className="font-mono text-[9px] text-[#6d7a72] uppercase">CRATE UNITS</span>
              </div>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-lg bg-white hover:bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center shadow-sm active:scale-90 transition-transform font-bold text-lg"
              >
                +
              </button>
            </div>

            {/* Real-time Cost Impact Row */}
            <div className="flex items-center justify-between pt-1 text-xs border-t border-[#bccac0]/20">
              <span className="text-[#565e74] flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#6d7a72]" />
                Cost Impact (@ $1.50 unit cost)
              </span>
              <span className={`font-mono font-bold ${stockMode === 'decrease' ? 'text-[#ba1a1a]' : 'text-[#006948]'}`}>
                {stockMode === 'decrease' ? `-$${costTotal}` : `+$${costTotal}`}
              </span>
            </div>
          </div>

          {/* Reason Code Selector */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Reason Code</label>
            <div className="relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 pl-3 pr-9 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] appearance-none focus:outline-none focus:ring-1 focus:ring-[#006948] shadow-sm font-medium"
              >
                <option>Damaged / Spoilage (Cold room failure)</option>
                <option>Expired Date Reached</option>
                <option>Theft / Unaccounted Shrinkage</option>
                <option>Received Discrepancy (Supplier Short)</option>
                <option>Free Sample / Promotional Waste</option>
                <option>Manual Count Variance Audit</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#6d7a72] pointer-events-none" />
            </div>
          </div>

          {/* Notes Field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Audit Ledger Memo</label>
              <span className="font-mono text-[9px] text-[#6d7a72]">LOT INSPECTION</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] focus:outline-none focus:ring-1 focus:ring-[#006948] shadow-sm resize-none font-medium"
            />
          </div>

          {/* Waste Disposal Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-[#ffdcc3]/30 rounded-lg border border-[#ffdcc3]/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#ffdcc3] flex items-center justify-center text-[#2f1500]">
                <Recycle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0b1c30]">Produce Compost Log</span>
                <span className="text-[11px] text-[#565e74]">Mark as unsellable organic waste</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isCompostLog}
              onChange={(e) => setIsCompostLog(e.target.checked)}
              className="w-5 h-5 accent-[#8d4b00] rounded cursor-pointer"
            />
          </div>

          {/* Primary Action CTA Button */}
          <div className="pt-1">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Posting to Ledger...' : 'Confirm & Post Stock Adjustment'}</span>
            </button>
            <p className="text-center font-mono text-[10px] text-[#6d7a72] mt-1.5 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
              Supervisor PIN 4022 Verified for Floor Shift #4
            </p>
          </div>
        </div>
      </div>

      {/* Historical Stock Adjustments Ledger Section */}
      <div className="px-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <History className="w-4 h-4 text-[#6d7a72]" />
            <span className="text-sm font-bold text-[#0b1c30]">Recent Shift Adjustments</span>
          </div>
          <button
            onClick={() => onShowToast('Exporting shift ledger CSV')}
            className="font-mono text-[10px] text-[#006948] uppercase font-bold"
          >
            Export CSV
          </button>
        </div>

        {/* Ledger Items */}
        {[
          {
            name: 'Farm Fresh 2% Milk 1 Gal',
            delta: '-6 units',
            cost: '-$23.34',
            reason: 'Expired Date Recall',
            actor: 'Logged by Maya S. (Inventory)',
            time: '2 hrs ago',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvymYQ7srv1KGTSmmZ2zbDNajRENKfQVRa_kH2HovFDK2d7fwn_F0uX3gCVNGxYQup04HXDb_1HZtHmAlEnklOqykxcpoAOs2bgSgc6oF67F4W_u8PvzOS3jq9cw3SU1tgilZBqqyR-lDD_7vJuCAbu3pc4vWnw7wPcvBAdJxPg2oWUBuyeR1vxYOVkpcNomUXXErqir2SRSuVqiem2WTjUg5Mun6D5pzs0BfHKSgnlJteUFgPlNsK9A'
          },
          {
            name: 'Sourdough Artisan Loaf',
            delta: '-4 units',
            cost: '-$21.00',
            reason: 'Daily Stale Pull / Donation',
            actor: 'Logged by Leo T. (Bakery Lead)',
            time: '6 hrs ago',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkiuVzvN8_Wrv-jA5rKy0XsyH6XcPbapqrWXW5igcie-0kshxNDFIqsDCyYdv8EMUfv_u6QEugax5DyfWGyxrqwkYFmBtT0-5x9VrNp16AivTnXLYWTKt7m_ADhDrwCNF29WdDv5JOtYY7CxG7ykgVPky9Smkv5DGqkaOl8ZPrYQvkw7NwbGlE3Fe1DJivJhWUi8c6H9S_r1wLGSChESOsViwo8YjxXJtxumZk-mlfUTeee-zKJaAV7Q'
          },
          {
            name: 'Honeycrisp Apples',
            delta: '+12.5 kg',
            cost: '+$31.25',
            reason: 'Supplier Intake Recount Over',
            actor: 'Audit: Marcus V. (Intake)',
            time: 'Yesterday',
            isPositive: true,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAK-lyCJYTt8j3ppgRaIutce4mUmvaj7kbRObC1JBs7tWlUbTGeI5ciA7PWJXZ1HA02SRBiXCKscHvnRg4H4TFnLJxj0DK74ir-WmPPSdxFYtAs7SLujHZjj8t_qfVmm4JUsDWrwYZZPRZ6Z4aAWBuvOzld_yOdsxkT_9j7IOe6r8-B45w7wp-t_OOiaMJCYNKgI3fS92Qb4-b3e8Dhpg6T93EkRpEMN27vxBDG7nvOx1BRlV2PKalAw'
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex-shrink-0 overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b1c30] truncate">{item.name}</span>
                <span className={`font-mono text-xs font-bold ${item.isPositive ? 'text-[#006948]' : 'text-[#ba1a1a]'}`}>
                  {item.cost}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`font-mono text-[9px] px-1 rounded font-semibold ${
                  item.isPositive ? 'bg-[#85f8c4] text-[#002114]' : 'bg-[#ffdad6] text-[#93000a]'
                }`}>
                  {item.delta}
                </span>
                <span className="text-[11px] text-[#565e74] truncate">{item.reason}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[#6d7a72] font-mono text-[9px]">
                <span>{item.actor}</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
