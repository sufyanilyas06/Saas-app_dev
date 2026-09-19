import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  Receipt, 
  DollarSign, 
  Zap, 
  MailCheck, 
  Lock, 
  FileSpreadsheet, 
  FileText, 
  ChevronRight, 
  Activity, 
  Layers 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface AnalyticsHubScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const AnalyticsHubScreen: React.FC<AnalyticsHubScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('week');
  const [eodEmailActive, setEodEmailActive] = useState(true);

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 flex flex-col gap-3 pt-2">
        {/* Branch Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#006948]">
              <Store className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30] leading-tight">FreshMart Superstore #01</span>
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Terminal Network • Downtown</span>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Store Switcher: Switching between 3 outlets')}
            className="flex items-center gap-1 bg-white shadow-sm px-2.5 py-1 rounded-xl border border-[#bccac0]/30 active:scale-95 transition-transform"
          >
            <span className="font-mono text-xs text-[#006948] font-bold">Switch</span>
          </button>
        </div>

        {/* Date Range Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {[
            { id: 'today', label: 'Today' },
            { id: 'week', label: 'This Week', active: true },
            { id: 'month', label: 'This Month' },
            { id: 'custom', label: 'Custom' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDateRange(tab.id as any)}
              className={`px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                dateRange === tab.id
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'bg-[#dce9ff] text-[#3d4a42] hover:bg-[#d3e4fe]'
              }`}
            >
              {dateRange === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-ping"></span>}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Primary Metric Hero Strip */}
        <div className="bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold tracking-wider">Gross Sales Revenue</span>
            <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded-full font-mono text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              +14.2%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0b1c30] tracking-tight font-sans">$14,892.40</span>
            <span className="font-mono text-[10px] text-[#565e74] uppercase">vs $13,040.60 LW</span>
          </div>

          {/* Mini Visual Sparkline Indicator */}
          <div className="w-full h-8 flex items-end gap-1.5 pt-1">
            <div className="flex-1 bg-[#dce9ff] rounded-t-sm h-[35%]"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t-sm h-[45%]"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t-sm h-[40%]"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t-sm h-[65%]"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t-sm h-[80%]"></div>
            <div className="flex-1 bg-[#00855d] rounded-t-sm h-[90%]"></div>
            <div className="flex-1 bg-[#006948] rounded-t-sm h-[100%] shadow-[0_0_8px_rgba(0,105,72,0.3)]"></div>
          </div>
        </div>

        {/* Key KPI Scorecards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Net Profit */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Net Profit</span>
              <DollarSign className="w-3.5 h-3.5 text-[#006948]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#0b1c30] font-mono">$4,210.80</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono text-xs text-[#047857] font-bold">28.3%</span>
                <span className="text-[10px] text-[#565e74]">margin</span>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Volume</span>
              <Receipt className="w-3.5 h-3.5 text-[#565e74]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#0b1c30] font-mono">642</span>
                <span className="font-mono text-[9px] text-[#565e74] uppercase">Orders</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-[#565e74]">Avg:</span>
                <span className="font-mono text-xs text-[#0b1c30] font-bold">$23.20</span>
              </div>
            </div>
          </div>

          {/* Scan Velocity */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Scan Velocity</span>
              <Activity className="w-3.5 h-3.5 text-[#006948]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#0b1c30] font-mono">18.4</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-[#565e74]">items/min</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span>
              </div>
            </div>
          </div>

          {/* Refunds */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Refunds</span>
              <span className="font-mono text-[9px] bg-[#dce9ff] px-1 rounded uppercase text-[#565e74] font-bold">Low</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#0b1c30] font-mono">$184.50</span>
              <span className="font-mono text-xs text-[#565e74] mt-0.5">1.2% rate</span>
            </div>
          </div>
        </div>

        {/* Hourly Velocity & Rush Highlights Card */}
        <div className="bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Hourly Sales Velocity</span>
              <span className="text-[11px] text-[#565e74]">Customer footfall & register activity</span>
            </div>
            <span className="bg-[#ffdcc3] text-[#2f1500] px-2 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#8d4b00]" />
              2 Rushes
            </span>
          </div>

          <div className="w-full flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between bg-[#eff4ff] px-3 py-1.5 rounded-lg">
              <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Peak Hourly Intake</span>
              <span className="font-mono text-xs text-[#006948] font-bold">$1,840.00 / hr</span>
            </div>

            {/* Bar Graph */}
            <div className="h-28 w-full flex items-end justify-between gap-1.5 pt-3 pb-1">
              {[
                { label: '8a', h: '22%' },
                { label: '10', h: '48%' },
                { label: '12p', h: '88%', isRush: true },
                { label: '2p', h: '38%' },
                { label: '4p', h: '52%' },
                { label: '6p', h: '96%', isRush: true },
                { label: '8p', h: '30%' },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end gap-1">
                  <div
                    className={`w-full rounded-t-sm transition-all ${bar.isRush ? 'bg-[#006948]' : 'bg-[#dce9ff]'}`}
                    style={{ height: bar.h }}
                  ></div>
                  <span className={`font-mono text-[9px] ${bar.isRush ? 'text-[#006948] font-bold' : 'text-[#565e74]'}`}>
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#bccac0]/20">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
                <span className="font-mono text-[10px] text-[#0b1c30]">Midday: 11:30a - 1:30p</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00855d]"></span>
                <span className="font-mono text-[10px] text-[#0b1c30]">Evening: 5:00p - 7:30p</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tender Type Breakdown Card */}
        <div className="bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b1c30]">Tender & Payment Split</span>
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Settled Ledger</span>
          </div>

          {/* Segmented Color Progress Bar */}
          <div className="w-full h-2.5 bg-[#dce9ff] rounded-full overflow-hidden flex">
            <div className="bg-[#006948] h-full" style={{ width: '68%' }}></div>
            <div className="bg-[#b15f00] h-full" style={{ width: '24%' }}></div>
            <div className="bg-[#565e74] h-full" style={{ width: '6%' }}></div>
            <div className="bg-[#bccac0] h-full" style={{ width: '2%' }}></div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
                <span className="text-[11px] text-[#0b1c30]">Cards (68%)</span>
              </div>
              <span className="font-mono font-semibold text-[11px] text-[#0b1c30]">$10,126.80</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b15f00]"></span>
                <span className="text-[11px] text-[#0b1c30]">Cash (24%)</span>
              </div>
              <span className="font-mono font-semibold text-[11px] text-[#0b1c30]">$3,574.15</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#565e74]"></span>
                <span className="text-[11px] text-[#0b1c30]">Wallets (6%)</span>
              </div>
              <span className="font-mono font-semibold text-[11px] text-[#0b1c30]">$893.55</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#bccac0]"></span>
                <span className="text-[11px] text-[#0b1c30]">Store Credit</span>
              </div>
              <span className="font-mono font-semibold text-[11px] text-[#0b1c30]">$297.90</span>
            </div>
          </div>
        </div>

        {/* Top Performing Grocery Departments */}
        <div className="bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Department Mix</span>
              <span className="text-[11px] text-[#565e74]">Top category contributions</span>
            </div>
            <button
              onClick={() => onNavigate('tax_audit')}
              className="font-mono text-[10px] text-[#006948] uppercase font-bold"
            >
              View Margins
            </button>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            {[
              {
                name: 'Fresh Produce',
                amount: '$5,240.00',
                pct: '35%',
                items: '412 items',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeLB86kcnZAtbYpzBnlSmYrdWKTi5T96wFODi5_0k-RkMclReix5v9Yq4dsBfta4Ti42pLP0ZReu61mYCCbhDX1v9nFDxjTR-XiOfmJqmxKhdfwVaJrTrTe31bB2y1kSYJkEJSZ75vTsgHyymcV1X5hPEJxvMrL2iwpvlCgc0tQi9Ei7iKaBWOl_q51ouQSF9aWH8p34ez53NSzuB5-3EIqbPRlDtcEO0IAYC4Qa85fZKept_W5iakiA'
              },
              {
                name: 'Dairy & Chilled',
                amount: '$3,610.00',
                pct: '24%',
                items: '288 items',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyngqbTNVbxdZnqxWKQDFOlbQt-9PjofBG08RqqlFUJC5AWi_iXJBC6_01GH0c2KVXP3zG-_W2q1NUOVbvUx-yAXCmKt3wgiJNKNUxEbsKndbU9rksL_0WKvVCVa8IHDZk9IIDb3cBMv2TE9-XY5fouSDH_IyDyvvyIVBorRyXiqTTQQo1u8676Uzs7hmRpMISjIFLuFmhFra0YSt5qNzkocdsW6Vc5GojKY-r7XFX094BpQGnHzHLDw'
              },
              {
                name: 'Bakery & Deli',
                amount: '$2,480.00',
                pct: '17%',
                items: '195 items',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOWi3HXFivoq8grTH-n-qOpp1IuLC8YRzv_k8K_eIkQrrvGkwkmn4ZhjskyRNExTpUa-IgU8Tc04fi9r2pMZ316KbIjPU2Uu_s61xbikE-KS5ZPGDRf69IaEKvHECrq4vNWYSrHGGjDFEq6tLKjjfCEPppbpZOEwAKUDQgc1KeFr4EMmhHtOcYAkQhOk-SPIHCrzwEX1Ik4m2tQ9qZmRjPMX_8zAVjntZeUncj56coHGAcYX7bSXLSXw'
              },
            ].map((cat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-[#eff4ff]">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-xs font-bold text-[#0b1c30] truncate">{cat.name}</span>
                    <span className="font-mono text-xs text-[#0b1c30] font-bold">{cat.amount}</span>
                  </div>
                  <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006948] h-full rounded-full" style={{ width: cat.pct }}></div>
                  </div>
                  <span className="font-mono text-[9px] text-[#565e74] uppercase mt-0.5">
                    {cat.pct} total sales • {cat.items}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* End of Day Automation Card */}
        <div className="bg-[#eff4ff] rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MailCheck className="w-4 h-4 text-[#006948]" />
              <span className="text-xs font-bold text-[#0b1c30]">Automated Daily EOD Dispatch</span>
            </div>
            <button
              onClick={() => {
                setEodEmailActive(!eodEmailActive);
                onShowToast(eodEmailActive ? 'Automated EOD dispatch disabled' : 'Automated EOD active: 10:00 PM');
              }}
              className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors ${
                eodEmailActive ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-transform ${
                eodEmailActive ? 'translate-x-4.5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
          <div className="bg-white p-2 rounded-lg flex items-center justify-between border border-[#bccac0]/30">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Z-Report • 10:00 PM Daily</span>
              <span className="font-mono text-[10px] text-[#565e74]">owner@freshmart.pos</span>
            </div>
            <Lock className="w-3.5 h-3.5 text-[#565e74]" />
          </div>
        </div>

        {/* Export Action Buttons Tray */}
        <div className="flex flex-col gap-2 pt-1 pb-4">
          <button
            onClick={() => onShowToast('CSV Ledger exported: 642 transactions')}
            className="w-full h-11 bg-[#006948] hover:bg-[#00855d] active:scale-[0.99] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Full CSV Ledger</span>
          </button>
          <button
            onClick={() => onShowToast('PDF Summary generated & ready for download')}
            className="w-full h-11 bg-white text-[#0b1c30] active:bg-[#eff4ff] rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-[#bccac0]/30 shadow-sm transition-all"
          >
            <FileText className="w-4 h-4 text-[#565e74]" />
            <span>Download PDF Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
};
