import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  PlusCircle, 
  Truck, 
  Store, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Barcode, 
  ChevronRight, 
  ShieldCheck, 
  Calendar, 
  Check, 
  Save, 
  Printer, 
  FileSpreadsheet,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { ScreenType } from '../../types';

interface PurchaseOrdersScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const PurchaseOrdersScreen: React.FC<PurchaseOrdersScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'ordered' | 'partial' | 'received'>('ordered');
  const [searchTerm, setSearchTerm] = useState('');
  const [avocadoQty, setAvocadoQty] = useState(10);
  const [applesQty, setApplesQty] = useState(6);
  const [yogurtQty, setYogurtQty] = useState(5);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleQuickReceive = () => {
    setAvocadoQty(10);
    setApplesQty(8);
    setYogurtQty(5);
    onShowToast('Auto-Fill Triggered: All line items matched ordered manifest quantity');
  };

  const handleAcceptDelivery = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('PO-2023-0842 Reconciled: Stock ledger updated & Credit Memo #CR-882 queued ($140.00)');
    }, 800);
  };

  const handleTriggerScan = () => {
    onShowToast('Optical Scanner Engaged: Scanned EAN: 079357318820 • Batch Logged');
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      {/* Interactive Top Action & Search Bar */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 bg-[#eff4ff] rounded-xl px-3 py-2 text-[#565e74]">
          <Search className="w-4 h-4 text-[#6d7a72]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search PO#, Supplier, or SKU..."
            className="bg-transparent text-xs text-[#0b1c30] w-full focus:outline-none placeholder:text-[#6d7a72]/70 font-medium"
          />
          <button className="w-6 h-6 flex items-center justify-center text-[#565e74] hover:text-[#0b1c30]">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={() => onShowToast('Drafting New Purchase Order')}
          className="h-10 px-3.5 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-xs font-semibold whitespace-nowrap">New PO</span>
        </button>
      </div>

      {/* Horizontal Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto px-3 py-1.5 no-scrollbar">
        {[
          { id: 'all', label: 'All POs (14)' },
          { id: 'draft', label: 'Draft (2)' },
          { id: 'ordered', label: 'Ordered (3)', active: true },
          { id: 'partial', label: 'Partial (1)' },
          { id: 'received', label: 'Received (8)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-[#dae2fd] text-[#5c647a] shadow-sm'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Order Card */}
      <div className="px-3 mt-2">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#dae2fd]/30 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>
          
          {/* Top Badges & PO Reference */}
          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider text-[#565e74] uppercase font-bold">Purchase Order</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] font-mono text-[10px] font-bold">
                  Inbound Dock #3
                </span>
              </div>
              <span className="text-xl font-bold text-[#0b1c30] mt-0.5 tracking-tight font-sans">PO-2023-0842</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#dce9ff] text-[#0b1c30] px-2.5 py-1 rounded-full text-xs font-semibold">
              <Truck className="w-3.5 h-3.5 text-[#8d4b00]" />
              <span>Today, 2:30 PM</span>
            </div>
          </div>

          {/* Supplier Information Details */}
          <div className="bg-[#eff4ff] rounded-lg p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#006948]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0b1c30]">GreenValley Farm Co-op</span>
                  <span className="text-xs text-[#565e74]">John Miller (Supplier Rep)</span>
                </div>
              </div>
              <a
                href="tel:5550192834"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#006948] shadow-sm active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center justify-between pt-2 bg-white/70 rounded px-2.5 py-1.5 mt-0.5 text-[#565e74]">
              <div className="flex items-center gap-1">
                <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Payment Terms:</span>
                <span className="text-xs text-[#0b1c30] font-semibold">Net 30 Days</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Total PO Value:</span>
                <span className="font-mono text-xs text-[#006948] font-bold">$1,428.50</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Receiving & Intake Checklist Section */}
      <div className="px-3 mt-4 flex flex-col gap-3">
        {/* Checklist Header & Tools */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-5 h-5 text-[#006948]" />
            <h2 className="text-base font-bold text-[#0b1c30]">Item Intake Checklist</h2>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#565e74] font-bold ml-1">3 SKUs</span>
          </div>
          <button
            onClick={handleQuickReceive}
            className="text-[#006948] hover:text-[#00855d] font-mono text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg bg-[#85f8c4]/30 active:bg-[#85f8c4]/60 transition-colors"
          >
            Quick Receive All
          </button>
        </div>

        {/* Scanner Trigger Callout Card */}
        <button
          onClick={handleTriggerScan}
          className="w-full bg-[#dce9ff] hover:bg-[#d3e4fe] transition-colors rounded-xl p-3 flex items-center justify-between shadow-sm active:scale-[0.99] text-left border border-[#bccac0]/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#006948] text-white flex items-center justify-center">
              <Barcode className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0b1c30]">Live Barcode Check-In</span>
              <span className="text-xs text-[#565e74]">Tap to target crate labels & verify batches</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#006948] font-mono text-[10px] uppercase font-bold">
            <span>Scan</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Intake Items List */}
        <div className="flex flex-col gap-3">
          {/* Item 1: Complete Match with Quality Badge */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-lg object-cover bg-[#e5eeff] flex-shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQz1MdKgJb_ZSfq8l_OHmXR-1jIJm-9JOT1PyrWON91pvKItFIR9-JpPPOlmdtVWJJTdQTdrECGTmUpjQ6htwmXaxQ_ZoRa9jo5A8-V73ixlTXkTu5tauo6f61S3s0didFE-TsEb7zY1XnYnN0210TTfpRyGe7y834gjEOYI_gAwSv8ZRITyh9hDloZw83m-fMeeDCBuZXS_7rsDXABmdaWEFfpm0Gd0fP6VgOs64zH_UB6jXXGn-OSw"
                  alt="Organic Hass Avocados"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0b1c30] leading-snug">Organic Hass Avocados</span>
                  <span className="text-xs text-[#565e74]">Case of 24 • SKU: AVO-4046-ORG</span>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#006948] fill-[#85f8c4]/40" />
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-lg">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Ordered Expected</span>
                <span className="font-mono text-xs font-bold text-[#0b1c30]">10 Cases <span className="font-sans text-[11px] font-normal text-[#565e74]">(240 pcs)</span></span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Accepted Inbound</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={() => setAvocadoQty(Math.max(0, avocadoQty - 1))}
                    className="w-6 h-6 rounded bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] font-bold active:bg-[#bccac0]"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={avocadoQty}
                    onChange={(e) => setAvocadoQty(parseInt(e.target.value) || 0)}
                    className="w-9 h-6 text-center font-mono font-bold text-xs text-[#0b1c30] bg-white rounded border border-[#bccac0]/40 focus:outline-none"
                  />
                  <button
                    onClick={() => setAvocadoQty(avocadoQty + 1)}
                    className="w-6 h-6 rounded bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] font-bold active:bg-[#bccac0]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
                Passed Quality Check
              </div>
              <span className="font-mono text-[10px] text-[#006948] font-bold">Matched 100%</span>
            </div>
          </div>

          {/* Item 2: Discrepancy / Backordered Shortage */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-lg object-cover bg-[#e5eeff] flex-shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGYUBo2Wc5jFtQRzLZ8K194sxFv-OzIo0-j1WIjc2aeIrGUIksTSpg3H_AxGi9i_kO07LrkDZcwBPOmFuzxdxpuyCjrX0rRHdjJ-fZTNTBqJ9UCgdA4eopXuGz2AU7n9-RrMkpIgJGy74vMQ641Rl9AZBBa-3VEb4wZych3J94fU2R4hbHv534UoxMOsu1x_emH1jdkjbSUUqRM0uMAFbgQ5S1lthhJcjDKAivn0XUNWSNyVWOzXXv5A"
                  alt="Honeycrisp Apples"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0b1c30] leading-snug">Honeycrisp Apples Grade-A</span>
                  <span className="text-xs text-[#565e74]">Bulk 20kg Crate • SKU: APL-HC-20K</span>
                </div>
              </div>
              <AlertTriangle className="w-5 h-5 text-[#8d4b00]" />
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-lg">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Ordered Expected</span>
                <span className="font-mono text-xs font-bold text-[#0b1c30]">8 Crates <span className="font-sans text-[11px] font-normal text-[#565e74]">(160 kg)</span></span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] text-[#8d4b00] uppercase font-bold">Actual Received</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={() => setApplesQty(Math.max(0, applesQty - 1))}
                    className="w-6 h-6 rounded bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] font-bold active:bg-[#bccac0]"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={applesQty}
                    onChange={(e) => setApplesQty(parseInt(e.target.value) || 0)}
                    className="w-9 h-6 text-center font-mono font-bold text-xs text-[#8d4b00] bg-white rounded border border-[#bccac0]/40 focus:outline-none"
                  />
                  <button
                    onClick={() => setApplesQty(applesQty + 1)}
                    className="w-6 h-6 rounded bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] font-bold active:bg-[#bccac0]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Discrepancy Note Callout */}
            <div className="p-2.5 bg-[#ffdad6]/60 rounded-lg flex items-start gap-2 border border-[#ffdad6]">
              <AlertTriangle className="w-4 h-4 text-[#ba1a1a] flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#93000a] leading-tight">Shortage: 2 Crates Short (-40kg)</span>
                <span className="text-[11px] text-[#93000a]/80 leading-normal">
                  Driver bill of lading confirmed driver shortage. Credit memo #CR-882 automatically queued.
                </span>
              </div>
            </div>
          </div>

          {/* Item 3: Expiry & Batch Capture */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-lg object-cover bg-[#e5eeff] flex-shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB81PC8QBjkcXnJKpfbf1ew-UI7ez7tCP3EmSm8YphEtiOwbsI48jfBK3NsIeP0DOmzjm2pfrAx96ZAzt6WUApUx34DtMLVoxmBZ3U6HUuy2SVOyAvoFEqkfWAxFyuKK2H_MVBNdqgq7jol-jAeCHGSJBn6jNi68JuV18cKkoB4xBdshPwjVg3DVfT2XAZjRDxHMEwYMr66JC59eRIRxyeL91nIPnBVSF6NonQlDdPdtC7EDlRGdJHXLw"
                  alt="Greek Yogurt"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0b1c30] leading-snug">Greek Whole Yogurt 32oz</span>
                  <span className="text-xs text-[#565e74]">Carton of 12 • SKU: YGT-GRK-32</span>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#006948] fill-[#85f8c4]/40" />
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-lg">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Ordered Expected</span>
                <span className="font-mono text-xs font-bold text-[#0b1c30]">5 Cartons <span className="font-sans text-[11px] font-normal text-[#565e74]">(60 units)</span></span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Accepted Inbound</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={() => setYogurtQty(Math.max(0, yogurtQty - 1))}
                    className="w-6 h-6 rounded bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] font-bold active:bg-[#bccac0]"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={yogurtQty}
                    onChange={(e) => setYogurtQty(parseInt(e.target.value) || 0)}
                    className="w-9 h-6 text-center font-mono font-bold text-xs text-[#0b1c30] bg-white rounded border border-[#bccac0]/40 focus:outline-none"
                  />
                  <button
                    onClick={() => setYogurtQty(yogurtQty + 1)}
                    className="w-6 h-6 rounded bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] font-bold active:bg-[#bccac0]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Perishable Batch Info Chip */}
            <div className="flex items-center justify-between bg-[#e5eeff] p-2 rounded-lg text-[#565e74]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#565e74]" />
                <span className="font-mono text-xs font-semibold text-[#0b1c30]">Exp: 14 Nov 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[10px] uppercase">Lot/Batch:</span>
                <span className="font-mono text-[11px] font-bold bg-white px-1.5 py-0.5 rounded text-[#0b1c30]">#B904-A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intake Reconciliation Summary Card */}
      <div className="px-3 mt-4">
        <div className="bg-[#dce9ff] rounded-xl p-3.5 flex flex-col gap-2.5 border border-[#bccac0]/40">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#565e74] uppercase font-bold">
            <span>Delivery Reconciliation</span>
            <span className="text-[#ba1a1a]">Variance Detected</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold text-[#0b1c30]">21</span>
              <span className="text-xs text-[#565e74]">of 23 Pkgs Received</span>
            </div>
            <div className="flex items-baseline gap-1 text-[#ba1a1a]">
              <span className="font-mono text-[10px] font-bold">CREDIT</span>
              <span className="font-mono text-base font-bold">-$140.00</span>
            </div>
          </div>
          {/* Progress visual bar */}
          <div className="w-full bg-[#d3e4fe] h-2 rounded-full overflow-hidden flex">
            <div className="bg-[#006948] h-full" style={{ width: '91.3%' }}></div>
            <div className="bg-[#8d4b00] h-full" style={{ width: '8.7%' }}></div>
          </div>
        </div>
      </div>

      {/* Receiving Action Footer Dock */}
      <div className="px-3 mt-4 flex flex-col gap-2">
        <button
          onClick={handleAcceptDelivery}
          disabled={isSyncing}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all font-bold text-sm"
        >
          <CheckCircle2 className="w-5 h-5 fill-white/20" />
          <span>{isSyncing ? 'Synchronizing with Ledger...' : 'Accept Delivery & Update Inventory'}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Draft intake snapshot preserved locally')}
            className="flex-1 h-11 bg-white hover:bg-[#e5eeff] text-[#0b1c30] rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors border border-[#bccac0]/40"
          >
            <Save className="w-4 h-4 text-[#565e74]" />
            <span>Save Draft Intake</span>
          </button>
          <button
            onClick={() => onShowToast('Transmitting receipt to thermal printer...')}
            className="h-11 px-3 bg-white hover:bg-[#e5eeff] text-[#0b1c30] rounded-xl flex items-center justify-center transition-colors border border-[#bccac0]/40"
          >
            <Printer className="w-4 h-4 text-[#565e74]" />
          </button>
        </div>
      </div>
    </div>
  );
};
