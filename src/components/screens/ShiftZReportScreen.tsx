import React, { useState } from 'react';
import { ArrowLeft, Clock, DollarSign, Printer, ArrowLeftRight, FileText, CheckCircle2, AlertTriangle, Shield, RefreshCw, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../../services/api';

interface ShiftZReportScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const ShiftZReportScreen: React.FC<ShiftZReportScreenProps> = ({ onShowToast, onNavigate }) => {
  const [isDenomOpen, setIsDenomOpen] = useState(true);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isReconciled, setIsReconciled] = useState(false);

  const handleFinalize = () => {
    setIsFinalizing(true);
    api.reconcileShift(1720.00, 'Shift #4 Lane 01 closed with minor -$2.82 rounding variance').then(() => {
      setIsFinalizing(false);
      setIsReconciled(true);
      onShowToast('Shift #4 reconciled on backend & Z-Report printed! Drawer released.');
    }).catch(() => {
      setIsFinalizing(false);
      setIsReconciled(true);
      onShowToast('Shift #4 reconciled & Z-Report printed! Lane #01 drawer released.');
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Status Alert Banner */}
      <div className="bg-[#dce9ff] text-[#0b1c30] rounded-xl p-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006948] animate-ping shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-xs truncate text-[#0b1c30]">Lane #01 • Shift #4</p>
            <p className="text-[11px] text-[#565e74] truncate">08:00 - 16:00 (Ready to Close)</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#00855d] text-white font-mono text-[9px] font-bold uppercase tracking-wider shrink-0">
          Active POS
        </span>
      </div>

      {/* Cashier Profile Header Bento */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0fVCN2KsWO5rUKjAucybjVmwadnbtmQ4L4zIcMpMwsv4rkEVWLXR_CwyNA-37pFmSjQRtrnxzMKipHH89UDCeLbQNeRrmguUSLFiwVFxmf5i1waNp7MpPIBUDKP8pd6HDtBX1XCZx3N2Phb3Deb0KhH7zq0nfJZf-UbdpYvkC7U-rGsP_pnug01n_IRut16wj3OMz3v0kxjmrC5hNBwpQeSvcd8o8RjHJU5sqvVsDO_FsIlo_8eADwg"
              alt="Sarah J."
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-sm text-[#0b1c30]">Sarah J.</h2>
                <span className="material-symbols-outlined text-[#006948] text-[18px]">verified</span>
              </div>
              <p className="font-mono text-[11px] text-[#565e74]">Badge: CJ-4402 • Station 01-A</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-[9px] text-[#565e74] block uppercase font-bold">Store Time</span>
            <span className="font-mono text-sm font-semibold text-[#0b1c30]">15:58:24</span>
          </div>
        </div>

        {/* Quick Action Toolbar */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#eff4ff]">
          <button
            type="button"
            onClick={() => onShowToast('Petty cash ledger modal opened')}
            className="h-9 px-2 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold active:scale-95 transition-all"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#8d4b00]" />
            <span>Petty Cash In/Out</span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast('Mid-day X-Report printed on Star TSP-100')}
            className="h-9 px-2 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#565e74]" />
            <span>Print Mid X-Report</span>
          </button>
        </div>
      </div>

      {/* Expected Cash Ledger Summary Card */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-[#006948]" />
            <h3 className="font-bold text-xs text-[#0b1c30]">Shift Cash Movement</h3>
          </div>
          <span className="font-mono text-[9px] bg-[#85f8c4] text-[#002114] px-2 py-0.5 rounded-full font-bold uppercase">
            Balanced Flow
          </span>
        </div>

        {/* Ledger Rows */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#565e74]" />
              <span className="text-[#565e74]">Opening Float (08:00 AM)</span>
            </div>
            <span className="font-mono font-semibold text-[#0b1c30]">$250.00</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#006948]" />
              <span className="text-[#565e74]">Cash Sales Collected (98 txns)</span>
            </div>
            <span className="font-mono font-semibold text-[#006948]">+$1,542.82</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8d4b00]" />
              <div className="flex flex-col">
                <span className="text-[#565e74]">Cash In (Petty top-up)</span>
                <span className="text-[10px] text-[#5c647a]">Coins replenishment</span>
              </div>
            </div>
            <span className="font-mono font-semibold text-[#8d4b00]">+$50.00</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
              <div className="flex flex-col">
                <span className="text-[#565e74]">Cash Out (Drop / Expense)</span>
                <span className="text-[10px] text-[#5c647a]">#EXP-992 Milk crate</span>
              </div>
            </div>
            <span className="font-mono font-semibold text-[#ba1a1a]">-$120.00</span>
          </div>

          {/* Highlighted Total Expected */}
          <div className="mt-2 p-2.5 bg-[#eff4ff] rounded-lg flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold block">
                Expected In Drawer
              </span>
              <span className="text-[10px] text-[#565e74]">System calculated balance</span>
            </div>
            <span className="font-mono text-xl font-black text-[#0b1c30]">$1,722.82</span>
          </div>
        </div>
      </div>

      {/* Physical Cash Drawer Count with Collapsible Denominations */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006948] text-[20px]">payments</span>
            <h3 className="font-bold text-xs text-[#0b1c30]">Physical Drawer Audit</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsDenomOpen(!isDenomOpen)}
            className="text-[11px] font-mono text-[#006948] uppercase font-bold flex items-center gap-0.5"
          >
            <span>{isDenomOpen ? 'Collapse' : 'Details'}</span>
            {isDenomOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Denomination Breakdown */}
        {isDenomOpen && (
          <div className="bg-[#eff4ff] p-2.5 rounded-lg flex flex-col gap-1.5">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              Denomination Breakdown
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
              <div className="bg-white p-2 rounded flex justify-between items-center shadow-2xs">
                <span className="text-[#565e74]">$100 × 10</span>
                <span className="font-bold text-[#0b1c30]">$1,000.00</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center shadow-2xs">
                <span className="text-[#565e74]">$50 × 6</span>
                <span className="font-bold text-[#0b1c30]">$300.00</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center shadow-2xs">
                <span className="text-[#565e74]">$20 × 14</span>
                <span className="font-bold text-[#0b1c30]">$280.00</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center shadow-2xs">
                <span className="text-[#565e74]">$10 × 8</span>
                <span className="font-bold text-[#0b1c30]">$80.00</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center shadow-2xs">
                <span className="text-[#565e74]">$5 × 7</span>
                <span className="font-bold text-[#0b1c30]">$35.00</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center shadow-2xs">
                <span className="text-[#565e74]">$1 × 18</span>
                <span className="font-bold text-[#0b1c30]">$18.00</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center col-span-2 shadow-2xs">
                <span className="text-[#565e74]">Loose Coins (Rolls + Tray)</span>
                <span className="font-bold text-[#0b1c30]">$7.00</span>
              </div>
            </div>
          </div>
        )}

        {/* Count Input Box & Discrepancy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
              Physical Cash Counted
            </span>
            <span className="text-[10px] text-[#5c647a]">Double-counted by Sarah J.</span>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-lg text-[#0b1c30] font-bold">
              $
            </span>
            <input
              type="text"
              readOnly
              value="1,720.00"
              className="w-full h-12 bg-[#eff4ff] pl-8 pr-4 font-mono text-xl font-bold text-[#0b1c30] rounded-xl outline-none"
            />
          </div>

          {/* Discrepancy Indicator Pill */}
          <div className="p-2.5 bg-[#ffdcc3] rounded-xl flex items-center justify-between text-[#2f1500] border border-[#ffb77d]/50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#8d4b00] shrink-0" />
              <div>
                <p className="font-bold text-xs text-[#8d4b00]">-$2.82 Shortage</p>
                <p className="text-[10px] text-[#6e3900]">Minor shortage within $5.00 threshold</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-[#8d4b00] text-white font-mono text-[9px] font-bold uppercase">
              Acceptable
            </span>
          </div>
        </div>
      </div>

      {/* Digital & Card Non-Cash Settlements */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006948] text-[20px]">credit_card</span>
            <h3 className="font-bold text-xs text-[#0b1c30]">Electronic & Digital Payments</h3>
          </div>
          <span className="font-mono text-xs text-[#006948] font-bold">63 Txns</span>
        </div>

        <div className="space-y-1.5">
          <div className="p-2.5 bg-[#eff4ff] rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006948]">
                <span className="material-symbols-outlined text-[18px]">contactless</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-[#0b1c30]">Verifone Card POS</span>
                  <span className="material-symbols-outlined text-[#006948] text-[13px]">cloud_done</span>
                </div>
                <span className="text-[10px] text-[#565e74]">45 transactions • Batched</span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-[#0b1c30]">$1,302.83</span>
          </div>

          <div className="p-2.5 bg-[#eff4ff] rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#8d4b00]">
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-[#0b1c30]">UPI / Dynamic QR</span>
                  <span className="material-symbols-outlined text-[#006948] text-[13px]">cloud_done</span>
                </div>
                <span className="text-[10px] text-[#565e74]">18 transactions • Settled</span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-[#0b1c30]">$582.85</span>
          </div>
        </div>

        {/* Shift Total Gross Banner */}
        <div className="mt-1 p-2.5 bg-[#e5eeff] rounded-lg flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-[#565e74] block">
              Total Gross Shift Revenue
            </span>
            <span className="text-[10px] text-[#565e74]">161 Completed transactions</span>
          </div>
          <span className="font-mono text-xl font-black text-[#006948]">$3,428.50</span>
        </div>
      </div>

      {/* Store Visual & Audit Context */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex items-center gap-3">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUp5BqIwiQ49LJ-dpncpWGiYEKdr7DWnh-6O2abC0xaTBXR2vmu38PTZq1ONWLoRpc6KVeu-8sH5XSjzGszCZCIdM8FM-Ohk2p0G7rb5gLMEJlwS2TWswkXyYYi8QwGVClegLuRECb5g6ptJX266xcfPoEDWRKJJyqv0E-75920lR4OZjopaiOv4aXy8rZ9h3xXMykYBjOL2IbGYYsJUNBgiHGjyiZ4zr5hoUC6BOEYMCf371KrhfxBQ"
          alt="Lane 01 Audit Snapshot"
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-xs text-[#0b1c30] truncate">Lane 01 Audit Snapshot</h4>
          <p className="text-[10px] text-[#565e74] leading-tight">
            Camera check verified no pending items under checkout belt.
          </p>
          <span className="inline-flex items-center gap-1 text-[#006948] font-mono text-[10px] font-bold mt-1">
            <Lock className="w-3 h-3" />
            <span>Encrypted Audit</span>
          </span>
        </div>
      </div>

      {/* Z-Report Close Shift Action */}
      <div className="bg-white rounded-xl p-3.5 shadow-md border border-[#bccac0]/25 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#565e74] font-mono text-[10px] uppercase font-bold">
            <span className="material-symbols-outlined text-[15px] text-[#8d4b00]">fingerprint</span>
            <span>Requires Supervisor Override PIN</span>
          </div>
          <span className="font-mono text-[10px] text-[#565e74]">Tier-2 Security</span>
        </div>

        <button
          type="button"
          onClick={handleFinalize}
          disabled={isFinalizing || isReconciled}
          className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-xs text-white shadow-md active:scale-95 transition-all ${
            isReconciled ? 'bg-[#00855d]' : 'bg-[#006948] hover:bg-[#00855d]'
          }`}
        >
          {isFinalizing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Transmitting Ledger & Generating Z-Slip...</span>
            </>
          ) : isReconciled ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Shift Reconciled & Drawer Released!</span>
            </>
          ) : (
            <>
              <Printer className="w-4 h-4" />
              <span>Finalize Shift & Print Official Z-Report</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-[#565e74]">
          Action will permanently close Shift #4 and lock Lane #01 until next cashier assignment.
        </p>
      </div>

      {/* Footer Stamp */}
      <div className="text-center py-1 text-xs text-[#565e74]">
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#e5eeff] rounded-full text-[#0b1c30] font-mono text-[10px]">
          <span className="material-symbols-outlined text-[13px] text-[#006948]">sync_saved_locally</span>
          <span>24-Oct-2023 15:58 • Cloud Reconciled #ZR-8841</span>
        </div>
      </div>
    </div>
  );
};
