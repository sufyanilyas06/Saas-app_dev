import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Printer, 
  FileCheck, 
  Calendar, 
  Store, 
  ShieldAlert, 
  Unlock, 
  Ban, 
  TrendingUp, 
  ArrowLeft 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface CashierPerformanceScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CashierPerformanceScreen: React.FC<CashierPerformanceScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [selectedShift, setSelectedShift] = useState('closing');
  const [isArchiving, setIsArchiving] = useState(false);

  const handleArchiveShift = () => {
    setIsArchiving(true);
    setTimeout(() => {
      setIsArchiving(false);
      onShowToast('Shift #2 Finalized & Archived to Safe Ledger: Z-0482-1114');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 flex flex-col gap-3">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#006948] font-bold uppercase tracking-wider">
                Store #0482 · East Front Lanes
              </span>
              <h1 className="text-sm font-bold text-[#0b1c30]">Cashier & Till Performance</h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#006948] font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse"></span>
            5 Active Tills
          </span>
        </div>

        {/* Shift Filter Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm text-xs font-semibold text-[#0b1c30] border border-[#bccac0]/30">
            <Calendar className="w-3.5 h-3.5 text-[#006948]" />
            <span>Today · Nov 14</span>
          </button>
          <button
            onClick={() => setSelectedShift('closing')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedShift === 'closing' ? 'bg-[#006948] text-white' : 'bg-[#eff4ff] text-[#565e74]'
            }`}
          >
            Shift #2 (Closing)
          </button>
          <button
            onClick={() => setSelectedShift('morning')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedShift === 'morning' ? 'bg-[#006948] text-white' : 'bg-[#eff4ff] text-[#565e74]'
            }`}
          >
            Morning (Archived)
          </button>
        </div>

        {/* Floor Cash & Variance Bento Tile */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold block mb-0.5">
                Floor Cash & Till Reconciliation
              </span>
              <h2 className="text-base font-bold text-[#0b1c30]">Shift Variance Audit</h2>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006948] font-mono text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              TOLERANCE OK
            </span>
          </div>

          {/* Hero Delta Metric Card */}
          <div className="bg-[#eff4ff] rounded-lg p-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#565e74]">Net Float Discrepancy</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-[#006948] font-mono">-$4.25</span>
                <span className="font-mono text-[10px] text-[#565e74] font-bold">/ ±$5.00 limit</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3.5 rounded-full bg-[#006948]"></span>
                <span className="w-1.5 h-3.5 rounded-full bg-[#006948]"></span>
                <span className="w-1.5 h-3.5 rounded-full bg-[#006948]"></span>
                <span className="w-1.5 h-3.5 rounded-full bg-[#dce9ff]"></span>
                <span className="w-1.5 h-3.5 rounded-full bg-[#dce9ff]"></span>
              </div>
              <span className="font-mono text-[9px] text-[#565e74]">Variance: 0.11%</span>
            </div>
          </div>

          {/* Financial Metrics 3-Col Data Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col bg-[#eff4ff] rounded-lg p-2 text-center">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Total Float</span>
              <span className="font-mono text-xs font-bold text-[#0b1c30]">$1,200.00</span>
              <span className="text-[10px] text-[#565e74]">5 Drawers</span>
            </div>
            <div className="flex flex-col bg-[#eff4ff] rounded-lg p-2 text-center">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Tendered</span>
              <span className="font-mono text-xs font-bold text-[#0b1c30]">$3,574.15</span>
              <span className="text-[10px] text-[#565e74]">Recorded POS</span>
            </div>
            <div className="flex flex-col bg-[#eff4ff] rounded-lg p-2 text-center">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Counted</span>
              <span className="font-mono text-xs font-bold text-[#006948]">$3,569.90</span>
              <span className="text-[10px] text-[#565e74]">Drop Safe Total</span>
            </div>
          </div>
        </div>

        {/* Cashier Leaderboard Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#006948]" />
              <span className="text-xs font-bold text-[#0b1c30]">Staff Performance Ledger</span>
            </div>
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">4 CLERKS REPORTED</span>
          </div>

          {/* Cashier 1: Elena Vance */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF57-UX5LPoiL2ufY4Uyr-XL3Wv2rjQk5XIWKMZnHh8QmfhGClfuEXKmRzAVMpnst_wpqbyYUbW3xjY9TX1KyimqiVDkVKXyyRKOkOOxNt3W13fDJxsutTiMnjYE3GSPn2oiQ-P8jQUjoRb9Ci_UHgPtMIgJbgEGEL0IYfSIgV_Lbz9S2oTrczvc2AvtZQMdYke4eEU8FY83dabMNb9B2RiiVG8xhFwKLiS1sqNrurY0U7mYTp6rA81g"
                  alt="Elena Vance"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b1c30]">Elena Vance</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                      LEAD
                    </span>
                  </div>
                  <span className="text-[11px] text-[#565e74]">Till #01 Express · Active</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-[#006948]" />
                  $0.00 Bal
                </span>
                <span className="font-mono text-[9px] text-[#565e74] mt-0.5">0 Voids</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] rounded-lg p-2 text-xs">
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Tx Count</span>
                <span className="font-mono font-bold text-[#0b1c30]">184 orders</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Volume</span>
                <span className="font-mono font-bold text-[#0b1c30]">$4,120.00</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Velocity</span>
                <span className="font-mono font-bold text-[#006948]">18 itm/min</span>
              </div>
            </div>
          </div>

          {/* Cashier 2: Carlos Rodriguez */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwEsfW7NKbVTb5iaRc5pFGd5oBufD1rRLiK25-Eid48iGVKNbp8Ud1m2kJOD5LKA_ffkeTLo6VCtG8PSuuB7NwOLqnimIk9hdlfDTlpLOsyS_9cQtP7DZeC0rUNH_a7ny8NYEI1biv0kCeUupbqenKpl7Xyg4kyMnj_Zxyk17j0fKLj3PEjdoLqJdS7SBNyo0F8cYff8lYAV4AoiYBNrlsjNArJ7S_tThJaA7Fu-pZxEEaB4QASKfNMg"
                  alt="Carlos Rodriguez"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">Carlos Rodriguez</span>
                  <span className="text-[11px] text-[#565e74]">Till #02 Deli/Front</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-mono text-[10px] font-bold">
                  -$2.50 Short
                </span>
                <span className="font-mono text-[9px] text-[#565e74] mt-0.5">2 Line Voids</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] rounded-lg p-2 text-xs">
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Tx Count</span>
                <span className="font-mono font-bold text-[#0b1c30]">142 orders</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Volume</span>
                <span className="font-mono font-bold text-[#0b1c30]">$3,210.00</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Velocity</span>
                <span className="font-mono font-bold text-[#0b1c30]">15 itm/min</span>
              </div>
            </div>
          </div>

          {/* Cashier 3: Maya Sterling */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdgJ_HCq6cOKbWelnKfJq7KHW5qpaefFrweAiGsiEglC9GvWJMCJEN6sRpjAwjW7Ua_1gA4z0sXfrmwF5YtnJfyanflT_ahMWx5QvoIP7zRva9T3rTFN4ZJpwOsojgbgnbjhZq69th64KdNLdtT1uQ2LmWbQbgufx4GKx7oxT-daYDKZKm3QEkk7DeqXD17IXL94B5zup8Dz8fwH9ldoaQ0-BJ9pCi1CJlF8X5usJ5ur6oJ4uN2KpLRg"
                  alt="Maya Sterling"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">Maya Sterling</span>
                  <span className="text-[11px] text-[#565e74]">Till #03 Produce Counter</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[10px] font-bold">
                  +$1.25 Over
                </span>
                <span className="font-mono text-[9px] text-[#565e74] mt-0.5">1 Refund Line</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] rounded-lg p-2 text-xs">
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Tx Count</span>
                <span className="font-mono font-bold text-[#0b1c30]">98 orders</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Volume</span>
                <span className="font-mono font-bold text-[#0b1c30]">$2,450.00</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#565e74] block">Velocity</span>
                <span className="font-mono font-bold text-[#0b1c30]">14 itm/min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loss Prevention & Exceptions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#0b1c30]">Loss Prevention & Exceptions</span>
            <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] font-mono text-[9px] font-bold">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">Manager Overrides</span>
                  <span className="text-[11px] text-[#565e74]">3 price adjustments · 5 age checks</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs font-bold text-[#0b1c30]">8 Events</span>
                <span className="font-mono text-[9px] text-[#006948]">Audited 100%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <Ban className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">Voided Transactions</span>
                  <span className="text-[11px] text-[#565e74]">4 cart cancels across 2 shifts</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs font-bold text-[#ba1a1a]">-$52.40</span>
                <span className="font-mono text-[9px] text-[#565e74]">Loss Value</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffdcc3] flex items-center justify-center text-[#8d4b00]">
                  <Unlock className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">No-Sale Drawer Kicks</span>
                  <span className="text-[11px] text-[#565e74]">1 audit verified · 2 manual opens</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs font-bold text-[#8d4b00]">3 Kicks</span>
                <span className="font-mono text-[9px] text-[#ba1a1a]">Needs Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Actions Dock */}
        <div className="flex flex-col gap-2 pt-1 pb-4">
          <button
            onClick={() => onShowToast('ESC/POS Cashier Slips spooled to receipt printer')}
            className="h-11 w-full rounded-xl bg-white shadow-sm flex items-center justify-center gap-2 text-[#0b1c30] text-xs font-bold border border-[#bccac0]/30 active:bg-[#eff4ff] transition-colors"
          >
            <Printer className="w-4 h-4 text-[#565e74]" />
            <span>Print ESC/POS Cashier Slips</span>
          </button>
          <button
            onClick={handleArchiveShift}
            disabled={isArchiving}
            className="h-12 w-full rounded-xl bg-[#006948] hover:bg-[#00855d] text-white shadow-md flex items-center justify-center gap-2 text-xs font-bold active:opacity-95 transition-all"
          >
            <CheckCircle2 className="w-5 h-5 fill-white/20" />
            <span>{isArchiving ? 'Archiving to Ledger...' : 'Finalize Shift & Archive Ledger'}</span>
          </button>
          <p className="text-[11px] text-center text-[#565e74]">
            Z-Report #Z-0482-1114 locks all counted cash drawer totals.
          </p>
        </div>
      </div>
    </div>
  );
};
